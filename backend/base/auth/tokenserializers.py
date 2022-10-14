from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class BaseAppTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["email"] = self.user.email
        data["firstName"] = self.user.first_name
        data["lastName"] = self.user.last_name

        return data
