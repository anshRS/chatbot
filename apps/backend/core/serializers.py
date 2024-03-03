from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model


user = get_user_model()

# creating new users here

class UserCreateSerializer(BaseUserCreateSerializer):

    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'name', 'password',
                'email', ]

    # you can grab the created user and do something with them here
    def create(self, validated_data):

        user = super().create(validated_data)

        return user


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['id', 'name', 'email',
                'is_active',
                'is_deactivated',
                ]

    # this is where we send a request to slash me/ or auth/users
    def validate(self, attrs):
        validated_attr = super().validate(attrs)
        email = validated_attr.get('email')

        user = user.objects.get(email=email)

        if user.is_deactivated:
            raise ValidationError(
                'Account deactivated')

        if not user.is_active:
            raise ValidationError(
                'Account not activated')

        return validated_attr


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        obj = self.user
        
        data.update({
            'id': obj.id, 'name': obj.first_name,
            'email': obj.email,
            'is_active': obj.is_active,
            'is_deactivated': obj.is_deactivated,
        })

        return data