'use strict';

define(['modules/directives'], function (module) {



    module.directive('menu', function ($location) {
        return {
            restrict:'AE',
            replace:true,
            scope:{
              lista:'=listaMenu'
            },
            controller:function($scope,$rootScope){
                var url=$location.$$url;
                var str = url.split('/');
                var checkUrl = function (url) {
                    if (!url) {
                        $scope.lista[0].activo = true;
                    }
                    angular.forEach($scope.lista, function(alias){
                        angular.forEach(alias.secciones, function (menu) {                
                            menu.activo=false;
                            if(menu.alias==url){
                                alias.activo=true;
                                menu.activo=true;
                            }
                        });
                    });
                }

                checkUrl(str[1]);

                $scope.activo = function (opcion) {
                    $location.path('/' + opcion.secciones[0].alias);

                    angular.forEach(opcion.secciones, function (val, key) {
                        val.activo = false;
                    });

                    opcion.secciones[0].activo = true;
                    angular.forEach($scope.lista,function(val,key){
                        val.activo=false;
                    });
                    opcion.activo=true;
                    $rootScope.$emit('activo',opcion);
                }
            },
            template:'<nav id="navegacion-principal" class="menu-items-5">'+
                    '    <ul>'+
                    '       <li data-ng-repeat="opcion in lista" data-indice1="0" data-ng-class="{activo:opcion.activo==true}" data-ng-click="activo(opcion)">'+
                    '           <a data-ng-href="{{opcion.alias}}">'+
                    '               <i class="{{opcion.icono}}"></i>'+
                    '               {{opcion.nombre}}'+
                    '           </a>'+
                    '       </li>'+
                    '    </ul>'+
                    '</nav>'
            };
    });

    module.directive('menuLateral', function ($location) {
        return {
          restrict:'AE',
          replace:true,
          controller:function($scope,$rootScope){

            var url=$location.$$url;
            var str=url.split('/');

            $rootScope.$on('activo',function(event,data){
               $scope.items=data;
            });

            var checkUrl = function (url) {
                if (!url) {
                    APP.DATA.CONFIG.URLS[0].secciones[0].activo = true;
                    $scope.items = APP.DATA.CONFIG.URLS[0];
                }
                angular.forEach(APP.DATA.CONFIG.URLS, function (alias) {
                    angular.forEach(alias.secciones, function(menu){
                        if(menu.activo)$scope.items=alias;
                        angular.forEach(menu.secciones, function (submenu) {
                            if(submenu.alias==url){
                                submenu.activo=true;
                            }
                        });
                    });
                });

            }

            checkUrl(str[1]);

            $scope.activo=function(opcion){

                angular.forEach(APP.DATA.CONFIG.URLS, function (alias) {
                    angular.forEach(alias.secciones, function(menu){
                        menu.activo = false;
                        angular.forEach(menu.secciones, function (submenu) {
                            submenu.activo=false;
                        });
                    });
                });

                if(opcion.secciones){
                    if(opcion.activo){
                        opcion.activo=false;
                    }else{
                        opcion.activo=true;
                    }
                }else{
                    opcion.activo=true;
                }

                //checkUrl(opcion.alias)

            }

            $scope.subactivo=function(submenu){

                angular.forEach(APP.DATA.CONFIG.URLS, function (alias) {
                    angular.forEach(alias.menu, function(menu){
                        angular.forEach(menu.secciones, function(submenu){
                            submenu.activo=false;
                        });
                    });
                });

                if(submenu.activo){
                    submenu.activo=false;
                }else{
                    submenu.activo=true;
                }
            }

          },
          template:'<aside id="lateral-menu">'+
                    '    <nav>'+
                    '        <ul>'+
                    '            <li data-indice2="{{$index}}" data-ng-class="{\'subsub-menu\':items.menu[$index].submenu.length>0,activo:opcion.activo==true}" data-ng-repeat="opcion in items.secciones">'+
                    '                <a data-ng-href="#/{{opcion.alias}}" data-ng-click="activo(opcion)">{{opcion.nombre}}</a>'+
                    '                <ul data-ng-show="opcion.activo" data-ng-class="{in:opcion.activo}">'+
                    '                    <li data-indice3="{{$index}}" data-ng-class="{activo:subopcion.activo}" data-ng-repeat="subopcion in opcion.secciones">'+
                    '                        <a data-ng-href="#/{{subopcion.alias}}" data-ng-click="subactivo(subopcion)">{{subopcion.nombre}}</a>'+
                    '                    </li>'+
                    '                </ul>'+
                    '            </li>'+
                    '        </ul>'+
                    '    </nav>'+
                    '</aside>'
        };
    });

});




