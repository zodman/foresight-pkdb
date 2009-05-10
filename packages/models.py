from django.db import models
from django.contrib import admin
from fl.metadata.models import Summary,Description,Category

class Package(models.Model):
    name =          models.CharField(max_length = 30, unique =True )
    summary =       models.ForeignKey(Summary, blank = True, null = True)
    description =   models.ForeignKey(Description,blank = True, null = True)
    category =      models.ManyToManyField(Category, blank = True, null = True)
    url =           models.URLField( blank = True, null = True)

    def __unicode__(self):
        return self.name

modelstuple = (
    (Package,None),
)

for m,adm in modelstuple:
    admin.site.register(m,adm)
