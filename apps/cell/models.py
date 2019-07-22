from django.db import models

class Cell(models.Model):
    MINE = -1  #Indicate that a cell is a mine

    game = models.ForeignKey('game.Game', related_name='cell_game',  on_delete=models.CASCADE)
    visible = models.BooleanField(default=False)
    value = models.IntegerField()
    row_id = models.PositiveIntegerField()
    column_id = models.PositiveIntegerField()
    def __str__(self):
        return "game: %s, (%s,%s) ,value:%s" % (self.game.id,self.row_id,self.column_id,self.value)