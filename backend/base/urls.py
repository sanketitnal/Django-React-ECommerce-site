from django.urls import path
from base import views
from base.auth.tokenviews import BaseAppTokenObtainView

urlpatterns = [
    path("", view=views.getRoutes),
    path("products/", view=views.getProducts, name="all_products"),
    path("product/<int:id>", view=views.getProduct, name="product_info"),
    path("user/login/", BaseAppTokenObtainView.as_view(), name="token_obtain_pair"),
    path("user/register/", view=views.registerUser, name="user_register"),
    path("users/", view=views.getAllUsers, name="users_all"),
]
