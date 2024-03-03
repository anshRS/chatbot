from django.urls import path
from . import views

urlpatterns = [
    path('exists',views.check_email_exists,name='exists'),
    path('home',views.home,name='home'),
]