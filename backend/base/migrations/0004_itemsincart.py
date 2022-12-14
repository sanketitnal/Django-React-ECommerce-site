# Generated by Django 3.2.15 on 2022-10-19 18:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0003_product_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='ItemsInCart',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(default=0)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.product')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
