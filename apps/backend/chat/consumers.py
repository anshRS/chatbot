from channels.generic.websocket import AsyncWebsocketConsumer
from chat.models import Chat, Message 
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from channels.exceptions import StopConsumer

import json
from django.contrib.auth import get_user_model
from .llm.controller import GenerateLlamaResponse

import asyncio
from asgiref.sync import sync_to_async
from channels.db import database_sync_to_async

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		try:
			token = self.scope["query_string"].decode().split("token=")[1]
			access_token = AccessToken(token)
			user_id = access_token.payload.get('user_id')

			if not user_id:				
				raise InvalidToken("Invalid token")
			
			self.user = await self.get_user(user_id)
			print("Current User:", self.user)
			
		except (InvalidToken, User.DoesNotExist):
			await self.close()

		else:			
			self.chat_id = self.scope['url_route']['kwargs']['chat_id']
			self.chat_group_name = f"chat_{self.chat_id}"
			self.user_message_sent = False
			self.generate_response = GenerateLlamaResponse(self.chat_id)

			await self.channel_layer.group_add(
				self.chat_group_name,
				self.channel_name
			)

			await self.accept()
	
	@database_sync_to_async
	def get_user(self, user_id):
		return User.objects.get(id=user_id)
			
	async def receive(self, text_data=None, bytes_data=None):
		data = json.loads(text_data)
		message_content = data.get('message', '')
		type = data.get('type', '')
		chat_title = message_content[:50]

		chat = await self.get_chat(self.chat_id)
		if not chat.title:
			chat.title = chat_title
			await sync_to_async(chat.save)(update_fields=['title'])
		
		chat = await self.get_chat(self.chat_id)		
		message = await self.create_message(message_content, self.user, chat)

		user_message = {
			'id': str(message.id),
			'content': message.content,
			'sender_email': message.sender.email, 
			'chat': self.chat_id,
			'created_at': message.created_at.isoformat()
    	}	
		
		await self.send(text_data=json.dumps({
			'user_data': user_message,		
			'title': chat.title	
		}))

		await asyncio.sleep(0.5)		

		llm_response_chunks = []
		llm_system_message = ''		
		
		print("Mode:", type) 
		if(type == 'chattergeist'):
			async for chunk in self.generate_response.chat_with_memory(message_content):
				llm_response_chunks.append(chunk)			
				llm_system_message = ''.join(llm_response_chunks)	

				await self.send(text_data=json.dumps({				
					'data_stream': chunk,		
				}))
		else:
			# async for chunk in get_llm_response(message_content):
			async for chunk in self.generate_response.rag_with_memory(message_content):
				llm_response_chunks.append(chunk)			
				llm_system_message = ''.join(llm_response_chunks)	

				await self.send(text_data=json.dumps({				
					'data_stream': chunk,		
				}))

		llm_system_message = await self.create_message(llm_system_message, None, chat)

		llm_response = {
			'id': str(llm_system_message.id),
			'content': llm_system_message.content,
			'sender': None,
			'created_at': llm_system_message.created_at.isoformat()
		}

		await self.channel_layer.group_send(
			self.chat_group_name,
			{
				'type': 'chat.message',
				'message': llm_response,		
			}
		)
		
	@database_sync_to_async
	def get_chat(self, chat_id):
		return Chat.objects.get(id=chat_id)

	@database_sync_to_async
	def create_message(self, content, user, chat):
		return Message.objects.create(content=content, sender=user, chat=chat, content_length=len(content))	

	async def chat_message(self, event):
		message = event['message']		
		await self.send(text_data=json.dumps({
			'llm_response': message
		}))

	async def disconnect(self, close_code):		
		if hasattr(self, 'chat_group_name'):
			await self.channel_layer.group_discard(
				self.chat_group_name,
				self.channel_name
			)
		raise StopConsumer()
