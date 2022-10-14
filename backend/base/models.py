from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ProductCategory(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    title = models.CharField(max_length=50, unique=True, null=False, blank=False)


class Product(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(null=False, blank=False)
    name = models.CharField(max_length=100, null=False, blank=False)
    brand = models.CharField(max_length=100, null=False, blank=False)
    category = models.ForeignKey(
        ProductCategory, on_delete=models.SET_NULL, null=True, blank=True
    )
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    countInStock = models.IntegerField(null=False, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=100, null=False, blank=False)
    rating = models.IntegerField(null=False, blank=False, default=0)
    comment = models.TextField(null=False, blank=False)

    def __str__(self):
        return "{}:{}".format(self.user, self.rating)


class PaymentMethod(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    method = models.CharField(max_length=50, unique=True, null=False, blank=False)


class ShippingAddress(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    line1 = models.CharField(max_length=100, null=False, blank=False)
    line2 = models.CharField(max_length=100, null=False, blank=False)
    pinCode = models.IntegerField(null=False, blank=False)
    city = models.CharField(max_length=100, null=False, blank=False)
    state = models.CharField(max_length=100, null=False, blank=False)
    country = models.CharField(max_length=100, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)


class Order(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    paymentMethod = models.ForeignKey(
        PaymentMethod,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    taxPrice = models.DecimalField(max_digits=10, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=10, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=10, decimal_places=2)
    isPaid = models.BooleanField(default=False, null=False, blank=False)
    paidAt = models.DateField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    createdAt = models.DateField(auto_now_add=True, null=True, blank=True)
    shippingAddress = models.TextField(null=False, blank=False)

    def __str__(self):
        return str(self.createdAt)


class OrderItem(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    productName = models.CharField(max_length=100, null=False, blank=False)
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, blank=False
    )

    def __str__(self):
        return str(self.name)


class ItemsInCart(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=False, blank=False
    )
    quantity = models.IntegerField(null=False, blank=False, default=0)
