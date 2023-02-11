from django.urls import path
from quiz.views import QuestionDetailApiView, QuestionListCreateApiView, QuestionRandomListApiView
urlpatterns = [
    path("<int:pk>", QuestionDetailApiView.as_view(), name="question-detail"),
    path("", QuestionListCreateApiView.as_view(), name="questions-list"),
    path("random/<int:len>", QuestionRandomListApiView.as_view(), name="random-list"),
]