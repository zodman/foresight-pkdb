from django.forms import ModelForm
from fl.rating.models import RatingSummary


class RatingSummaryForm(ModelForm):
    class Meta:
        model = RatingSummary
        exclude = ("package","rating")
