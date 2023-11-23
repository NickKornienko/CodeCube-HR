from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# remove for production
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


# Login View


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)

# Register View


@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        print("reached")
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        # Check if a user with this username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        # Create new user
        user = User.objects.create_user(username, email, password)

        # Create token for the new user
        token, created = Token.objects.get_or_create(user=user)

        return Response({"token": token.key}, status=status.HTTP_201_CREATED)
