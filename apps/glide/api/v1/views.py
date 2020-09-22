from rest_framework import status
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.glide.services.departments import DepartmentsServices
from apps.glide.services.employees import EmployeesServices
from apps.glide.services.offices import OfficesServices
from .serializers import DepartmentSerializer, EmployeeSerializer, OfficeSerializer


class BaseView(APIView):
    permission_classes = (AllowAny,)
    serializer = None
    service = None

    def get(self, request, pk=None, *args, **kwargs):
        limit = int(request.GET.get("limit", 100))
        offset = int(request.GET.get("offset", 0))
        expand = set(request.GET.getlist("expand"))
        service = self.service(limit, offset, pk)
        _many = pk is None
        data = service.get_data()
        if not data:
            raise NotFound
        return Response(
            status=status.HTTP_200_OK,
            data=self.serializer(
                data, many=_many, context={"data": data, "expand": expand}
            ).data,
        )


class EmployeesView(BaseView):
    serializer = EmployeeSerializer
    service = EmployeesServices


class OfficesView(BaseView):
    serializer = OfficeSerializer
    service = OfficesServices


class DepartmentsView(BaseView):
    serializer = DepartmentSerializer
    service = DepartmentsServices
