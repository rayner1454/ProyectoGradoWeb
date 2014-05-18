"""
This file was generated with the customdashboard management command and
contains the class for the main dashboard.

To activate your index dashboard add the following to your settings.py::
    GRAPPELLI_INDEX_DASHBOARD = 'educacion.dashboard.CustomIndexDashboard'
"""

from django.utils.translation import ugettext_lazy as _
from django.core.urlresolvers import reverse

from grappelli.dashboard import modules, Dashboard
from grappelli.dashboard.utils import get_admin_site_name


class CustomIndexDashboard(Dashboard):
    """
    Custom index dashboard for www.
    """
    
    def init_with_context(self, context):
       # site_name = get_admin_site_name(context)
        
        # append a group for "Administration" & "Applications"
        self.children.append(modules.Group(
            _('Sistema de Educacion'),
            column=1,
            collapsible=True,
            children = [
                modules.AppList(
                    _('Administracion de Usuarios'),
                    column=1,
                    collapsible=False,
                    models=('django.contrib.*',),
                )
            ]
        ))
        
        # append an app list module for "Applications"
        self.children.append(modules.AppList(
            _('Sistemas de Educacion'),
            collapsible=True,
            column=1,
            css_classes=('collapse closed',),
            exclude=('django.contrib.*','educar.models.Tipo_Material','educar.models.Material_Educativo','educar.models.Parametros_evaluacion',),
        ))
                # append an app list module for "Applications"
        self.children.append(modules.AppList(
            _('Gestion de Material Educativo'),
            collapsible=True,
            column=2,
            css_classes=('collapse closed',),
            exclude=('django.contrib.*','educar.models.Clase','educar.models.Profesor','educar.models.Estudiante','educar.models.Parametros_evaluacion','educar.models.Evaluacion',),
        ))

        self.children.append(modules.AppList(
            _('Gestion de Calificacion de Estudiantes'),
            collapsible=True,
            column=2,
            css_classes=('collapse closed',),
            exclude=('django.contrib.*','educar.models.Clase','educar.models.Profesor','educar.models.Estudiante','educar.models.Tipo_Material','educar.models.Examen','educar.models.Material_Educativo',),
        ))
          # append an app list module for "Applications"
        self.children.append(modules.AppList(
            _('Reportes de Notas'),
            collapsible=True,
            column=1,
            css_classes=('collapse closed',),
            exclude=('django.contrib.*','educar.models.Clase','educar.models.Profesor','educar.models.Estudiante','educar.models.Tipo_Material','educar.models.Material_Educativo','educar.models.Parametros_evaluacion',),

        ))
       
        # append a recent actions module
        self.children.append(modules.RecentActions(
            _('Recent Actions'),
            limit=5,
            collapsible=True,
            column=3,
        ))


