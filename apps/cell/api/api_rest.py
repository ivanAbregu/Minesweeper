from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from ..models import Cell

from .serializers import CellSerializer

class CellViewSet(ModelViewSet):
	"""
        retrieve:
        Return the given Cell.

        list:
        Return a list of all the existing Cells.

        create:
        Create a new Cell instance.

        update:
        Update a Cell instance

        partial_update:
        Partial update a Cell instance.

        profile:
        Create a new Cell instance associated with the authenticated user
    """

	queryset = Cell.objects.all().order_by('-created')
	serializer_class = CellSerializer
	http_method_names = ['get', 'post', 'put', 'delete']
	
	def get_queryset(self):
		qs = super(CellViewSet, self).get_queryset()
		if self.request.user:			
			qs = qs.filter(owner = self.request.user)
		elif not self.request.user.is_superuser:
			qs = qs.none()
		return qs

	def perform_create(self, serializer):
		return serializer.save(owner=self.request.user)