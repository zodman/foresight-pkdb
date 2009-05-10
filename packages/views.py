from django.views.generic.list_detail import object_list, object_detail

from django.shortcuts  import get_object_or_404, render_to_response
from fl.packages.models import Package
from fl.rating.forms import RatingSummaryForm

def index(request):
    return object_list( request, queryset = Package.objects.all(), paginate_by = 10, page = request.GET.get("page",0) )
def package( request, package_name ):
    package = get_object_or_404(Package, name = package_name)
    form = RatingSummaryForm( instance = package)
    return  render_to_response("packages/package_detail.html", { "object": package, "form": form} )
