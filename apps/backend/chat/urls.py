from django.urls import path
from .views import ChatAPI, MessagesAPI

urlpatterns = [
    path('chats/', ChatAPI.as_view(), name='chats'),
    path('chats/<int:chat_id>/', ChatAPI.as_view()),
    path('chat/<int:chat_id>/messages/', MessagesAPI.as_view(), name='chat-messages-api'),   
]