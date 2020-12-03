from django.db import models
from django.contrib.auth.models import AbstractUser # User모델이 가져야 할 필수 속성들을 가지고 있다.

class User(AbstractUser):
    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    class gender(models.TextChoices):
        MALE = "M", "남성"
        FEMALE = "F", "여성"
    follower_set = models.ManyToManyField("self", blank=True)
    following_set = models.ManyToManyField("self", blank=True)
