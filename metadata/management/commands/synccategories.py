from django.core.management.base import NoArgsCommand
from django.contrib.auth.models import Group
from fl.metadata.management.commands.conaryEnums import categoryMap
from fl.metadata.models import Category

class Command(NoArgsCommand):
    help = "Install Categories"
    requires_model_validation=False
    def handle_noargs(self,**options):
        for i in categoryMap.keys():
            cat, created = Category.objects.get_or_create(name = i)
            if created:
                print "%s created" % cat

