from functools import wraps

from django.http import HttpResponseForbidden


def has_permission(request, roles):
    user = request.user
    return user.is_authenticated()


def has_permission_webApp(request):
    return request.user.is_authenticated()


def roles_permissions(roles=[]):
    def _my_decorator(view_func):
        def _decorator(request, *args, **kwargs):
            if has_permission(request, roles):
                response = view_func(request, *args, **kwargs)
                return response
            else:
                return HttpResponseForbidden()

        return wraps(view_func)(_decorator)

    return _my_decorator
