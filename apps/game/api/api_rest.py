from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import Game

from .serializers import GameSerializer

class GameViewSet(ModelViewSet):
	"""
        retrieve:
        Return the given Game.

        list:
        Return a list of all the existing Games.

        create:
        Create a new Game instance.

        update:
        Update a Game instance

        partial_update:
        Partial update a Game instance.

        profile:
        Create a new Game instance associated with the authenticated user
    """

	queryset = Game.objects.all().order_by('-created')
	serializer_class = GameSerializer
	#permission_class = [IsAccountAdminOrReadOnly]
	http_method_names = ['get', 'post', 'put', 'delete']
	
	def get_queryset(self):
		qs = super(GameViewSet, self).get_queryset()
		if self.request.user:			
			qs = qs.filter(owner = self.request.user)
		elif not self.request.user.is_superuser:
			qs = qs.none()
		return qs

	def perform_create(self, serializer):
		obj = serializer.save(owner=self.request.user)
		obj.initCells()
		return obj
	
	def perform_update(self, serializer):
		instance = serializer.save()
		cell_id = self.request.data.get('cell_id',None)
		flag = self.request.data.get('flag',None)
		if cell_id:
			if flag is not None:
				instance.setFlag(cell_id,flag)
			else:
				instance.showCell(cell_id)	