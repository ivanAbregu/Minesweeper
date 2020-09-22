from rest_framework import serializers

from apps.glide.services.departments import DepartmentsServices
from apps.glide.services.offices import OfficesServices


class CustomBaseSerializer(serializers.Serializer):
    MANAGER = "manager"
    OFFICE = "office"
    DEPARTMENT = "department"
    SUPERDEPARTMENT = "superdepartment"

    id = serializers.IntegerField()

    def __init__(self, *args, **kwargs):
        super(CustomBaseSerializer, self).__init__(*args, **kwargs)
        self.res_expand = set()

    def should_expand(self, lookup_field: str) -> bool:
        """ Set the field expand"""
        expand = self.context.get("expand", [])
        result = False
        for x in expand:
            if lookup_field in x:
                aux = x.split(".", 1)
                if aux[0] == lookup_field:
                    result = True
                    if len(aux) == 2:
                        self.res_expand.add(aux[1])
                    break
        return result

    def get_serialized_data(self, obj, look_up: str, serializer, data):
        _id = obj.get(look_up)
        if self.should_expand(look_up):
            instance = next((x for x in data if x.get("id") == _id), None)
            if instance:
                return serializer(
                    instance, context={"data": data, "expand": self.res_expand}
                ).data
        return _id


class OfficeSerializer(CustomBaseSerializer):
    city = serializers.CharField(max_length=200)
    country = serializers.CharField(max_length=200)
    address = serializers.CharField(max_length=200)


class DepartmentSerializer(CustomBaseSerializer):
    name = serializers.CharField(max_length=200)
    superdepartment = serializers.SerializerMethodField(read_only=True)

    def get_superdepartment(self, obj) -> str:
        data = DepartmentsServices().get_data()
        return self.get_serialized_data(
            obj, self.SUPERDEPARTMENT, DepartmentSerializer, data
        )


class EmployeeSerializer(CustomBaseSerializer):
    first = serializers.CharField(max_length=200)
    last = serializers.CharField(max_length=200)
    manager = serializers.SerializerMethodField(read_only=True)
    department = serializers.SerializerMethodField(read_only=True)
    office = serializers.SerializerMethodField(read_only=True)

    def get_manager(self, obj) -> str:
        data = self.context.get("data")
        return self.get_serialized_data(obj, self.MANAGER, EmployeeSerializer, data)

    def get_office(self, obj) -> str:
        data = OfficesServices().get_data()
        return self.get_serialized_data(obj, self.OFFICE, OfficeSerializer, data)

    def get_department(self, obj) -> str:
        data = DepartmentsServices().get_data()
        return self.get_serialized_data(
            obj, self.DEPARTMENT, DepartmentSerializer, data
        )
