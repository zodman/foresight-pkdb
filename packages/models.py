from django.db import models
from django.contrib import admin
from fl.metadata.models import Summary,Description,Category
from fl.repository.models import Repository, Label,Arch

STATUS = (
    (1,'set by community'),
    (2,'wait devel approved'),
    (3,'set on package')
)

class Package(models.Model):
    name =          models.CharField(max_length = 30, unique =True )
    summary =       models.CharField(max_length= 50 ,  blank = True, null = True)
    description =   models.TextField(blank = True, null = True)
    category =      models.ManyToManyField(Category, blank = True, null = True)
    url =           models.URLField( blank = True, null = True)
    status =        models.SmallIntegerField( default =1, choices = STATUS)
    repositories =  models.ManyToManyField(Repository)
    labels      =   models.ManyToManyField(Label)
    archs       =   models.ManyToManyField(Arch)

    def __unicode__(self):
        return self.name
    def get_status(self):
        for st,val in STATUS:
            if st == self.status:
                return val
    def is_user_owned(self):
        if self.profile_set.count() == 0:
            return False
        else:
            return True
modelstuple = (
    (Package,None),
)

for m,adm in modelstuple:
    admin.site.register(m,adm)
