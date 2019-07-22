from django.db import models
from django.contrib.auth.models import User
import random

class Game(models.Model):
    STATUS_PENDING = "pending"
    STATUS_STARTED = "started"
    STATUS_OVER = "over"

    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pending'),
        (STATUS_STARTED, 'Started'),
        (STATUS_OVER, 'Over'),
    )

    owner = models.ForeignKey(User, related_name='game_owner',  on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,default=STATUS_PENDING)
    row_size = models.PositiveIntegerField(default=2)
    column_size = models.PositiveIntegerField(default=2)
    mines_size = models.PositiveIntegerField(default=2)

    def __str__(self):
        return "%s, owner: %s" % (self.id, self.owner)
    
    def initCells(self):
        cero_cells = self.row_size*self.column_size - self.mines_size 
        values = [0]*cero_cells + [-1]*self.mines_size
        random.shuffle(values)
        for x in range(self.row_size):
            for y in range(self.column_size):
                cell = self.cell_game.create(row_id=x, column_id=y, value=values.pop())
                cell.save()