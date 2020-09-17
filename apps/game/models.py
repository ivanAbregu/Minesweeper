import random
from typing import List

from django.contrib.auth import get_user_model
from django.db import models
from django.urls import reverse_lazy

from apps.cell.models import Cell, MINE

User = get_user_model()


class Game(models.Model):
    STATUS_PENDING = "pending"
    STATUS_STARTED = "started"
    STATUS_LOST = "lost"
    STATUS_WIN = "win"

    STATUS_CHOICES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_STARTED, "Started"),
        (STATUS_LOST, "Lost"),
        (STATUS_WIN, "Win"),
    )

    owner = models.ForeignKey(User, related_name="game_owner", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING
    )
    row_size = models.PositiveIntegerField(default=3)
    column_size = models.PositiveIntegerField(default=3)
    mines_size = models.PositiveIntegerField(default=1)

    def __str__(self) -> str:
        return f"{self.id}, owner: {self.owner}"

    def get_absolute_url(self) -> reverse_lazy:
        return reverse_lazy("game-detail", args=[str(self.id)])

    def init_cells(self) -> None:
        """Create cells"""

        values = self._get_values()
        for x in range(self.row_size):
            for y in range(self.column_size):
                cell = self.cells.create(row=x, column=y, value=values.pop())
                cell.save()
        self._set_neighbords()

    def set_flag(self, cell_id: int, flag: int) -> None:
        """Set flag of a cell, the max flags able to set is the number of mines"""
        cells_flags = self.cells.filter(flag=True).count()
        if cells_flags != self.mines_size or not flag:
            cell = self.cells.get(id=cell_id)
            cell.flag = flag
            cell.save()
            self._verify_game()

    def show_cell(self, cell_id: int) -> None:
        """ Show a cell and if no adjacent mines, all adjacent squares will be revealed (and repeat)"""
        cell = self.cells.get(id=cell_id)
        if cell.flag:
            cell.flag = False
            cell.save()
        elif cell.is_mine:
            self._game_lost()
        else:
            cell.visible = True
            cell.save()
            if cell.value == 0:
                self._show_neighbor(cell)
        self._verify_game()

    # --- PRIVATE HELPERS

    def _game_lost(self) -> None:
        """ Set the status of the game on lost and visible all the cells"""
        self.status = self.STATUS_LOST
        self.save()
        for cell in self.cells.all():
            cell.visible = True
            cell.save()

    def _get_values(self) -> List[int]:
        zero_cells = self.row_size * self.column_size - self.mines_size
        values = [0] * zero_cells + [-1] * self.mines_size
        random.shuffle(values)
        return values

    def _set_neighbords(self) -> None:
        for cell in self.cells.all():
            cell.set_neighbors()

    def _show_neighbor(self, cell: Cell) -> None:
        for neighbor in cell.neighbors.all():
            if not neighbor.visible and not neighbor.flag:
                neighbor.visible = True
                neighbor.save()
                if neighbor.value == 0:
                    self._show_neighbor(neighbor)

    def _verify_game(self) -> None:
        """Verify if all the flags were put it and there aren't cell without show"""
        mines_flags = self.cells.filter(value=MINE, flag=True)
        cells_not_visible = self.cells.exclude(value=-1).filter(visible=False)
        if mines_flags.count() == self.mines_size and cells_not_visible.count() == 0:
            self.status = self.STATUS_WIN
            self.save()
        elif self.status == Game.STATUS_PENDING:
            self.status = Game.STATUS_STARTED
            self.save()
