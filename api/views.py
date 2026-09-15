from rest_framework.decorators import APIView
from rest_framework.response import Response

# Create your views here.
class APIOverview(APIView):
    def get(self, _):
        return Response("API BASE POINT")