# Create your views here.
from educar.models import Profesor
# Primeramente import los viewsets para crear el webservice 
from rest_framework import generics
# Luego los serializers para crear el webservice
from educar.serializers import ProfesorSerializer

from django.shortcuts import render_to_response
from django.template import RequestContext


def inicio(request):
	return render_to_response("index.html", {}, context_instance=RequestContext(request))


class ProfesorList(generics.ListCreateAPIView):
	"""
	WEB SERVICE DE LOS PROFESORES 
	"""
	model = Profesor
	serializer_class = ProfesorSerializer

class ProfesorDetail(generics.RetrieveUpdateDestroyAPIView):
	"""
	Actualizar y borrar la instancia.
	"""
	model = Profesor
	serializer_class = ProfesorSerializer