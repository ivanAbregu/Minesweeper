import unittest

from apps.glide.services.departments import DepartmentsServices


class TestDepartmentsServices(unittest.TestCase):
    def test_get_data_by_id_return_dic(self):
        service = DepartmentsServices(pk=1)
        res = service.get_data()
        self.assertEqual(res.get("name"), "Sales")

    def test_get_data_by_id_return_none(self):
        service = DepartmentsServices(pk=999)
        res = service.get_data()
        self.assertIsNone(res)


if __name__ == "__main__":
    unittest.main()
