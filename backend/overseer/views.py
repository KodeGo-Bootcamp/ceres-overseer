from django.forms import ValidationError
from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import  render, redirect
from django.contrib.auth import login
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from overseer.models import Lot
from django.contrib.auth.models import User


# def index(request):
#     return HttpResponse("Hello, world. You're at the polls index.")

class OverseerView(APIView):
    permission_classes = (IsAuthenticated, )
  
    def post(self, request):
        # content = {}
        from django.core import serializers
        content = serializers.serialize("json", Lot.objects.filter(owner=User.objects.get(username=request.user.username).pk))
        return Response(content)
    
# class UpdateOverseerView(APIView):
#     permission_classes = (IsAuthenticated, )
#     def post(self, request):
#         lot = Lot.objects.get(pk=request.data["pk"])
#         lot.name = request.data["name"]
#         lot.location = request.data["location"]
#         lot.size = request.data["size"]
#         lot.soil_type = request.data["soil_type"]
#         lot.note = request.data["note"]
#         lot.planted_date = request.data["planted_date"]
#         lot.seed_name = request.data["seed_name"]
#         lot.predicted_seed_quantity = request.data["predicted_seed_quantity"]
#         lot.predicted_resilience = request.data["predicted_resilience"]
#         lot.predicted_harvest_date = request.data["predicted_harvest_date"]
#         lot.predicted_daily_upkeep = request.data["predicted_daily_upkeep"]
#         lot.predicted_revenue = request.data["predicted_revenue"]
#         lot.save()
#         return Response(status=200)
    
class CreateOverseerView(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        print(request.data)
        lot = Lot(owner=User.objects.get(username=request.user.username))
        lot.name = request.data["name"]
        lot.location = request.data["location"]
        lot.size = request.data["size"]
        lot.soil_type = request.data["soil_type"]
        lot.note = request.data["note"]
        lot.planted_date = request.data["planted_date"]
        lot.seed_name = request.data["seed_name"]
        lot.predicted_seed_quantity = request.data["predicted_seed_quantity"]
        lot.predicted_resilience = request.data["predicted_resilience"]
        lot.predicted_harvest_date = request.data["predicted_harvest_date"]
        lot.predicted_daily_upkeep = request.data["predicted_daily_upkeep"]
        lot.predicted_revenue = request.data["predicted_revenue"]
        lot.save()
        return Response(status=200)
