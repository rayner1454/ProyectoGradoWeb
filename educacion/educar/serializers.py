#A continuacion creamos los serializadores para poder crear el Webservice
#Primeramente importamos serializers
from rest_framework import serializers

# Luego importamos los modelos necesarios para realizar el Webservice
from educar.models import Profesor

class ProfesorSerializer(serializers.ModelSerializer):
	class Meta:
		model = Profesor
		fields = ('ci','nombres','apellidos','nombre_usuario','password','correo_electronico',
			'celular','foto','sexo','nacionalidad')
		read_only_field = ('ci')