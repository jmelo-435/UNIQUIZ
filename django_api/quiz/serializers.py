from rest_framework import serializers
from quiz.models import Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields=[
            "id",
            "title",
            "option_1",
            "option_2",
            "option_3",
            "option_4",
            "option_5",
            "correct_answer",
        ]
    
    def validate_title(self,value):
        qs= Question.objects.filter(title__exact=value)
        if qs.exists():
            raise serializers.ValidationError(f" \"{value}\" é uma pergunta que já existe")
        return value
    

class QuestionsListSerializer(serializers.ModelSerializer):
    class Meta:    
        model = Question
        fields=[
            "id",
            "title",
            "option_1",
            "option_2",
            "option_3",
            "option_4",
            "option_5",
            "correct_answer",
        ]