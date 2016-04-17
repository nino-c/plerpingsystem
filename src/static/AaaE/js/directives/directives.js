angular.module('Exhibition')
    // .directive('seedDisplay', function() {
    //     return {
    //         restrict: 'E',
    //         templateUrl: 'views/seedDisplay.html'
    //     }
    // })
    .directive('validateJson', function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                ctrl.$validators.validateJson = 
                    function(modelValue, viewValue) {

                        try {
                            var obj = JSON.parse(viewValue)
                        } catch (e) {
                            return false;
                        }
                        return true;
                    }
            }
        }
    })
    .directive('spinner', function() {
        return {
            template: '<span class="glyphicon glyphicon-refresh fa-spin-custom"></span>'
        }
    })
    .directive('colorbox', ['$scope', function($scope) {
        return {
            require: '?ngModel',
            scope: {
                hex: '='
            },
            template:function(elem, attr) {
                
                '<div style="background-color: {{ hex }}; width: 15px; height: '
                    +'15px; border: 2px solid #dddddd;"></div>'
            },
            link: function($scope, elem, attrs, ngModel) {
                console.log('link', elem, attrs)
            }
        }
    }])
    .directive('seedField', function($compile) {
        return {
            restrict: 'E',
            //require: 'ngModel',
            scope: {
                //ngModel: '@',
                label: '=',
                type: '=',
                value: '='
                //seed: '=ngModel'

            },
            //replace: true,
            //require: 'ngModel',
            //transclude: true,
            templateUrl: 'seedField.html',
            link: function(scope, elem, attrs, ctrl) {
                console.log('------------', scope)
                console.log(attrs)
                console.log(attrs.struct)
                console.log(ctrl)

                //ctrl.$render = function() {
                    // if (!$viewValue) {
                    //     $viewValue = {
                    //         type: seed[1].type,
                    //         label: seed[0],
                    //         value: seed[1].value
                    //     }
                    // }

                    console.debug(attr.ngModel);
                    console.debug($scope.$parent.$eval(attr.ngModel));

                    // $scope.type =   ctrl.$viewValue.type;
                    // $scope.label =  ctrl.$viewValue.label;
                    // $scope.value =  ctrl.$viewValue.value;
                    $scope.$apply();
                //}

                ctrl.seedChange = function() {

                }
            }
        }
    })
    .directive('seedEditor', function() {
        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'seedEditor.html',
            link: function(scope, elem, attrs, ngModel) {
                //ngModel.$render = function() {
                    scope.seedlist = _.map(ngModel.$viewValue, 
                        function(item) {
                            return {label: item[0], value: item[1].value}
                        })
                    console.log($scope.seedlist);
                //}
            }
        }
    })
    .directive('draw', function () {
        return {
            restrict: 'A',
            link: function postLink($scope, element, attrs) {

                
                function initPaper() {

                    paper.install(window);
                    paper.setup(angular.element(element)[0].id);
                    //paper.view.onFrame
                }

                //$scope.$apply(function() {
                    initPaper();
                //})
                


            }
        }
    })
    .directive('paper', function () {
        return {
            replace: true,
            template: '<canvas class="display-canvas"></canvas>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                var _scope = new paper.PaperScope();
                _scope.setup(element[0]);
                _scope.install(window)
                paper.PaperScript.evaluate(paper.PaperScript.parse(attrs.source), _scope);
            }
        };
    })
    .directive('feature-display', ['$scope', function() {
        return {
            scope: {
                featureDisplayContent: '@',
                featureDisplayCSS: '@'
            },
            restrict: 'E',
            template: function(element, attr) {
                var style = _.reduce(_.mapObject(featureDisplayCSS, function(val, key) {
                    return key+':'+val+';';
                }), function(a,b) { return a+b; }, '');
                return '<div class="feature-display" style="{{style}}">{{featureDisplayContent}}</div>';
            },
            //transclude: true,
            link: function postLink($scope, element, attrs) {
                console.log('ss', $scope, element, attrs)
                
                function applyCSS() {
                    $(element[0]).css($scope.featureDisplayCSS);
                }
                
                $scope.$watch("featureDisplayContent.length > 0", function(newValue) {
                    console.log('fff')
                    applyCSS();
                    $(element[0]).html(newValue);
                });
            }
        }
    }])
    .directive('adjustImage', function($window) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                
                var win = angular.element($window);
                var _basewidth = parseInt(attrs.basewidth);
                var basewidth = _basewidth;
                var parentElement = element.parent(); 
                var transform_started = false;

                function getCSSTotal(el, arg) {

                    var val = _.reduce(
                        _.map(['left', 'right'], function(dir) {
                            return parseInt(el.css(arg+'-'+dir).split('px').join(''));
                        }), function(a,b) { return a+b; }, 0);
                    if (isNaN(parseInt(val))) {
                        val = 0;
                    }
                    return val;
                }

                function transform() {

                    transform_started = true;

                    var parent_padding = getCSSTotal(parentElement, 'padding'); 
                    var images = parentElement.children();

                    var basewidth_plus;
                    if (images.length > 0) {
                        basewidth_plus = basewidth
                            +  parseInt(getCSSTotal(angular.element(images[0]), 'padding'))
                            +  parseInt(getCSSTotal(angular.element(images[0]), 'border' ))
                            +  parseInt(getCSSTotal(angular.element(images[0]), 'margin' ));
                        
                    } else {
                        basewidth_plus = basewidth;
                    }

                    function adjust() {
                        var elem_width = parentElement.width();
                        var im_per_row = Math.floor((elem_width - parent_padding) / basewidth_plus);
                        var im_width = elem_width / im_per_row; 
                        var image_width = Math.floor(im_width - (basewidth_plus - basewidth));
                        console.log('wdiff', (basewidth_plus - basewidth));
                            
                        _.each(images, function(im) {
                            $(im).css({
                                width:image_width.toString()+'px', 
                                height:image_width.toString()+'px'
                            });
                        });
                    }

                    adjust();

                    win.bind('resize', function() {
                        adjust();
                        scope.$apply();
                    });

                }
                
                // causes directive to resize upon first pageload 
                scope.$watch('loading', function(val) {
                    if (!val && !transform_started) {
                        transform();
                    }
                });

                scope.$watch('$last', function(val) {
                    if (val && !transform_started) {
                        transform();
                    }
                });
                
            }
        }
    })
    .directive('ngRepeatEndCall', function() {
        return {
            restrict: 'A',
            scope: {},
            link: function (scope, element, attrs) {
                if (attrs.ngRepeat) {
                    if (scope.$parent.$last) {
                        if (attrs.ngRepeatEndCall !== '') {
                            if (typeof scope.$parent.$parent[attrs.ngRepeatEndCall] === 'function') {
                                // Executes defined function
                                scope.$parent.$parent[attrs.ngRepeatEndCall]();
                            } else {
                                // For watcher, if you prefer
                                scope.$parent.$parent[attrs.ngRepeatEndCall] = true;
                            }
                        } else {
                            // If no value was provided than we will provide one on you controller scope, that you can watch
                            // WARNING: Multiple instances of this directive could yeild unwanted results.
                            scope.$parent.$parent.ngRepeatEnd = true;
                        }
                    }
                } else {
                    throw 'ngRepeatEndCall: `ngRepeat` Directive required to use this Directive';
                }
            }
        }
    })
    // .component('seedDisplay', {
    //     bindings: {
    //         __seed: '='
    //     },
    //     controller: function() {
            
    //     },
    //     templateUrl: 'views/seedDisplay.html'
    // })
    // .directive('gameTimer', function() {
    //     return function(scope, element, attrs) {
            
    //         restrict: 'E',
    //         scope: {},
    //         bindToController: {
    //             timeElapsed: '='
    //         },
    //         controller: function($scope) {
    //             this.startTime = new Date();
    //             this.timeElapsed = 0;
    //             $scope.$watch('timeElapsed', function() {
    //                 this.timeElapsed = ((new Date()).getTime() - this.startTime.getTime()) / 1000;
    //             }.bind(this)); 
    //         },
    //         controllerAs: 'ctrl',
    //         //bindToController: true,
    //         template: 'time: {{ timeElapsed }}'
    //     }
    // })