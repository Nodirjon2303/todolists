from django.contrib.auth.models import User
from django.forms import ModelForm, Form
from django.contrib.auth.forms import UserCreationForm
from django import  forms
class  SignupForm(UserCreationForm):
    username = forms.CharField(max_length=120, required=True, widget=forms.TextInput(attrs={
        'placeholder': 'Username kiriting'
    }))
    first_name = forms.CharField(widget=forms.Textarea(attrs={
        'style': "background-color:lightblue;",
        'placeholder': 'Ismingizni kiriting'
    }))
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'password1', 'password2']