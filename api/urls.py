from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='api-overview'),
    path('notesheets/', views.get_all_notesheets, name='get-all-notesheets'),
]