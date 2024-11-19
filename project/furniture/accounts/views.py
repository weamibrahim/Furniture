from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated





@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data
      
        
       
        token, created = Token.objects.get_or_create(user=user)
        print(f"Token created: {token.key}, Created: {created}")
        
        
        login(request, user)  
        if created:
            print("New token created:", token.key)
        else:
            print("Token already exists:", token.key)
        return Response({
            "message": "User logged in successfully",
            "token": token.key,
            "data":{
                "username": user.username,
                "email": user.email ,
                
            },
            "role": user.is_staff
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    try:
        request.user.auth_token.delete()
        return Response({"message": "User logged out successfully"}, status=status.HTTP_200_OK)
    except (AttributeError, Token.DoesNotExist):
        return Response({"error": "User not authenticated"}, status=status.HTTP_400_BAD_REQUEST)
   
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    serializer = RegisterSerializer(instance=user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User updated successfully","user": serializer.data}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    