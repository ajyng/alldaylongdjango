from django.db import models
from django.core.validators import RegexValidator
from django.contrib.auth.models import AbstractUser # User모델이 가져야 할 필수 속성들을 가지고 있다.

class User(AbstractUser):
    class GenderChoices(models.TextChoices):
        MALE = "M", "남성" # 실제 DB에 저장되는 값 / 유저에게 보여지는 값
        FEMALE = "F", "여성"

    website_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)
    phone_number = models.CharField(max_length=13, blank=True, validators=[RegexValidator(r"^010-?[1-9]\d{3}-?\d{4}$")])
    gender = models.CharField(max_length=1, blank=True, choices=GenderChoices.choices)

    avatar = models.ImageField(blank=True, upload_to="accounts/avatar/%Y/%m/%d",
                                help_text="48px * 48px 크기의 png/jpg 파일을 업로드 해주세요.")
    
    follower_set = models.ManyToManyField("self", blank=True)
    following_set = models.ManyToManyField("self", blank=True)
