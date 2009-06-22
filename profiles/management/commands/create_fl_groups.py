from django.core.management.base import NoArgsCommand
from django.contrib.auth.models import Group

class Command(NoArgsCommand):
    help = "Install groups"
    requires_model_validation=False
    def handle_noargs(self,**options):
        groups = ("community","developers")
        for i in groups:
            cat, created = Group.objects.get_or_create(name = i.strip())
            if created:
                print "%s created" % cat

