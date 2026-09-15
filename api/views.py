from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import login

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import APIView
from rest_framework.response import Response
from knox.views import LoginView as KnoxLoginView

from notesheet_board.models import Notesheet

# Create your views here.
class APIOverview(APIView):
    def get(self, _):
        return Response("API BASE POINT")

class Login(KnoxLoginView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']

        login(request, user)

        return super(Login, self).post(request, format=None)