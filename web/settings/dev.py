from .base import *

ENVIRONMENT_NAME = "development"

# INSTALLED_APPS += [
#     'debug_toolbar',
# ]

# MIDDLEWARE += [
#     'debug_toolbar.middleware.DebugToolbarMiddleware',
# ]

ALLOWED_HOSTS += ["localhost"]
INTERNAL_IPS = [
    "localhost",
]


def show_toolbar(request):
    return True


DEBUG_TOOLBAR_CONFIG = {
    "SHOW_TOOLBAR_CALLBACK": show_toolbar,
}
