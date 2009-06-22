
from django import template
from django.template.defaultfilters import stringfilter
from fl.packages.models import STATUS

register = template.Library()
@stringfilter
@register.filter
def status(value):
    for st,val in STATUS:
        if st == value:
            return val
