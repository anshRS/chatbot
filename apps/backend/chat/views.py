from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

class MessagesAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, chat_id, format=None):
        messages = Message.objects.filter(chat_id=chat_id).order_by('created_at')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
class ChatAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user

        chats = Chat.objects.filter(user=user)
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = ChatSerializer(data={'title': ''})
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, chat_id, format=None):
        try:
            chat = Chat.objects.get(id=chat_id, user=request.user)
            chat.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Chat.DoesNotExist:
            return Response({"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, chat_id, format=None):
        try:
            chat = Chat.objects.get(id=chat_id, user=request.user)
            new_title = request.data.get('title')           
            chat.title = new_title
            chat.save()
            return Response({"message": "Chat title updated successfully", "title": new_title})           
        except Chat.DoesNotExist:
            return Response({"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        
