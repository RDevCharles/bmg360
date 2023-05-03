from rest_framework import serializers
from .models import Note

#serializing the data becuase we need json not an instance of the model
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("id", "title", "content", "timestamp")