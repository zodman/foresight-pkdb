from django.db import models
from django.contrib import admin
from djangoratings import RatingField

from fl.packages.models import Package
from fl.metadata.models import Description, Summary, Category

RATING_CHOICES = (
    (1, 'Up'),
    (-1, 'Down'),
)

class Rating(models.Model):
    package = models.ForeignKey(Package)
    rating = RatingField(choices= RATING_CHOICES ) 
    def get_score(self):
        return self.rating.score
    def get_votes(self):
        return self.rating.votes
    class Meta:
        abstract = True


class RatingSummary(Rating):
    summary = models.ForeignKey(Summary)

class RatingDescription(Rating):
    description = models.ForeignKey(Description)

class RatingCategory(Rating):
    category = models.ForeignKey(Category)

class RatingAdmin(admin.ModelAdmin):
    list_display = ("package","get_score","get_votes" )

modelsTuple = (
    (RatingSummary,None),
    (RatingDescription,None),
    (RatingCategory,None),
)

for m,ma in modelsTuple:
    admin.site.register(m,RatingAdmin)
