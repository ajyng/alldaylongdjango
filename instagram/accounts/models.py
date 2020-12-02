from django.db import models


class User(models.Model):
    class gender(models.TextChoices):
        MALE = "M", "남성"
        FEMALE = "F", "여성"
    name = models.TextField()
    follower_set = models.ManyToManyField("self", blank=True)
    following_set = models.ManyToManyField("self", blank=True)
