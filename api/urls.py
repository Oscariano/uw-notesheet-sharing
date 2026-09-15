from django.urls import path, include
from . import views
from knox import views as knox_views

urlpatterns = [
    path('', views.APIOverview.as_view(), name='api-overview'),
    path('notesheet/', include('notesheet_board.urls')),
    path('auth/login/', views.Login.as_view(), name='knox-login'),
    path('auth/logout/', knox_views.LogoutView.as_view(), name='knox-logout'),
    path('auth/logoutall/', knox_views.LogoutAllView.as_view(), name='knox-logoutall'),
]