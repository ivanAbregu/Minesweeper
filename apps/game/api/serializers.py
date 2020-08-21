from rest_framework import serializers

from apps.cell.api.serializers import CellSerializer
from ..models import Game


class GameSerializer(serializers.ModelSerializer):
    owner_full_name = serializers.SerializerMethodField(read_only=True)
    cells = CellSerializer(many=True, read_only=True)

    def get_owner_full_name(self, obj):
        return obj.owner.first_name + " " + obj.owner.last_name

    class Meta:
        model = Game

        fields = "__all__"
        read_only_fields = (
            "id",
            "owner",
            "owner_full_name",
            "status",
            "created",
            "cells",
        )
