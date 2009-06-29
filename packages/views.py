from django.views.generic.list_detail import object_list, object_detail
from django.views.generic.simple import direct_to_template
from django.template import RequestContext
from django.shortcuts  import get_object_or_404, render_to_response
from django.contrib.auth.decorators import login_required

from fl.packages.models import Package

from meteora import Meteora
from meteora import get_object_or_404 as m_get_or_404

def list(request):
    return object_list( request,
        queryset = Package.objects.all(), paginate_by = 10,
        template_name = "packages/package_list.html",
        page = request.GET.get("page",0))

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
    from fl.packages.forms import PackageForm
    package = get_object_or_404(Package, name = package_name)
    profile = request.user.get_profile()
    if request.POST:
        pkgform = PackageForm(request.POST, instance=package)
        if pkgform.is_valid():
            pkgform.save()
            m = Meteora(True,"Package %s Saved" % package.name )
            m.notebook_close_page("nbPackage","edit")
            m.notebook_select_page("nbPackage","index")
            return m.json_response()
        else:
            m = Meteora(False,"error")
            m.form_invalid(pkgform)
            return m.json_response()
    else:
        if profile.is_community():
            pkgForm = PackageForm(instance=package)
        else:
            pkgForm = None

        statusForm = None
        return  render_to_response("packages/package_edit.html",
            { "package": package,'statusform': statusForm,'packageform':pkgForm },
             context_instance=RequestContext(request))

def package_change_status(request, package_id ):
    package, success = m_get_or_404(Package, id = package_id)
    if not success:
        return package
    if package.status == 1:
        package.status = 2
    elif package.status == 2:
        package.status = 3
        if not request.user.get_profile().is_developer():
           package.status = 1
    elif package.status == 3:
        package.status = 1
    package.save()
    m = Meteora(True, "Status change to: %s" % package.get_status())
    m.update_object("status", package.get_status())
    return m.json_response()

@login_required
def package_asign(request, package_id):
    package, success = m_get_or_404(Package, id = package_id)
    if not success:
        return package
    profile = request.user.get_profile()
    profile.packages.add(package)
    m = Meteora(True,"Change the %s to user %s" % (package.name, request.user.username))
    m.update_object("package_%s" % package.name,"%s" % request.user.username)
    return m.json_response()
