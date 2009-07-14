from django import forms
from fl.packages.models import STATUS, Package

class StatusForm(forms.Form):
    status = forms.ChoiceField(label ="Change Status",choices = STATUS )

class PackageForm(forms.ModelForm):
    description = forms.CharField(widget= forms.Textarea(attrs={'rows':"2"}))
    summary = forms.CharField(widget = forms.Textarea(attrs={'rows':'1'}))
    class Meta:
        model = Package
        exclude = ("status","name")
class JiraLoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput())
