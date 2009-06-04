from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.contrib.auth import views
from django.contrib.auth.decorators import login_required

from meteora import views as views_meteora
def login(request):
    return views_meteora.login(request)
def logout(request):
    return views.logout(request, next_page = "/")

@login_required
def profile(request):
    return render_to_response("registration/profile.html", 
        {},context_instance=RequestContext(request))