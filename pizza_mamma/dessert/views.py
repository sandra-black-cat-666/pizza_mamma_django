from django.shortcuts import render
from .models import Dessert

# Create your views here.
def index(request):
    dessert = Dessert.objects.all().order_by('price')
    return render(request, 'dessert/index.html', { 'dessert': dessert })
