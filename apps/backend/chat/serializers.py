from rest_framework import serializers
from .models import Chat, Message

class MessageSerializer(serializers.ModelSerializer):
    sender_email = serializers.SerializerMethodField() 

    class Meta:
        model = Message
        fields = ['id', 'content', 'sender_email', 'chat', 'created_at']
    
    def get_sender_email(self, obj):
        return obj.sender.email if obj.sender else None

class ChatSerializer(serializers.ModelSerializer): 
    user_email = serializers.SerializerMethodField() 

    class Meta:
        model = Chat
        fields = ['id', 'title', 'created_at', 'user_email']
    
    def get_user_email(self, obj):
        return obj.user.email if obj.user else None
