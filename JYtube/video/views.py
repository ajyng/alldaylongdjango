from django.shortcuts import render
from django.views.generic import ListView, DetailView, UpdateView, CreateView, DeleteView
from .forms import VideoForm, CommentForm
from .models import Video, Comment

class VideoListView(ListView):
    model = Video

class VideoCreateView(CreateView):
    model = Video
    form_class = VideoForm
    template_name = 'form.html'

class VideoDetailView(DetailView):
    model = Video

class VideoUpdateView(UpdateView):
    model = Video
    form_class = VideoForm
    template_name = 'form.html'

class VideoDeleteView(DeleteView):
    model = Video
