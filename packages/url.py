from django.conf.urls.defaults import *

urlpatterns = patterns('',
     (r'^$', "fl.packages.views.index"),
     (r'package/(?P<package_name>\w.+)$', "fl.packages.views.package")
)

