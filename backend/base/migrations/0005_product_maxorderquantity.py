# Generated by Django 3.2.15 on 2022-10-20 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_itemsincart'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='maxOrderQuantity',
            field=models.IntegerField(default=5),
        ),
    ]
