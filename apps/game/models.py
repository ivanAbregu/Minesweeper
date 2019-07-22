from django.db import models
from django.contrib.auth.models import User

class Game(models.Model):
    STATUS_PENDING = "pending"
    STATUS_STARTED = "started"
    STATUS_OVER = "over"

    STATUS_CHOICES = (
        (STATUS_PENDING, 'Pending'),
        (STATUS_STARTED, 'Started'),
        (STATUS_OVER, 'Over'),
    )

    owner = models.ForeignKey(User, related_name='game_owner',  on_delete=models.CASCADE)
    created = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,default=STATUS_PENDING)
    
    def __str__(self):
        return "%s, owner: %s" % (self.id, self.owner)