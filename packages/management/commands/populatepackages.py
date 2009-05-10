from django.core.management.base import NoArgsCommand
from django.contrib.auth.models import Group
from fl.packages.models import Package

class Command(NoArgsCommand):
    help = "Install Categories"
    requires_model_validation=False
    def handle_noargs(self,**options):
        file = open("/tmp/packages")
        for i in file.readlines():
            cat, created = Package.objects.get_or_create(name = i.strip())
            if created:
                print "%s created" % cat

