import unittest

from apps.glide.services.offices import OfficesServices


class TestDepartmentsServices(unittest.TestCase):
    def test_get_data_by_id_return_dic(self):
        service = OfficesServices(pk=1)
        res = service.get_data()
        self.assertEqual(res.get("city"), "San Francisco")

    def test_get_data_by_id_return_none(self):
        service = OfficesServices(pk=999)
        res = service.get_data()
        self.assertIsNone(res)


if __name__ == "__main__":
    unittest.main()
