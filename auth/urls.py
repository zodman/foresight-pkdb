from django.conf.urls.defaults import *
from fl.settings import mydir

urlpatterns = patterns('',
	(r'^$','django.views.generic.simple.redirect_to',{ 'url':'profile/' }),
     (r'^login/$','meteora.views.login'),
     (r'^logout/$','fl.auth.views.logout'),
    (r'^profile/$','fl.auth.views.profile'),
)
