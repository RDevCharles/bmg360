from django.shortcuts import get_object_or_404
from .serializers import NoteSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note

# Create your views here.
#all views are pretty self-describing

@api_view(['GET'])
def index(request):
    notes = Note.objects.all()
    serializer = NoteSerializer(notes, many=True)

    return Response(serializer.data)




@api_view(['GET'])
def show(request, pk):
   
    note = Note.objects.get(pk=pk)
  
    serializer = NoteSerializer(note)
    return Response(serializer.data)




@api_view(['POST'])
def create(request):
    note = NoteSerializer(data=request.data)

    if note.is_valid():
        note.save()
        return Response(note.data, status=status.HTTP_201_CREATED)



@api_view(['PUT'])
def update(request, pk):
    note = Note.objects.get(pk=pk)
    #finding the correct note object, then sending over the serialized data
    data = NoteSerializer(instance=note, data=request.data)
    if data.is_valid():
        data.save()
        return Response(data.data, status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)



@api_view(['DELETE'])
def deleteNote(request, pk):
    note = get_object_or_404(Note, pk=pk)
    note.delete()
    return Response(status=status.HTTP_202_ACCEPTED)