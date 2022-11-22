from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response as REST_Response
from rest_framework import status
from base.models import Product, ItemsInCart
import base.serializers as model_serializer


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addToShoppingCart(request):
    try:
        user = request.user
        data = request.data
        if "productId" not in data or "orderQuantity" not in data:
            return REST_Response(
                {"message": "productId, orderQuantity is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        product_id = int(data["productId"])
        product = Product.objects.get(_id=product_id)
        order_quantity = int(data["orderQuantity"])

        productInCart = ItemsInCart.objects.filter(product=product, user=user).first()
        if (
            (productInCart is not None)
            and (order_quantity + productInCart.quantity > product.maxOrderQuantity)
        ) or order_quantity > product.maxOrderQuantity:
            return REST_Response(
                {
                    "message": "You have reached maximum order quantity allowed in a cart = {}".format(
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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getShoppingCart(request):
    try:
        user = request.user
        items_in_cart = ItemsInCart.objects.filter(user=user)
    except:
        return REST_Response(
            {"message": "Internal Server Error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    item_in_cart_json = model_serializer.ItemsInCartSerializer(items_in_cart, many=True)
    return REST_Response(item_in_cart_json.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def deleteItemInCart(request):
    try:
        user = request.user
        try:
            productId = request.data["productId"]
            ItemsInCart.objects.get(
                product=Product.objects.get(pk=productId), user=user
            ).delete()
        except:
            return REST_Response(
                {"message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST
            )
    except:
        return REST_Response(
            {"message": "Internal Server Error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return REST_Response({"message": "success"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updateItemInCartQuantity(request):
    try:
        user = request.user
        try:
            print(request.data)
            productId = request.data["productId"]
            newQuantity = request.data["newQuantity"]
            product = Product.objects.get(pk=productId)
            item_in_cart = ItemsInCart.objects.get(user=user, product=product)
            if newQuantity > product.maxOrderQuantity:
                return REST_Response(
                    {
                        "message": "Maximum order quantity = {}".format(
                            product.maxOrderQuantity
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except:
            return REST_Response(
                {"message": "Bad Request"}, status=status.HTTP_400_BAD_REQUEST
            )
        item_in_cart.quantity = newQuantity
        item_in_cart.save()
    except:
        return REST_Response(
            {"message": "Internal Server Error"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
    return REST_Response({"message": "success"}, status=status.HTTP_200_OK)
