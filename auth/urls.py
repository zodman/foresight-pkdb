from django.conf.urls.defaults import *


urlpatterns = patterns('',
	(r'^$','django.views.generic.simple.redirect_to',{ 'url':'profile/' }),
     (r'^login/$','fl.auth.views.login'),
     (r'^logout/$','fl.auth.views.logout'),
     
     
    (r'^profile/$','fl.auth.views.profile'),
    (r'^password/$','django.contrib.auth.views.password_change'),
    (r'^password/done/$','django.contrib.auth.views.password_change_done'),
    (r'^index/$','fl.auth.views.index'),
    (r'^register/$','fl.auth.views.register'),
)
