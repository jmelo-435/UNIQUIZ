from rest_framework import generics
from .models import Result
from .serializers import ResultSerializer
from rest_framework.pagination import PageNumberPagination

# Create your views here.
class StandardResultsSetPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'page_size'
    max_page_size = 1000

class ResultListCreateApiView (generics.ListCreateAPIView):
    serializer_class = ResultSerializer
    pagination_class = StandardResultsSetPagination
    def get_queryset(self,*args,**kwargs):
        queryset = Result.objects.order_by('-correct_answers','seconds')
        return queryset