from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

from fl.packages.models import Package

class Profile(models.Model):
    user = models.ForeignKey(User, unique=True)
    packages = models.ManyToManyField(Package)
    
    def __unicode__(self):
        return self.user.username

admin.site.register(Profile)