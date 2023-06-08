from django.urls import path

from . import views

urlpatterns = [
    path("create/", views.CreateOverseerView.as_view(), name="create"),
    # path("update/", views.UpdateOverseerView.as_view(), name="update"),
    path("", views.OverseerView.as_view(), name="index"),
]