from rest_framework import serializers

from .models import *


# plain ones first

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'name')

class AppSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    api_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = App
        include = ('api_url',)
        read_only_fields = ('id', 'created', 'updated', 'owner')

    def get_api_url(self, obj):
        return "#/app/%s" % obj.id


class InstanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppInstance

class SnapshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snapshot

# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = '__all__'

# class UserSerializer(serializers.ModelSerializer):
#     #apps = serializers.HyperlinkedIdentityField('apps', view_name="user-apps-list")
#     class Meta:
#         model = User
#         fields = ('id', 'name',) # 'apps')

# class InstanceSerializer(serializers.ModelSerializer):
#     instantiator = UserSerializer(required=False, read_only=True)
#     #app = serializers.HyperlinkedIdentityField('app')

#     def get_validation_exclusions(self):
#         exclusions = super(InstanceSerializer, self).get_validation_exclusions()
#         return exclusions + ['instantiator']

#     class Meta:
#         model = AppInstance

# class AppSerializer(serializers.ModelSerializer):
#     owner = UserSerializer(required=False, read_only=True)
#     category = CategorySerializer()
#     instances = InstanceSerializer(many=True, read_only=True)

#     def get_validation_exclusions(self):
#         exclusions = super(AppSerializer, self).get_validation_exclusions()
#         return exclusions + ['owner']

#     class Meta:
#         model = App
#         fields = "__all__"