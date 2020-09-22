import json
from typing import Dict, Any


class BaseServices:
    FILE_PATH = ""

    def __init__(self, limit: int = 100, offset: int = 0, pk: int = None) -> None:
        self.limit = min(limit, 1000)
        self.offset = offset
        self.pk = pk

        with open(self.FILE_PATH, "r") as f:
            content = f.read()
            self.data = json.loads(content)

    def _get_department_by_pk(self) -> Dict[str, Any]:
        return next((x for x in self.data if x.get("id") == self.pk), None)

    def get_data(self):
        if self.pk:
            return self._get_department_by_pk()
        return self.data[self.offset :][: self.limit]
