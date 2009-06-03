from django.conf.urls.defaults import *
from fl.settings import mydir

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^fl/', include('fl.foo.urls')),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     (r'^admin/(.*)', admin.site.root),
     (r'^', include("fl.packages.urls")),
	 (r'^auth/$','django.views.generic.simple.redirect_to', { 'url':'/accounts/'}),
	 (r'^accounts/', include("fl.auth.urls")),
     (r'^sitemedia/(.*)$', 'django.views.static.serve', {'document_root': mydir() + '/sitemedia', 'show_indexes': True}),



)
