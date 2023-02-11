# Create your views here.
from rest_framework import generics
from .models import Question
from .serializers import QuestionSerializer,QuestionsListSerializer

# Create your views here.

class QuestionDetailApiView (generics.RetrieveUpdateDestroyAPIView):
    queryset= Question.objects.all()
    serializer_class = QuestionSerializer

class QuestionListCreateApiView (generics.ListCreateAPIView):
    queryset= Question.objects.all()
    serializer_class = QuestionSerializer
    def perform_create(self, serializer):
        return super().perform_create(serializer)

class QuestionRandomListApiView (generics.ListAPIView):
    serializer_class = QuestionsListSerializer
    def get_queryset(self,*args,**kwargs):
        len = self.kwargs.get('len')
        print(len)
        queryset = Question.objects.order_by('?')[:len]
        return queryset