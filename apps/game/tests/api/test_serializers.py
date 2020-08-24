from django.contrib.auth import get_user_model
from django.test import TestCase
from faker import Faker

from apps.game.api.v1.serializers import GameSerializer
from apps.game.models import Game

User = get_user_model()


class GameSerializerTests(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        fake = Faker()
        email = fake.email()
        user = User.objects.create_user(username=email, email=email)
        game = Game.objects.create(owner=user)
        game.init_cells()
        cls.serializer = GameSerializer(game)

    def test_value_types(self):
        """test the types are what we expect from the serializer w full object"""

        data = self.serializer.data

        self.assertIsInstance(data["id"], int)
        self.assertIsInstance(data["owner"], int)
        self.assertIsInstance(data["owner_full_name"], str)
        self.assertIsInstance(data["status"], str)
        self.assertIsInstance(data["created"], str)
        self.assertIsInstance(data["cells"], list)
        self.assertIsInstance(data["cells"][0], dict)
        self.assertIsInstance(data["column_size"], int)
        self.assertIsInstance(data["row_size"], int)
        self.assertIsInstance(data["mines_size"], int)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        fields = {
            "id",
            "owner",
            "owner_full_name",
            "status",
            "created",
            "cells",
            "column_size",
            "row_size",
            "mines_size",
        }
        self.assertEqual(set(data.keys()), fields)
