from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
# inheriting from the abstract user to have more control of the fields


class User(AbstractUser):
    name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_deactivated = models.BooleanField(default=False)

    def __str__(self):
        return self.email