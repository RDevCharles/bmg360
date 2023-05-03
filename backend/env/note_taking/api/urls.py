
from django.urls import path
from . import views
#urls for the api invoking the views
urlpatterns = [
    path("", views.index, name="index"),
    path("/show/<int:pk>", views.show, name="show"),
     path("/create/", views.create, name="create"),
     path("/update/<int:pk>", views.update, name="update"),
     path("/delete/<int:pk>", views.deleteNote, name="delete"),
]