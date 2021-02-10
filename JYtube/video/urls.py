from django.urls import path
from . import views

app_name = 'video'

urlpatterns = [
    path('', views.VideoListView.as_view(), name='video_list'),
    path('new/', views.VideoCreateView.as_view(), name='video_create'),
    path('<int:pk>/', views.VideoDetailView.as_view(), name='video_detail'),
    path('<int:pk>/edit/', views.UpdateView.as_view(), name='video_edit'),
    path('<int:pk>/delete/', views.DeleteView.as_view(), name='video_delete'),
]