from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers.notes import NotesheetSerializer

from notesheet_board.models import Notesheet

# Create your views here.
@api_view(['GET'])
def api_overview(request):
    return Response("API BASE POINT")

@api_view(['GET'])
def get_all_notesheets(request):
    notesheets = Notesheet.objects.all()
    serializer = NotesheetSerializer(notesheets, many=True)
    return Response(serializer.data)