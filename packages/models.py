from django.db import models
from django.contrib import admin
from fl.metadata.models import Summary,Description,Category
from fl.repository.models import Repository, Label,Arch

STATUS = (
    (1,'set by community'),
    (2,'approved by developer'),
    (3,'set on package')
)

class Package(models.Model):
    name =          models.CharField(max_length = 30, unique =True )
    summary =       models.ForeignKey(Summary, unique = True, blank = True, null = True)
    description =   models.ForeignKey(Description,blank = True, unique = True, null = True)
    category =      models.ManyToManyField(Category, blank = True, null = True)
    url =           models.URLField( blank = True, null = True)
    status =        models.SmallIntegerField( default =1, choices = STATUS)
    repositories =  models.ManyToManyField(Repository)
    labels      =   models.ManyToManyField(Label)
    archs       =   models.ManyToManyField(Arch)
    def __unicode__(self):
        return self.name

modelstuple = (
    (Package,None),
)

for m,adm in modelstuple:
    admin.site.register(m,adm)
