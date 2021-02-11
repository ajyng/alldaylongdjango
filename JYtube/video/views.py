from django.shortcuts import render
from django.views.generic import ListView, DetailView, UpdateView, CreateView, DeleteView
from .forms import VideoForm, CommentForm
from .models import Video, Comment
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.urls import reverse_lazy

class VideoListView(ListView):
    model = Video
    paginate_by = 2

class VideoCreateView(LoginRequiredMixin, CreateView):
    model = Video
    form_class = VideoForm
    template_name = 'form.html'

    def form_valid(self, form):
        video = form.save(commit=False)
        video.author = self.request.user
        return super().form_valid(form)

class VideoDetailView(DetailView):
    model = Video

class VideoUpdateView(UserPassesTestMixin, UpdateView):
    model = Video
    form_class = VideoForm
    template_name = 'form.html'

    def test_func(self):
        return self.request.user == self.get_object().author

class VideoDeleteView(UserPassesTestMixin, DeleteView):
    model = Video
    success_url = reverse_lazy('video:video_list')

    def test_func(self):
        return self.request.user == self.get_object().author