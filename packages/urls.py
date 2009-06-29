from django.conf.urls.defaults import *

urlpatterns = patterns('',
     (r'^$', "fl.packages.views.list"),

     (r'package/index/(?P<package_name>\w+)$', "fl.packages.views.index"),
     (r'package/main/(?P<package_name>\w+)$', "fl.packages.views.package_main"),
     (r'package/edit/(?P<package_name>\w+)$', "fl.packages.views.package_edit"),

     (r'package/asign/(?P<package_id>\d+)$', "fl.packages.views.package_asign"),
     (r'package/change_status/(?P<package_id>\d+)$', "fl.packages.views.package_change_status"),
)

