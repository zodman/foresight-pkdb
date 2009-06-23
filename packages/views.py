from django.views.generic.list_detail import object_list, object_detail
from django.views.generic.simple import direct_to_template
from django.template import RequestContext
from django.shortcuts  import get_object_or_404, render_to_response
from fl.packages.models import Package


def list(request):
    return object_list( request,
        queryset = Package.objects.all(), paginate_by = 10,
        template_name = "packages/package_list.html",
        page = request.GET.get("page",0) )

def index(request, package_name):
    package = get_object_or_404(Package, name = package_name)
    return direct_to_template(request, template="packages/package_index.html", extra_context={'object': package} )


def package_main(request, package_name):
    return object_detail(
        request,
        queryset = Package.objects.all(),
        slug_field = "name",
        slug = package_name,
        template_name ="packages/package_detail.html",
    )

def package_edit( request, package_name ):
    #assert False, package_name
    package = get_object_or_404(Package, name = package_name)
    profile = request.user.get_profile()
    if profile.is_community():
        from fl.packages.forms import PackageForm
        pkgForm = PackageForm(instance=package)
    else:
        pkgForm = None
    if profile.is_developer():
        from fl.packages.forms import StatusForm
        statusForm = StatusForm()
    else:
        statusForm = None
    return  render_to_response("packages/package_edit.html",
        { "package": package,'statusform': statusForm,'packageform':pkgForm },
         context_instance=RequestContext(request))
