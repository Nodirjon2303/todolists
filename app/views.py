import datetime

from django.contrib.auth import login, logout, authenticate
from django.http import JsonResponse, HttpResponse, Http404
from django.shortcuts import render, redirect
from .models import *
import json

from .form import SignupForm
from django.contrib.auth.forms import UserCreationForm



# Create your views here.


def home(request):
    if request.method == "POST":
        data = json.loads(request.body)
        description = data['description']
        status = data['status']
        id = data['id']
        todo_date = data['datetime']
        print(todo_date)
        date, time = tuple(todo_date.split('T'))
        year, month, day = tuple(date.split('-'))
        hour, minutes = time.split(':')
        datetodo = datetime.datetime(year=int(year), month=int(month), day=int(day), hour=int(hour),
                                     minute=int(minutes))
        if status == 'update':
            todo = Todo.objects.get(id = id)
            todo.title = description
            todo.due_time = datetodo
            todo.save()
        else:
            new_todo = Todo.objects.create(user=request.user, title=description, due_time=datetodo)
            new_todo.save()
        return JsonResponse({"data": 'ok'})
    if not request.user.is_authenticated:
        return redirect('login')
    user = request.user
    todos = Todo.objects.filter(user=user).order_by('-due_time')
    return render(request=request, template_name='home.html', context={'todos': todos})


def deleteTodoView(request):
    if request.method == "POST":
        data = json.loads(request.body)
        todo_id = data['delete_id']
        todo = Todo.objects.get(id=todo_id)
        todo.delete()
        return JsonResponse({"data": 'ok'})
    return HttpResponse("404")


def checkTodoView(request):
    if request.method == "POST":
        data = json.loads(request.body)
        todo_id = data['todo_id']
        todo = Todo.objects.get(id=todo_id)
        todo.status = 'done'
        todo.save()
        return JsonResponse({"data": 'ok'})
    return HttpResponse("404")


def filterTodoView(request):
    if request.method == "POST":
        data = json.loads(request.body)
        filter = data['filter']
        if filter == 'completed':
            todos = Todo.objects.filter(status='done', user=request.user)
        elif filter == 'active':
            todos = Todo.objects.filter(status='created', user=request.user)
        else:
            todos = Todo.objects.filter(user=request.user)
        data = []
        for i in todos:
            data.append({
                'title': i.title,
                'duetime': i.format_time(),
                'status': i.status
            })

        return JsonResponse({"data": data})
    return HttpResponse("404")



def login_View(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if request.user.is_authenticated:
            return redirect('home')
        user = authenticate(request=request, username=username, password=password)
        print(user)
        if user:
            login(request=request, user=user)
            return redirect('home')


    return render(request, 'login.html')
def signup_View(request):
    form = SignupForm(request.POST)
    if form.is_valid():
        data = form.cleaned_data
        form.save()
        print(data)
        user = authenticate(request=request, username=data['username'], password=data['password1'])
        print(user)
        login(request=request, user=user)
        return redirect('home')




    return render(request, 'signup.html', context={'form':form})


def logout_View(request):
    logout(request)
    return redirect('login')