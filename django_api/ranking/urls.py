from django.urls import path
from .views import ResultListCreateApiView
urlpatterns = [
    path("", ResultListCreateApiView.as_view(), name="result-list"), 
]