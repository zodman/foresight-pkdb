from django.conf.urls.defaults import *
#TODO fix this
urlpatterns = patterns('',
     (r'^$', "fl.packages.views.list"),

     (r'package/index/(?P<package_name>\w+)$', "fl.packages.views.index"),
     (r'package/main/(?P<package_name>\w+)$', "fl.packages.views.package_main"),
     (r'package/edit/(?P<package_name>\w+)$', "fl.packages.views.package_edit"),
)

