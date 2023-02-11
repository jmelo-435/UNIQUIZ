from django.db import models

# Create your models here.
class Result(models.Model):
    user_name=models.CharField(max_length=20, null=False,blank=False)
    correct_answers=models.IntegerField(blank=False,null=False)
    date=models.DateTimeField(auto_now=True)
    seconds=models.IntegerField(blank=False,null=False)
