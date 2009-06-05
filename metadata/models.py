from django.db import models
from django.contrib import admin

class Summary(models.Model):
    value = models.TextField()

    def __unicode__(self):
        return self.value

class Description(models.Model):
    value = models.TextField()
    
    def __unicode__(self):  
        return self.value

class Category(models.Model):
    name = models.CharField( max_length = 30)

    def __unicode__(self):
        return self.name

modelsTuple = (
    (Summary,None),
    (Description,None),
    (Category,None),
)
for m,ma in modelsTuple:
    admin.site.register(m,ma)
