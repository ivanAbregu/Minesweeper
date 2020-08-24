from contextlib import suppress

from django.db import models
from django.urls import reverse_lazy

MINE = -1  # Indicate that a cell is a mine
COORDINATES_NEIGHBORS = (
    (-1, -1),
    (-1, 0),
    (-1, 1),
    (0, -1),
    (0, 1),
    (1, -1),
    (1, 0),
    (1, 1),
)


class Cell(models.Model):

    game = models.ForeignKey(
        "game.Game", related_name="cells", on_delete=models.CASCADE
    )
    neighbors = models.ManyToManyField("Cell")
    visible = models.BooleanField(default=False)
    value = models.IntegerField()
    row = models.PositiveIntegerField()
    column = models.PositiveIntegerField()
    flag = models.BooleanField(default=False)

    @property
    def is_mine(self) -> bool:
        return self.value == MINE

    def set_neighbors(self) -> None:
        for r, c in COORDINATES_NEIGHBORS:
            row = self.row + r
            column = self.column + c
            with suppress(Exception):
                neighbor = self.game.cells.get(row=row, column=column)
                self.neighbors.add(neighbor)

    def get_absolute_url(self) -> reverse_lazy:
        return reverse_lazy("cell-detail", args=[str(self.id)])

    def __str__(self):
        return f"game: {self.game.id}, ({self.row},{self.column}) ,value:{self.value}"
