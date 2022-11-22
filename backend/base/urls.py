from django.urls import path
from base import base_views
from base.auth.tokenviews import BaseAppTokenObtainView
import base.views.product_view as product_view
import base.views.user_view as user_view
import base.views.cart_view as cart_view

urlpatterns = [
    path("", view=base_views.getRoutes),
    path("product/all/", view=product_view.getProducts, name="product_all"),
    path("product/<int:id>", view=product_view.getProduct, name="product_info"),
    path("user/login/", BaseAppTokenObtainView.as_view(), name="token_obtain_pair"),
    path("user/register/", view=user_view.registerUser, name="user_register"),
    path("user/all/", view=user_view.getAllUsers, name="users_all"),
    path("user/update/", view=user_view.updateUserName, name="user_update"),
    path("cart/add/", view=cart_view.addToShoppingCart, name="cart_add"),
    path("cart/get/", view=cart_view.getShoppingCart, name="cart_get"),
    path("cart/delete/", view=cart_view.deleteItemInCart, name="cart_item_delete"),
    path(
        "cart/update/", view=cart_view.updateItemInCartQuantity, name="cart_item_update"
    ),
]
