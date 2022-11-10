from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from base.models import Product, ItemsInCart
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email"]


class UserWithTokenSerializer(UserSerializer):
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)
    firstName = serializers.SerializerMethodField(read_only=True)
    lastName = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["firstName", "lastName", "email", "access", "refresh"]

    def get_access(self, userObj):
        accessToken = RefreshToken.for_user(userObj)
        return str(accessToken)

    def get_refresh(self, userObj):
        refreshToken = RefreshToken.for_user(userObj)
        return str(refreshToken)

    def get_firstName(self, user):
        return user.first_name

    def get_lastName(self, user):
        return user.last_name


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ItemsInCartSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = ItemsInCart
        fields = "__all__"
