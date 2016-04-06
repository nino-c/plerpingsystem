
    angular
        .module('Exhibition')
        .factory('AppService', ['$resource', function($resource)  {
          return $resource('/game/api/apps/:id/', {id:'@id'}, { 
              update: {
                  method: 'PUT'
              }
          })
        }])
        .factory('InstanceService', ['$resource', function($resource)  {
          return $resource('/game/api/instances/:id/', {id:'@id'}, { 
              update: {
                  method: 'PUT'
              }
          })
        }])
        .factory('CodeModuleService', ['$resource', function($resource)  {
          return $resource('/game/api/code_modules/:id/', {id:'@id'}, { 
              update: {
                  method: 'PUT'
              }
          })
        }])
        .factory('CategoryService', ['$resource', function($resource)  {
          return $resource('/game/api/categories/:id/', {id:'@id'}, { 
              update: {
                  method: 'PUT'
              }
          })
        }])
        .factory('CategoryWithApps', ['$resource', function($resource)  {
          return $resource('/game/api/categories-with-apps/:id/', {id:'@id'});
        }])