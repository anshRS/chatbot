from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('custom_commands.urls')),
    path('api/', include([
        path('', include('core.urls')),
        path('', include('chat.urls')),
    ])),
]
