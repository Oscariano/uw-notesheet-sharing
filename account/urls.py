from django.urls import path
from knox import views as knox_views
from . import views

urlpatterns = [
    path('login/', views.Login.as_view(), name='knox-login'),
    path('logout/', knox_views.LogoutView.as_view(), name='knox-logout'),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name='knox-logoutall'),
]