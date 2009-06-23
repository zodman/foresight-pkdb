from django.http import HttpResponse
from django.template import RequestContext
from django.shortcuts import render_to_response, get_object_or_404
from django.contrib.auth import views
from django.contrib.auth.models import Group
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.views.generic import simple


from meteora import Meteora
from fl.profiles.models import Profile

def login(request):
    return views.login(request)

@login_required
def logout(request):
    return views.logout(request, next_page = "/")

@login_required
def profile(request):

    return render_to_response("registration/profile.html",
        { },context_instance=RequestContext(request))


def register(request):
    if request.POST:
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            group_community = get_object_or_404(Group, name = "community")
            user.group.add(group_community)
            m = Meteora(True, "New user: %s register" %user.username)
            m.redirectTo(reverse('fl.auth.views.login'))
            return m.json_response()
        else:
            m = Meteora(False, "Form Invalid")
            m.form_invalid("div-register", form)
            return m.json_response()
    else:
        form = UserCreationForm()
        return render_to_response("registration/register.html", {'form':form})

@login_required
def index(request):
    user = request.user
    profile = user.get_profile()
    return render_to_response("registration/index.html",
        {"profile": profile },context_instance=RequestContext(request))
