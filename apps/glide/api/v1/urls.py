from django.urls import path

from . import views

urlpatterns = (
    path("employees/", views.EmployeesView.as_view(), name="employees"),
    path("employees/<int:pk>/", views.EmployeesView.as_view(), name="employee"),
    path("offices/", views.OfficesView.as_view(), name="offices"),
    path("offices/<int:pk>/", views.OfficesView.as_view(), name="office"),
    path("departments/", views.DepartmentsView.as_view(), name="departments"),
    path("departments/<int:pk>/", views.DepartmentsView.as_view(), name="department"),
)
