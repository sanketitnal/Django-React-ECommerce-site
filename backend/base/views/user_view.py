from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from base import serializers as model_serializer
from rest_framework.response import Response as REST_Response
from django.core.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.contrib.auth.hashers import make_password


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    """Returns list of all users. Each user's ["id", "username", "first_name", "last_name", "email"] data will be sent."""
    users = User.objects.all()
    users_in_json = model_serializer.UserSerializer(users, many=True)
    return REST_Response(users_in_json.data)


@api_view(["POST"])
def registerUser(request):
    """Registers/Creates new user. Mandatory form data fields are ["firstName", "lastName", "email", "password"].
    On successful user creation, access token is returned.
    """
    try:
        data = request.data
        expected_fields = ["firstName", "lastName", "email", "password"]
        for ef in expected_fields:
            if data.get(ef) == None:
                return REST_Response(
                    {"message": "Form data is missing {} field".format(ef)},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        user = User(
            first_name=data["firstName"],
            last_name=data["lastName"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
        )
        user.full_clean()
        user.save()
    except ValidationError:
        return REST_Response(
            {
                "message": "Invalid data or user with email {} already exists".format(
                    data["email"]
                )
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Exception as e:
        print(e)
        return REST_Response(
            {"message": "Internal Server Error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    userJWT_in_json = model_serializer.UserWithTokenSerializer(user, many=False)

    return REST_Response(userJWT_in_json.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updateUserName(request):
    try:
        user = request.user
        try:
            user.first_name, user.last_name = (
                request.data["firstName"],
                request.data["lastName"],
            )
        except:
            return REST_Response(
                {"message": "request must contain firstName and lastName information"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        user.save()
    except:
        return REST_Response(
            {"message": "Internal Server Error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return REST_Response(
        {"firstName": user.first_name, "lastName": user.last_name},
        status=status.HTTP_200_OK,
    )
