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
    row_size = models.PositiveIntegerField(default=3)
    column_size = models.PositiveIntegerField(default=3)
    mines_size = models.PositiveIntegerField(default=1)

    def __str__(self):
        return "%s, owner: %s" % (self.id, self.owner)
    
    def setCellValues(self):
        for cell in self.cells.all():
            if cell.value == cell.MINE:
                continue
            count_mine = 0
            for r in range(-1,2):
                for c in range(-1,2):
                    if r == 0 and c == 0:
                        continue
                        
                    row_id = cell.row_id + r
                    column_id = cell.column_id + c

                    try:
                        neighbor = self.cells.get(row_id=row_id,column_id=column_id)
                        if neighbor.value == neighbor.MINE:
                            count_mine += 1
                    except Exception as e:
                        pass 
            cell.value = count_mine
            cell.save()

    def initCells(self):
        cero_cells = self.row_size*self.column_size - self.mines_size 
        values = [0]*cero_cells + [-1]*self.mines_size
        random.shuffle(values)
        for x in range(self.row_size):
            for y in range(self.column_size):
                cell = self.cells.create(row_id=x, column_id=y, value=values.pop())
                cell.save()
        self.setCellValues()