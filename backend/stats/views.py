from django.shortcuts import render

# Create your views here.

from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin
)
from rest_framework.viewsets import GenericViewSet

from .models import User
from .serializers import UserSerializer


class UserViewSet(GenericViewSet,  # generic view functionality
                  CreateModelMixin,  # handles POSTs
                  RetrieveModelMixin,  # handles GETs for 1 User
                  UpdateModelMixin,  # handles PUTs and PATCHes
                  ListModelMixin):  # handles GETs for many Users

    serializer_class = UserSerializer
    queryset = User.objects.all()
