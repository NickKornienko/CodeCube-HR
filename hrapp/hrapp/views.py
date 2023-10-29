from django.shortcuts import render
from django.contrib.auth.decorators import login_required


def homepage(request):
    return render(request, 'hrapp/homepage.html')


def profile_view(request):
    return render(request, 'hrapp/profile.html')


@login_required
def profile(request):
    return render(request, 'hrapp/profile.html')
