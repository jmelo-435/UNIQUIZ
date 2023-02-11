from rest_framework import serializers
from .models import Result


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields=[
            "id",
            "user_name",
            "correct_answers",
            "date",
            "seconds",
        ]
