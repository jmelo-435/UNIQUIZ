from django.db import models

# Create your models here.
class Question(models.Model):
    OPTION_1=1
    OPTION_2=2
    OPTION_3=3
    OPTION_4=4
    OPTION_5=5
    ANSWER_CHOICES=(
    ((OPTION_1),(1)),
    ((OPTION_2),(2)),
    ((OPTION_3),(3)),
    ((OPTION_4),(4)),
    ((OPTION_5),(5)),
    )
    title = models.CharField(max_length=200, null=False,blank=False,unique=True)
    option_2 = models.CharField(max_length=50, null=False,blank=False)
    option_1 = models.CharField(max_length=50, null=False,blank=False)
    option_3 = models.CharField(max_length=50, null=False,blank=False)
    option_4 = models.CharField(max_length=50, null=False,blank=False)
    option_5 = models.CharField(max_length=50, null=False,blank=False)
    correct_answer=models.IntegerField(choices=ANSWER_CHOICES,blank=False,null=False)

