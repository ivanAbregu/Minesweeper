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
    
    def gameOver(self):
        self.status = self.STATUS_OVER
        self.save()
        for cell in self.cells.all():
            cell.visible = True
            cell.save()


    def setCellValues(self):
        for cell in self.cells.all():
            if cell.isMine():
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
                        if neighbor.isMine():
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

    def showCell(self, cell_id):
        if self.status==Game.STATUS_PENDING:
            self.status = Game.STATUS_STARTED
            self.save()

        cell = self.cells.get(id=cell_id)
        if cell.isMine():
            self.gameOver()
        else:
            cell.visible = True
            cell.save()
            if cell.value==0:
                self.showNeighbor(cell)
            
    def showNeighbor(self,cell):        
        for r in range(-1,2):
            for c in range(-1,2):
                if r == 0 and c == 0:
                    continue            
                row_id = cell.row_id + r
                column_id = cell.column_id + c
                try:
                    neighbor = self.cells.get(row_id=row_id,column_id=column_id)
                    if not neighbor.visible:
                        neighbor.visible = True
                        neighbor.save()
                        if neighbor.value==0:
                            self.showNeighbor(neighbor)
                except Exception as e:
                    continue 