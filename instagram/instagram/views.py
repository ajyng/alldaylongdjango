from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .forms import PostForm
from django.contrib import messages
from .models import Tag

def post_list(request):
    return render(request, 'instagram/post_list.html')

def post_detail(request):
    pass

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
            return redirect("/")
    else:
        form = PostForm()
    
    return render(request, 'instagram/post_form.html', {
        'form': form,
    })
    

def post_update(request):
    pass

def post_delete(request):
    pass