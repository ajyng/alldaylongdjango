from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from .forms import PostForm
from django.contrib import messages
from .models import Post

@login_required
def index(request):
    suggested_user_list = get_user_model().objects.all()\
        .exclude(pk=request.user.pk)\
        .exclude(pk__in=request.user.following_set.all())[:3]

    return render(request, 'instagram/index.html', {
        "suggested_user_list":suggested_user_list,
    })

def post_list(request):
    return render(request, 'instagram/post_list.html')

def post_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    return render(request, "instagram/post_detail.html", {
        "post":post,
    })

@login_required
def post_new(request):
    if request.method == 'POST':
        form = PostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False) # get_absolute_url 활용 예정
            post.author = request.user
            post.save()
            post.tag_set.add(*post.extract_tag_list()) # post.save()가 먼저 이뤄져야 한다. m2m 관계를 별도의 테이블에 저장하기 때문.

            messages.success(request, "포스팅을 저장했습니다.")
            return redirect(post)
    else:
        form = PostForm()
    
    return render(request, 'instagram/post_form.html', {
        'form': form,
    })
    
def user_page(request, username):
    page_user = get_object_or_404(get_user_model(), username=username, is_active=True)
    post_list = Post.objects.filter(author=page_user)
    post_list_count = post_list.count()

    return render(request, 'instagram/user_page.html', {
        "page_user":page_user,
        "post_list":post_list,
        "post_list_count": post_list_count,
    })

def post_update(request):
    pass

def post_delete(request):
    pass