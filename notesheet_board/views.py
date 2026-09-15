from rest_framework import viewsets
from .models import Notesheet
from .serializer import NotesheetSerializer

class NotesheetViewSet(viewsets.ModelViewSet):
    queryset = Notesheet.objects.all()
    serializer_class = NotesheetSerializer

