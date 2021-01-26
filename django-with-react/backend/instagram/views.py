from django.shortcuts import render
from django.db.models import Q
from django.utils import timezone
from datetime import timedelta
from .models import Post
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import PostSerializer

class PostViewset(ModelViewSet):
    queryset = (
        Post.objects.all()
        .select_related("author")
        .prefetch_related("tag_set", "like_user_set")
    )
    serializer_class = PostSerializer
    # permission_classes = [AllowAny] #fixme: 인증 적용

    def get_queryset(self):
        # timesince = timezone.now() - timedelta(days=3)
        qs = super().get_queryset()
        qs = qs.filter(
            Q(author = self.request.user)
            | Q(author__in = self.request.user.following_set.all())
        )
        # qs = qs.filter(created_at__gte=timesince)

        return qs