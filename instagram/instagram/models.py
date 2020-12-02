from django.db import models
from django.conf import settings


class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to="instagram/%Y/%m/%d")
    caption = models.TextField(max_length=500)
    tag_set = models.ManyToManyField('Tag', blank=True)

    def __str__(self):
        return self.caption

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name