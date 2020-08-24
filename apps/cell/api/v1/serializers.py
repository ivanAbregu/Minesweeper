from rest_framework import serializers

from apps.cell.models import Cell


class CellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cell
        fields = (
            "id",
            "row",
            "column",
            "visible",
            "value",
            "flag",
        )
