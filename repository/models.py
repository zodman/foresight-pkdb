from django.db import models
from django.contrib import admin


class Label(models.Model):
    branch_name = models.CharField(max_length=20)
    def __unicode__(self):
        return self.branch_name

class Arch(models.Model):
    proc = models.CharField(max_length = 10)
    
    def __unicode__(self):
        return self.proc
    
class Repository(models.Model):
    hostname = models.CharField(max_length=50)
    branches = models.ManyToManyField(Label)
    procs = models.ManyToManyField(Arch)
    
    def __unicode__(self):
        return self.hostname
    
    
for i in (Label,Arch,Repository):
    admin.site.register(i)