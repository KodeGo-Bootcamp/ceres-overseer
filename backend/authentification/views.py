from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
  
  
class HomeView(APIView):
    permission_classes = (IsAuthenticated, )
  
    def get(self, request):
        content = {'message': ''}
        return Response(content)



class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentification.serializers import UserSerializer
from django.contrib.auth.models import User
# from rest_framework.authtoken.models import Token

class UserCreate(APIView):
    """ 
    Creates the user. 
    """

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                # token = Token.objects.create(user=user)
                json = serializer.data
                # json['token'] = token.key
                return Response(json, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
