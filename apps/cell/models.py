from django.db import models

MINE = -1  # Indicate that a cell is a mine


class Cell(models.Model):

    game = models.ForeignKey(
        "game.Game", related_name="cells", on_delete=models.CASCADE
    )
    visible = models.BooleanField(default=False)
    value = models.IntegerField()
    row_id = models.PositiveIntegerField()
    column_id = models.PositiveIntegerField()
    flag = models.BooleanField(default=False)

    def is_mine(self):
        return self.value == MINE

    def __str__(self):
        return f"game: {self.game.id}, ({self.row_id},{self.column_id}) ,value:{self.value}"
