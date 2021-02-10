from django.contrib import admin
from .models import Video, Comment

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['id', 'author', 'title']

admin.site.register(Comment)