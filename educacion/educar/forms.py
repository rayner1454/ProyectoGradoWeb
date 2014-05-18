from django import forms
from educar.models import Profesor,Clase
class ProfesorForm(forms.ModelForm):
    class Meta:
        model = Profesor
        widgets = {
        	'password': forms.PasswordInput(),
    	}

class ClaseForm(forms.ModelForm):
	class Meta:
		model = Clase
		widgets = {
			'nombre': forms.SelectMultiple(attrs={'size':12})
		}