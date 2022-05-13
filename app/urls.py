
from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('delete/', deleteTodoView, name='delete'),
    path('check/', checkTodoView, name='check'),
    path('filter/', filterTodoView, name='filter'),
    path('login/', login_View, name='login'),
    path('signup/', signup_View, name='signup'), 
    path('logout/', logout_View, name='logout')
]