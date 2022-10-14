from .tokenserializers import BaseAppTokenSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class BaseAppTokenObtainView(TokenObtainPairView):
    serializer_class = BaseAppTokenSerializer
