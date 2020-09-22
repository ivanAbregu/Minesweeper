import logging
from typing import Dict, Any

import requests

URL = "https://rfy56yfcwk.execute-api.us-west-1.amazonaws.com/bigcorp/employees"
logger = logging.getLogger()


class EmployeesServices:
    def __init__(self, limit: int = 100, offset: int = 0, pk: int = None) -> None:
        self.limit = min(limit, 1000)
        self.offset = offset
        self.pk = pk

    def get_default_header(self) -> Dict[str, str]:
        return {
            "Content-Type": "application/json",
        }

    def get_data(self) -> Dict[str, Any]:
        if self.pk:
            params = {"id": self.pk}
        else:
            params = {
                "limit": self.limit,
            }
            if self.offset:
                params["offset"] = self.offset

        response = requests.get(URL, params=params, headers=self.get_default_header())
        data = response.json()
        if self.pk:
            return data[0]
        return data
