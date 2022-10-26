from itertools import product
from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response as REST_Response
from rest_framework.exceptions import NotFound
from rest_framework import status

from base.models import Product, ItemsInCart
import base.serializers as model_serializer

# Create your views here.


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getRoutes(request):
    """List of all routes supported by API server"""
    routes = [
        "/api/",
        "/api/products",
        "/api/product/<int:id>",
        "/api/user/login/",
    ], "/api/user/register/"
    return REST_Response(routes)


@api_view(["GET"])
def getProducts(request):
    """List of all products"""
    products = Product.objects.all()
    products_in_json = model_serializer.ProductSerializer(products, many=True)
    return REST_Response(products_in_json.data)


@api_view(["GET"])
def getProduct(request, id):
    """Details of a specific product searched based on product_id"""
    try:
        product = Product.objects.get(_id=id)
    except Product.DoesNotExist:
        raise NotFound(
            detail="Product details with id={} not found".format(id), code=None
        )
    product_in_json = model_serializer.ProductSerializer(product, many=False)
    return REST_Response(product_in_json.data)


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
def addToShoppingCart(request):
    try:
        user = request.user
        data = request.data
        if "product_id" not in data or "quantity" not in data:
            return REST_Response(
                {"message": "product_id, quantity is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        product_id = int(data["product_id"])
        product = Product.objects.get(_id=product_id)
        order_quantity = int(data["quantity"])

        productInCart = ItemsInCart.objects.filter(product=product, user=user).first()
        if (
            (productInCart is not None)
            and (order_quantity + productInCart.quantity > product.maxOrderQuantity)
        ) or order_quantity > product.maxOrderQuantity:
            return REST_Response(
                {
                    "message": "Maximum order quantity allowed in cart = {}".format(
                        product.maxOrderQuantity
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if productInCart is not None:
            productInCart.quantity = productInCart.quantity + order_quantity
            productInCart.save()
            print(productInCart)
        else:
            newItem = ItemsInCart(user=user, product=product, quantity=order_quantity)
            newItem.save()
    except ValueError:
        return REST_Response(
            {"message": "product_id, quantity should be integer"},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except Product.DoesNotExist:
        return REST_Response(
            {"message": "Product for product_id={} does not exist".format(product_id)},
            status=status.HTTP_400_BAD_REQUEST,
        )
    except:
        return REST_Response(
            {"message": "Unknown internal server error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return REST_Response({"message": "Success"})


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
