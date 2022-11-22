from rest_framework.decorators import api_view, permission_classes
from base.models import Product
from base import serializers as model_serializer
from rest_framework.response import Response as REST_Response
from rest_framework.exceptions import NotFound


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
