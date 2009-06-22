from django import forms
from fl.packages.models import STATUS

class StatusForm(forms.Form):
    status = forms.ChoiceField(label ="Change Status",choices = STATUS )