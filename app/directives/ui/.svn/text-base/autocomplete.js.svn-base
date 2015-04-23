'use strict';

define(['modules/directives'], function (module) {

    module.directive('uiAutocomplete',['$http', function($http) {
        return {
            require: 'ngModel',
            link: function(scope, element,attr,ctrl){

                $(element).on('click',function(){
                    this.select();
                });

                var NOMBRE_ATTR = {
                    uiData:"uiData",
                    uiTexto:"uiTexto",
                    uiRemoto:"uiRemoto"
                };
                var CLASES = {
                    preload:'input-preload'
                };

                var retornarObjeto = function(config,valor){
                    var objeto = {};
                    objeto["id"]=null;objeto[config.campo]=valor;
                    for(var i in config.lista){
                        if(config.lista[i][config.campo]==valor){
                            objeto = config.lista[i];
                            break;
                        }
                    }
                    return objeto;
                };

                var llenarArreglo = function(c,lista){
                    var arr = [];
                    var i=0;
                    angular.forEach(lista,function(value,key){
                        if(angular.isDefined(value[c.campo])){
                            arr[i] = value[c.campo];
                        }
                        i++;
                    });
                    return arr;
                };

                var Autocomplete = function(atr,el){
                    var bool = false;
                    atr = atr || attr;
                    el = el || element;
                    var config = {
                        valid:false,
                        lista:angular.isDefined(scope.$eval(atr[NOMBRE_ATTR.uiData])) ? scope.$eval(atr[NOMBRE_ATTR.uiData]):[] ,
                        campo:atr[NOMBRE_ATTR.uiTexto],
                        data:[],
                        remoto:false,
                        url:scope.$eval(atr[NOMBRE_ATTR.uiRemoto])
                    }
                    if(angular.isDefined(config.url) && angular.isString(config.url)){
                        config.remoto = true;
                        if(angular.isString(config.campo)){
                            config.valid = true;
                        }
                    }else{
                        if(angular.isArray(config.lista)){
                            if(angular.isString(config.campo)){
                                config.data = llenarArreglo(config,config.lista);
                                config.valid = true;
                            }
                        }
                    }

                    return {
                        inicializar:function(){
                            var CONFIG = config;
                            var autocompletar = function(c){
                                var self = $(el);
                                if(angular.isUndefined(self.data("typeahead"))){
                                    var options = {
                                        source:c.data,
                                        items:5
                                    }
                                    self.typeahead(options);
                                }else{
                                    self.data("typeahead").source = c.data;
                                    self.data("typeahead").items = 5;
                                }
                            };

                            if(CONFIG.valid){
                                if(CONFIG.remoto){
                                    //Hacer peticiones cada vez que se escribe
                                    $(el).typeahead().on('keyup', function(ev){
                                        ev.stopPropagation();
                                        ev.preventDefault();
                                        //Filtrar salidas de las teclas: UP/DOWN, TAB, ENTER y ESC,shift
                                        if( $.inArray(ev.keyCode,[40,38,9,13,27,16]) === -1 ){
                                            var self = $(this);
                                            // Actualizamos el atributo source a vacio
                                            self.data('typeahead').source = [];
                                            if(!self.data('active') && self.val().length>0){
                                                //Antes del
                                                self.addClass(CLASES.preload);
                                                self.data('active',true);

                                                $http.post(CONFIG.url,{filtro:self.val()}).success(function(d){
                                                    self.data('active',true);
                                                    var arr = llenarArreglo(CONFIG,d.lista);
                                                    CONFIG.lista = d.lista;
                                                    CONFIG.data = arr;
                                                    self.data('typeahead').source = arr;
                                                    self.trigger('keyup');
                                                    self.removeClass(CLASES.preload);
                                                    self.data('active',false);
                                                }).error(function(e){
                                                    //Que hacer cuando se genera un error
                                                });
                                            }
                                        }
                                    });
                                }else{
                                    autocompletar(CONFIG);
                                }
                            }
                        },
                        getConfig:function(){
                            return config;
                        },
                        render:function(){
                            Autocomplete(atr,el).inicializar();
                        }
                    }

                };

                var obj = new Autocomplete(attr,element);
                //Valida y llenas los datos de configuracion
                var CONFIG = obj.getConfig();
                obj.inicializar();

                scope.$watch(attr[NOMBRE_ATTR.uiData],function(newValue){
                    //console.log(newValue,"watch")
                    if(angular.isArray(newValue) && angular.isDefined(newValue)){
                        CONFIG.lista = angular.copy(newValue);
                        CONFIG.data = llenarArreglo(CONFIG,newValue);
                    }else{
                        CONFIG.lista = [];
                        CONFIG.data = [];
                    }
                    obj.render();
                });

                ctrl.$parsers.unshift(function(viewValue){
                    if(viewValue.length == 0){
                        return undefined;
                    }else{
                        if(CONFIG.valid){
                            return retornarObjeto(CONFIG,viewValue);
                        }else{
                            return undefined;
                        }
                    }
                });

                ctrl.$formatters.push(function(modelValue){
                    var viewValue;
                    if(angular.isDefined(modelValue) && angular.isObject(modelValue) && CONFIG.valid){
                        if(angular.isDefined(modelValue[CONFIG.campo])){
                            viewValue = modelValue[CONFIG.campo];
                        }
                    }
                    return viewValue;
                });

                /*$(element).on('blur',function(){
                    if(angular.isDefined(ctrl.$viewValue)){
                        if(ctrl.$viewValue.length == 0){
                            scope.safeApply(function(){
                                ctrl.$viewValue = undefined;
                            });
                        }else{
                            var value = $(element).val();
                            scope.safeApply(function(){
                                ctrl.$setViewValue(value);
                                ctrl.$render();
                            })
                        }
                    }
                });*/
                 $(element).on('change',function(){
                    if(angular.isDefined(ctrl.$viewValue)){
                        if(ctrl.$viewValue.length == 0){
                            scope.safeApply(function(){
                                ctrl.$viewValue = undefined;
                            });
                        }else{
                            var value = $(element).val();
                            scope.safeApply(function(){
                                ctrl.$setViewValue(value);
                                ctrl.$render();
                            })
                        }
                    }
                });
                scope.safeApply = function(fn) {
                    var phase = this.$root.$$phase;
                    if (phase == '$apply' || phase == '$digest') {
                        if (fn && ( typeof (fn) === 'function')) {
                            fn();
                        }
                    } else {
                        this.$apply(fn);
                    }
                };
            }
        };
    }]);

    module.directive('uiFocus', function($timeout, $parse) {
      return {
        //scope: true,   // optionally create a child scope
        link: function(scope, element, attrs){
          var model = $parse(attrs.uiFocus);
          scope.$watch(model, function(value){
            if(value === true){
                element[0].focus();
            }
          });
        }
      };
    });

})
