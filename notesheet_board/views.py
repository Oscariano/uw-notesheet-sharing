from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Notesheet
from .serializer import NotesheetSerializer

class NotesheetViewSet(viewsets.ModelViewSet):
    queryset = Notesheet.objects.all()
    serializer_class = NotesheetSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated()]
        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

