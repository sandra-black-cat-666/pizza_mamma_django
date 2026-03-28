from django.http import HttpResponse
from django.shortcuts import render
from .models import Pizza

# Create your views here.

# def index(request):
#     pizzas = Pizza.objects.all().order_by('price')
#     # pizza_list = [f'{i.name}: {i.price}€' for i in pizzas]
#     # pizza_list_str = ', '.join(pizza_list)
#     return render(request, 'menu/index.html', {'pizzas': pizzas})


import json

def get_pizzas(request):
    pizza_list = Pizza.objects.all().order_by('price') # Pour renvoyer un QuerySet contenant toutes les données relatives aux pizzas.
    pizza_names = list(Pizza.objects.values_list('name', flat=True)) # Pour renvoyer des valeurs et non un dictionnaire ou un QuerySet.
    return render(request, 'menu/index.html', {
        'pizza_list': pizza_list,
        'pizza_names_json': json.dumps(pizza_names) # Pour lier la liste des pizzas (données SQL) au JavaScript.
    })



