from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response as REST_Response

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
