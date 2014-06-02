from django.conf.urls import patterns, include, url

# Es importante declarar esta linea para la subida de imagenes 
# ademas puedan ser visualizadas 
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
# Uncomment the next two lines to enable the admin:
from django.contrib import admin
# importamos el enrutador para el webservice
#from rest_framework import routers

# importamos las vistas para crear los webservices
from educar.views import ProfesorList, ProfesorDetail

#router = routers.DefaultRouter()
#router.register(r'Profesor', views.ProfesorViewSet)
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'educacion.views.home', name='home'),
    # url(r'^educacion/', include('educacion.foo.urls')),
    url(r'^$','django.contrib.auth.views.login',{'template_name':'index.html'},name='login'),
    url(r'^cerrar/$','django.contrib.auth.views.logout_then_login',name='logout'),
    url(r'^menu/$','django.contrib.auth.views.login',{'template_name':'menu.html'},name='menu'),
    url(r'^menu/temas/$','django.contrib.auth.views.login',{'template_name':'temas.html'},name='temas'),
    
    url(r'^menu/temas/sistema/$','django.contrib.auth.views.login',{'template_name':'temas_sistema.html'},name='temas_sistema'),
    url(r'^menu/temas/sistema/movimiento/$','django.contrib.auth.views.login',{'template_name':'sistema.html'},name='movimiento_tierra'),
    url(r'^menu/temas/sistema/sistema_solar/$','django.contrib.auth.views.login',{'template_name':'sistema_solar.html'},name='sistema_solar'),
    url(r'^menu/temas/sistema/libro_sistema/$','django.contrib.auth.views.login',{'template_name':'libro_sistema_solar.html'},name='libro_sistema_solar'),
    
    url(r'^menu/temas/seres_vivos/$','django.contrib.auth.views.login',{'template_name':'temas_seresvivos.html'},name='temas_seres'),
    url(r'^menu/temas/seres_vivos/clasificacion/$','django.contrib.auth.views.login',{'template_name':'seres_vivos.html'},name='seres_vivos'),
    url(r'^menu/temas/seres_vivos/sonidos/$','django.contrib.auth.views.login',{'template_name':'sonidos_animales.html'},name='sonidos_animales'),
    url(r'^menu/temas/seres_vivos/libro_seres/$','django.contrib.auth.views.login',{'template_name':'libro_seres_vivos.html'},name='libro_sistema_solar'),
    
    url(r'^menu/temas/actividad/$','django.contrib.auth.views.login',{'template_name':'actividad.html'},name='actividad_complementaria'),
    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^api/v1.0/$',ProfesorList.as_view(),name='Lista-Profesores'),
    url(r'^api/v1.0/(?P<pk>\d+)/$',ProfesorDetail.as_view(),name='Detalle-Profesores'),
    url(r'^grappelli/', include('grappelli.urls')),
    # Es importante esta linea de codigo porque sin esta linea de codigo no se podran visualizar las imagenes
    # ademas que tiene la opcion para que se direccion correctamente hasta la ubicacion de la imagen
    #url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes': False}),
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    #url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT, 'show_indexes': True }),
    url(r'', include('django.contrib.staticfiles.urls')),
    
    # La siguiente linea de codigo sirve para incluir las opciones del Editor de Texto con opciones parecdidas a Word
    #(r'^ckeditor/', include('ckeditor.urls')),

)
if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.STATIC_ROOT, 'show_indexes':True}),
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
            {'document_root': settings.MEDIA_ROOT, 'show_indexes':True}),
    )
