import datetime

from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    tanlovlar = (
        ('created', 'To do listning holati Yaratildi '), ('done', 'To do listning holati Bajarildi')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=125, null=True, blank=True)
    image = models.ImageField(upload_to='images', null=True, blank=True)
    due_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=25, default='created', null=True, blank=True, choices=tanlovlar)
    created_date = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    def format_time(self):
        datetodo = self.due_time+datetime.timedelta(hours=5)
        return datetodo.strftime("%d-%B  %H:%M")

    def format_time_html(self):
        datetodo = self.due_time + datetime.timedelta(hours=5)
        return datetodo.strftime("%Y-%m-%dT%H:%M")



    def __str__(self):
        return f"{self.user.first_name}  {self.title}"
