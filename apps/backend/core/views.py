from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def check_email_exists(request):
    if not request.data.get('email'):
        return Response({'error': 'Bad_request'}, status=status.HTTP_400_BAD_REQUEST)

    email = request.data.get('email')
    try:
        User.objects.get(email=email)
        return Response({'email_exists': True}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({'email_exists': False}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def home(request):
    return Response({'detail': 'Welcome'}, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        try:
            user = User.objects.get(email=request.data.get('email'))
            if not user.is_active:
                return Response({'detail': 'Account not activated'}, status=status.HTTP_401_UNAUTHORIZED)
            if user.is_deactivated:
                return Response({'detail': 'Account deactivated'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Invalid email or password'}, status=status.HTTP_400_BAD_REQUEST)

        return super().post(request, *args, **kwargs)