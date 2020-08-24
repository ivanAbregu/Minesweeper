from django.contrib.auth import get_user_model
from django.test import TestCase
from faker import Faker

from apps.cell.models import MINE
from apps.game.models import Game

User = get_user_model()


class GameTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        fake = Faker()
        email = fake.email()
        cls.user = User.objects.create_user(username=email, email=email)
        cls.game = Game.objects.create(owner=cls.user)

    def test_owner_label(self):
        field_label = self.game._meta.get_field("owner").verbose_name
        self.assertEquals(field_label, "owner")

    def test_created_label(self):
        field_label = self.game._meta.get_field("created").verbose_name
        self.assertEquals(field_label, "created")

    def test_status_label(self):
        field_label = self.game._meta.get_field("status").verbose_name
        self.assertEquals(field_label, "status")

    def test_row_size_label(self):
        field_label = self.game._meta.get_field("row_size").verbose_name
        self.assertEquals(field_label, "row size")

    def test_column_size_label(self):
        field_label = self.game._meta.get_field("column_size").verbose_name
        self.assertEquals(field_label, "column size")

    def test_mines_size_label(self):
        field_label = self.game._meta.get_field("mines_size").verbose_name
        self.assertEquals(field_label, "mines size")

    def test_get_absolute_url(self):
        # This will also fail if the urlconf is not defined.
        self.assertEquals(self.game.get_absolute_url(), f"/api/v1/game/{self.game.id}/")

    def test_object_to_str(self):
        expected_object_name = f"{self.game.id}, owner: {self.game.owner}"
        self.assertEquals(expected_object_name, str(self.game))

    # --TEST DEFAULTS VALUES

    def test_created_default(self):
        self.assertTrue(self.game.created)

    def test_status_default(self):
        game = Game.objects.create(owner=self.user)
        self.assertEquals(game.status, game.STATUS_PENDING)

    def test_row_size_default(self):
        self.assertEquals(self.game.row_size, 3)

    def test_column_size_default(self):
        self.assertEquals(self.game.column_size, 3)

    def test_mines_size_default(self):
        self.assertEquals(self.game.mines_size, 1)

    def test_init_cells(self):
        game = Game.objects.create(owner=self.user)
        game.init_cells()

        self.assertEquals(game.cells.count(), 9)

    def test_show_cell_started_game(self):
        game = Game.objects.create(owner=self.user)
        game.init_cells()
        cell = (
            game.cells.filter(visible=False).exclude(value=MINE).first()
        )  # Cell not mine

        game.show_cell(cell.id)

        cell.refresh_from_db()
        self.assertEquals(cell.visible, True)
        self.assertEquals(game.status, game.STATUS_STARTED)

    def test_show_cell_lost_game(self):
        game = Game.objects.create(owner=self.user)
        game.init_cells()
        mine = game.cells.filter(value=MINE, visible=False).first()

        game.show_cell(mine.id)

        mine.refresh_from_db()
        game.refresh_from_db()
        self.assertEquals(mine.visible, True)
        self.assertEquals(game.status, game.STATUS_LOST)
        self.assertFalse(game.cells.filter(visible=False))

    def test_set_flag_win(self):
        game = Game.objects.create(owner=self.user)
        game.init_cells()
        mine = game.cells.filter(value=MINE, visible=False, flag=False).first()
        cell = (
            game.cells.filter(visible=False).exclude(value=MINE).first()
        )  # Cell not mine
        game.show_cell(cell.id)
        game.set_flag(mine.id, True)

        mine.refresh_from_db()
        game.refresh_from_db()
        self.assertEquals(mine.flag, True)
        self.assertEquals(game.status, game.STATUS_WIN)
