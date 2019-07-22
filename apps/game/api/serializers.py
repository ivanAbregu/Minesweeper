
from rest_framework import serializers
from ..models import Game
from apps.cell.api.serializers import CellSerializer

class GameSerializer(serializers.ModelSerializer):
	owner_full_name = serializers.SerializerMethodField(read_only= True) 
	cells = CellSerializer(source='cell_game', many=True)
	def get_owner_full_name(self, obj): 
		return obj.owner.first_name+" "+obj.owner.last_name

	class Meta:
		model = Game
		fields = ('id',
					'owner_full_name',
					'status',
					'created',
					'cells',
				)
		read_only_fields = fields