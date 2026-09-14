from django.urls import path
from . import views
from knox import views as knox_views

urlpatterns = [
    path('', views.APIOverview.as_view(), name='api-overview'),
    path('notesheets/', views.GetAllNotesheets.as_view(), name='get-all-notesheets'),
    path('auth/login/', views.Login.as_view(), name='knox-login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='knox-logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox-logoutall'),
]