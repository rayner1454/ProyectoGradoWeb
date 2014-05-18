from django.db import models
# Bueno en esta parte creare mis modelos necesarios para el presente proyect
# Create your models here.
#En primer lugar creamos la clase profesor
# Importamos el CountryField para usar en los campos
from django_countries import CountryField

# Importamos el CKEditor para Modificar
#from ckeditor.fields import RichTextField
#RichTextField la libreria de thumbnail ojo sorl.thumbnail
from sorl.thumbnail import ImageField

#Primeramente  creamos las opciones de Genero 
GENERO_CHOICES = (
    	('F', 'Femenino'),
    	('M', 'Masculino'),
    )
# A continuacion defimos las materias que se encuentran en primaria
MATERIA_CHOICES= (
		('LENGUAJE','Lenguaje'),
		('MATEMATICAS','Matematicas'),
		('CIENCIAS SOCIALES','Ciencias Sociales'),
		('CIENCIAS DE LA VIDA','Ciencias de la Vida'),
	)

# A continacion creamos la clase Profesor, donde definimos los campos que tendra.

class Profesor(models.Model):
	
	#Vamos a crear un thumbnail para las imagenes

	def thumbnail(self):
		if self.foto:
			return '<a href="/media/%s"><img src="/media/%s" width=150/></a>'%(self.foto,self.foto)
		else:
			return '(Sin Imagen)'

	thumbnail.short_description = ''
	thumbnail.allow_tags= True

	ci = models.CharField(max_length=10, primary_key=True, verbose_name=u'Cedula de Identidad')
	nombres = models.CharField(max_length=100, verbose_name=u'Nombres')
	apellidos = models.CharField(max_length=50, verbose_name=u'apellidos')
	nombre_usuario = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	correo_electronico = models.EmailField(max_length=75)
	celular = models.CharField(max_length=50)
	foto = ImageField(upload_to ='educar', verbose_name='Foto')
	#Declaramos nuestra funcion con las opciones declaradas en GENERO_CHOICES
	sexo = models.CharField(max_length=15, choices=GENERO_CHOICES, default='F')
	#Declaramos Countryfield para obtener los paises
	nacionalidad = CountryField()

	def __unicode__(self):
		#Primero concatenamos para obtener el nombre completo de de una persona
		nombrecompleto = "%s %s"%(self.nombres, self.apellidos)
		return nombrecompleto

	#La siguiente clase me permite cambiar el nombre de la clase en el Django Admin
	class Meta:
		verbose_name=u'Docente'
		verbose_name_plural = 'Docentes'

# Declaramos la clase 'Clase'

class Clase(models.Model):
	curso = models.CharField(max_length=50,verbose_name=u'Nombre del Curso')
	docente = models.ForeignKey('Profesor', related_name='Pertenece a Profesor')

	def __unicode__(self):
		return self.curso
    
#Declaramos la clase de Estudiante, donde se establece los campos que tendra

class Estudiante(models.Model):

	def thumbnail(self):
		if self.avatar:
			return '<a href="/media/%s"><img src="/media/%s" width=150/></a>'%(self.avatar,self.avatar)
		else:
			return '(Sin Imagen)'

	thumbnail.short_description = ''
	thumbnail.allow_tags= True

	cod_rude = models.CharField(max_length=20, primary_key=True,verbose_name=u'Codigo Rude')
	nombres = models.CharField(max_length=100)
	apellidos = models.CharField(max_length=50)
	curso = models.ForeignKey(Clase,related_name='Pertenece a una clase')
	nombre_usuario = models.CharField(max_length=50)
	password = models.CharField(max_length=50)
	avatar = models.ImageField(upload_to ='educar', verbose_name='Foto')
	fecha_nacimiento = models.DateField()
	telefono = models.CharField(max_length=50)
	#Declaramos nuestra funcion con las opciones declaradas en GENERO_CHOICES
	sexo = models.CharField(max_length=15, choices=GENERO_CHOICES, default='F')
	#Declaramos Countryfield para obtener los paises
	nacionalidad = CountryField()

	def __unicode__(self):
		#Primero concatenamos para obtener el nombre completo de de una persona
		nombrecompleto = "%s %s"%(self.nombres, self.apellidos)
		return nombrecompleto



#Declaramos la clase de tipo de Material
class Tipo_Material(models.Model):
	tipo_material = models.CharField(max_length=20, verbose_name=u'Tipo de Material Educativo', unique=True)
	descripcion = models.TextField()

	def  __unicode__(self):
		return self.tipo_material

	#La siguiente clase me permite cambiar el nombre de la clase en el Django Admin
	class Meta:
		verbose_name=u'Tipo de Material Educativo'
		verbose_name_plural = 'Tipos de Materiales Educativos'

#Declaramos la clase Material Educativo donde los maestros podran subir todos sus materiales
class Material_Educativo(models.Model):
	Tipo_Material = models.ForeignKey('Tipo_Material', related_name='Tipo_Material')
	clase = models.CharField(max_length=50,verbose_name=u'Materia', choices=MATERIA_CHOICES, default='LENGUAJE')
	titulo = models.CharField(max_length=100)
	material = models.FileField(upload_to='materiales')
	descripcion = models.TextField()

	def __unicode__(self):
		return self.titulo

	class Media:
   		js = ['/static/grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js',
   		'/static/grappelli/tinymce_setup/tinymce_setup.js',
   		]
   		
	class Meta:
		verbose_name=u'Material Educativo'
		verbose_name_plural = 'Materiales Educativos'





#Declaramos la clase Material Educativo donde los maestros podran subir todos sus materiales
class Examen(models.Model):
	profesor= models.ForeignKey('Profesor',related_name='Profesor')
	curso= models.ForeignKey('Clase', related_name='Pertenece a clase')
	examen = models.FileField(upload_to='examen')
	descripcion = models.TextField()

	def __unicode__(self):
		return "%s"%(self.id)
   		
	class Meta:
		verbose_name=u'Examen de curso'
		verbose_name_plural = 'Examenes de cursos'

# Declaramos los parametros para la evluacion para los estudiantes

class Parametros_evaluacion(models.Model):
	parametro_evaluacion = models.CharField(max_length=100)
	ponderacion = models.FloatField(default=0)
	descripcion = models.TextField()

	def __unicode__(self):
		return self.parametro_evaluacion

	class Meta:
		verbose_name=u'Parametro de Evaluacion'
		verbose_name_plural = 'Parametros de Evaluacion'

# Declaramos la clase 'Evaluacion'

class Evaluacion(models.Model):
	profesor= models.ForeignKey(Profesor, related_name='Pertenece a la clase Profesor')
 	estudiante = models.ForeignKey(Estudiante, related_name='Pertenece a la clase Estudiante')
 	materia = models.CharField(max_length=50, unique=True, choices=MATERIA_CHOICES, default='LENGUAJE')
 	clase = models.ForeignKey(Clase,related_name='Pertenece a Clase')
 	parametro_evaluacion = models.ForeignKey(Parametros_evaluacion,related_name='Pertenece a Parametro Evaluacion')
 	nota = models.FloatField(default=0)

 	class Meta:
		verbose_name=u'Calificacion del Estudiante'
		verbose_name_plural = 'Calificaciones de Estudiantes'
