from django.contrib import admin 

# Importamos todos nuestros modelos para que aparescan en el proyecto
from educar.models import Profesor, Estudiante, Tipo_Material, Material_Educativo, Clase,Examen,Parametros_evaluacion,Evaluacion
from educar.forms import ProfesorForm, ClaseForm

from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse
import csv
import StringIO

def download_csv(self, request, queryset):

    f = StringIO.StringIO()
    writer = csv.writer(f)
    writer.writerow(['Estudiante','Curso','Materia','Parametro de Evaluacion','Nota'])
 
    for s in queryset:
        writer.writerow([s.estudiante, s.clase, s.materia, s.parametro_evaluacion, s.nota])
 
    f.seek(0)
    response = HttpResponse(f, content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=Evaluacion.csv'
    return response

download_csv.short_description = "Descargar Archivo CSV"

def imprimir(modeladmin, request, queryset):
    comp = queryset[0]
    #detalle = []
    #for d in comp.Aduanas.all():
     #   do = {
            #'':,
      #      'Nombre': d.Nombre,
      #      'detalle': d.detalletipopreciod,
      #      'total': d.toting,
      #      'ptotal': d.pago,
      #  }
      #  detalle.append(do)
    t = get_template('reporte.html')
    response = HttpResponse(t.render(Context({'comp': comp})))
    return response

imprimir.short_description = "Imprimir Calificaciones"



class ProfesorAdmin(admin.ModelAdmin):
	list_display =('ci','thumbnail','nombres','apellidos','nacionalidad','sexo','celular','correo_electronico')
	form = ProfesorForm
	fieldsets = [('Datos Personales',{'fields': ['ci','nombres','apellidos','sexo','nacionalidad',('thumbnail','foto'),'nombre_usuario',('password','correo_electronico'),'celular']})]
	readonly_fields = ('thumbnail',)

class EstudianteAdmin(admin.ModelAdmin):
	list_display =('cod_rude','thumbnail','apellidos','nombres','nacionalidad','fecha_nacimiento','sexo','telefono',)
	readonly_fields = ('thumbnail',)
	#form = ProfesorForm
	fieldsets = [('Datos Personales del Estudiante',{'fields': ['cod_rude','nombres','apellidos',('sexo','fecha_nacimiento'),('nacionalidad','curso'),('thumbnail','avatar'),'telefono']})]
	readonly_fields = ('thumbnail',)

class ClaseAdmin(admin.ModelAdmin):
	form = ClaseForm

class Parametros_evaluacionAdmin(admin.ModelAdmin):
	list_display=('parametro_evaluacion','ponderacion','descripcion')

class EvaluacionAdmin(admin.ModelAdmin):
	search_fields = ['estudiante','clase','nota',]
	list_display=('estudiante','clase','materia','parametro_evaluacion','nota')
	list_filter = ['estudiante','clase','nota']

	actions = [imprimir, download_csv]

admin.site.register(Profesor,ProfesorAdmin)
admin.site.register(Estudiante,EstudianteAdmin)
admin.site.register(Tipo_Material)
admin.site.register(Material_Educativo)
admin.site.register(Clase,ClaseAdmin)
admin.site.register(Parametros_evaluacion,Parametros_evaluacionAdmin)
admin.site.register(Evaluacion,EvaluacionAdmin)
admin.site.register(Examen)