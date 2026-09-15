from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.APIOverview.as_view(), name='api-overview'),
    path('notesheet/', include('notesheet_board.urls')),
    path('account/', include('account.urls'))
]