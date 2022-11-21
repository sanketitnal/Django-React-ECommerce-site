from django.urls import path
from base import views
from base.auth.tokenviews import BaseAppTokenObtainView

urlpatterns = [
    path("", view=views.getRoutes),
    path("product/all/", view=views.getProducts, name="product_all"),
    path("product/<int:id>", view=views.getProduct, name="product_info"),
    path("user/login/", BaseAppTokenObtainView.as_view(), name="token_obtain_pair"),
    path("user/register/", view=views.registerUser, name="user_register"),
    path("user/all/", view=views.getAllUsers, name="users_all"),
    path("user/update/", view=views.updateUserName, name="user_update"),
    path("cart/add/", view=views.addToShoppingCart, name="cart_add"),
    path("cart/get/", view=views.getShoppingCart, name="cart_get"),
    path("cart/delete/", view=views.deleteItemInCart, name="cart_item_delete"),
    path("cart/update/", view=views.updateItemInCartQuantity, name="cart_item_update"),
]
