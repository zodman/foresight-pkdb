from django.conf.urls.defaults import *
from fl.settings import mydir

urlpatterns = patterns('',
     (r'^login/$','django.contrib.auth.views.login'),
     (r'^logout/$','django.contrib.auth.views.logout'),
    (r'^profile/$','fl.auth.views.profile'),
)
