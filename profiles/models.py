from django.db import models
from django.contrib.auth.models import User
from django import admin

from fl.packages.models import Package

class Profile(models.Model):
    # This is the only required field
    user = models.ForeignKey(User, unique=True)
    packages = models.ManyToMany(Package)

admin.site.register(Profile)