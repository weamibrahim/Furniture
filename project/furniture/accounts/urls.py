from django.urls import path

from . import views

urlpatterns = [
   path('register/',views.register, name='register'),
   path('login/',views.login_user, name='login'),
   path('update/',views.update_user, name='update'),
   path('logout/',views.logout_user, name='logout'),
   
    
     
  
]