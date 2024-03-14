from django.contrib import admin
from .models import Chat, Message 

@admin.register(Chat)
class ChatModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'created_at', 'user_email']

    def user_email(self, obj):
        return obj.user.email if obj.user else None
    
    user_email.short_description = 'User Email'

@admin.register(Message)
class MessageModelAdmin(admin.ModelAdmin):
    list_display = ['id', 'content', 'sender_email', 'get_chat_id', 'created_at']   

    def sender_email(self, obj):
        return obj.sender.email if obj.sender else None
    
    def get_chat_id(self, obj):
        return obj.chat.id if obj.chat else None

    sender_email.short_description = 'Sender Email'
    get_chat_id.short_description = 'Chat ID'    
