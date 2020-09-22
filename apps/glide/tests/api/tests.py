from unittest import mock

from django.urls import reverse
from faker import Faker
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

fake = Faker()


class OfficesViewTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()
        cls.fake_data = {
            "id": fake.random_int(),
            "city": fake.name(),
            "country": fake.name(),
            "address": fake.address(),
        }

    @mock.patch("apps.glide.services.offices.OfficesServices.get_data",)
    def test_detail_return_data(self, mock_service_data):
        mock_service_data.return_value = self.fake_data
        resp = self.client.get(path=reverse("office", args=(self.fake_data["id"],)))
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        for key, value in data.items():
            value_ = self.fake_data.get(key)
            self.assertEqual(value, value_)

    @mock.patch("apps.glide.services.offices.OfficesServices.get_data",)
    def test_list_return_data(self, mock_service_data):
        mock_service_data.return_value = [self.fake_data]

        resp = self.client.get(path=reverse("offices"))
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        for key, value in data[0].items():
            value_ = self.fake_data.get(key)
            self.assertEqual(value, value_)


class EmployeesViewTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()
        cls.fake_data = {
            "id": fake.random_int(),
            "first": fake.name(),
            "last": fake.name(),
            "manager": fake.random_int(),
            "office": fake.random_int(),
            "department": fake.random_int(),
        }

    @mock.patch("apps.glide.services.employees.EmployeesServices.get_data",)
    def test_detail_return_data(self, mock_service_data):
        mock_service_data.return_value = self.fake_data
        resp = self.client.get(path=reverse("employee", args=(self.fake_data["id"],)))
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        for key, value in data.items():
            value_ = self.fake_data.get(key)
            self.assertEqual(value, value_)

    @mock.patch("apps.glide.services.employees.EmployeesServices.get_data",)
    def test_list_return_data(self, mock_service_data):
        mock_service_data.return_value = [self.fake_data]

        resp = self.client.get(path=reverse("employees"))
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        for key, value in data[0].items():
            value_ = self.fake_data.get(key)
            self.assertEqual(value, value_)


class DepartmentsViewTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.client = APIClient()
        cls.fake_data = {
            "id": fake.random_int(),
            "name": fake.name(),
            "superdepartment": fake.random_int(),
        }

    @mock.patch("apps.glide.services.departments.DepartmentsServices.get_data",)
    def test_detail_return_data(self, mock_service_data):
        mock_service_data.return_value = self.fake_data
        resp = self.client.get(path=reverse("department", args=(self.fake_data["id"],)))
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        for key, value in data.items():
            value_ = self.fake_data.get(key)
            self.assertEqual(value, value_)

    @mock.patch("apps.glide.services.departments.DepartmentsServices.get_data",)
    def test_list_return_data(self, mock_service_data):
        mock_service_data.return_value = [self.fake_data]

        resp = self.client.get(path=reverse("departments"))
        data = resp.json()

        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        for key, value in data[0].items():
            value_ = self.fake_data.get(key)
            self.assertEqual(value, value_)
