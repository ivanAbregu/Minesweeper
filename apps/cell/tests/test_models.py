from django.contrib.auth import get_user_model
from django.test import TestCase
from faker import Faker

from apps.cell.models import Cell
from apps.game.models import Game

User = get_user_model()


class CellTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        fake = Faker()
        email = fake.email()
        user = User.objects.create_user(username=email, email=email)
        game = Game.objects.create(owner=user)
        cls.cell = Cell.objects.create(game=game, row=0, column=0, value=0)
        cls.neighbor = Cell.objects.create(game=game, row=0, column=1, value=-1)
        cls.not_neighbor = Cell.objects.create(game=game, row=100, column=100, value=0)

    def test_game_label(self):
        field_label = self.cell._meta.get_field("game").verbose_name
        self.assertEquals(field_label, "game")

    def test_neighbors_label(self):
        field_label = self.cell._meta.get_field("neighbors").verbose_name
        self.assertEquals(field_label, "neighbors")

    def test_visible_label(self):
        field_label = self.cell._meta.get_field("visible").verbose_name
        self.assertEquals(field_label, "visible")

    def test_value_label(self):
        field_label = self.cell._meta.get_field("value").verbose_name
        self.assertEquals(field_label, "value")

    def test_row_label(self):
        field_label = self.cell._meta.get_field("row").verbose_name
        self.assertEquals(field_label, "row")

    def test_column_label(self):
        field_label = self.cell._meta.get_field("column").verbose_name
        self.assertEquals(field_label, "column")

    def test_flag_label(self):
        field_label = self.cell._meta.get_field("flag").verbose_name
        self.assertEquals(field_label, "flag")

    def test_get_absolute_url(self):
        # This will also fail if the urlconf is not defined.
        self.assertEquals(self.cell.get_absolute_url(), "/api/v1/cell/1/")

    def test_object_to_str(self):
        expected_object_name = f"game: {self.cell.game.id}, ({self.cell.row},{self.cell.column}) ,value:{self.cell.value}"
        self.assertEquals(expected_object_name, str(self.cell))

    def test_is_mine_return_true(self):
        self.assertEquals(self.neighbor.is_mine, True)

    def test_is_mine_return_false(self):
        self.assertEquals(self.cell.is_mine, False)

    def test_visible_default_false(self):
        self.assertEquals(self.cell.visible, False)

    def test_flag_default_false(self):
        self.assertEquals(self.cell.flag, False)

    def test_set_neighbors(self):
        self.cell.set_neighbors()

        self.assertEqual(self.cell.neighbors.count(), 1)
        self.assertTrue(self.cell.neighbors.filter(id=self.neighbor.id).exists())
        self.assertFalse(self.cell.neighbors.filter(id=self.not_neighbor.id).exists())
