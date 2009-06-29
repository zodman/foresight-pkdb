from django.db import models
from django.contrib.auth.models import User
from django.contrib import admin

from fl.packages.models import Package

class Profile(models.Model):
    user = models.ForeignKey(User, unique=True)
    packages = models.ManyToManyField(Package, blank=True, null = True)

    def __unicode__(self):
        return self.user.username

    def is_community(self):
        for group in self.user.groups.all():
            if group.name == "community":
                return True

    def is_developer(self):
        for group in self.user.groups.all():
            if group.name == "developers":
                return True

admin.site.register(Profile)