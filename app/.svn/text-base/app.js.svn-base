'use strict';

define(['services/routeResolver'], function () {

    var app = angular.module('appModule', ['ngRoute','ngCookies','routeResolverServices','ngResource']);

    app.constant('constants',{

    });

    app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider','$httpProvider', '$provide',
        function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider,$httpProvider, $provide) {

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            var route = routeResolverProvider.route;

            //console.log(APP.DATA.CONFIG.URLS)

            // if (APP.DATA.CONFIG.URLS.length > 0) {

            //     angular.forEach(APP.DATA.CONFIG.URLS, function (data) {
            //         angular.forEach(data.secciones, function (data) {
                        
            //             $routeProvider.when('/' + data.alias, route.resolve(data.alias));
            //             if (data.secciones) {
            //                 angular.forEach(data.secciones, function (data) {
            //                     $routeProvider.when('/' + data.alias, route.resolve(data.alias));
            //                 })
            //             }
            //         })
            //     })
            
            // }

            $.each(APP.DATA.CONFIG.obtenerRoutesClickables(APP.DATA.CONFIG.URLS), function (key, val) {
                var alias = val.alias;
                $routeProvider.when('/' + alias, route.resolve(alias));
            });

            $routeProvider.when('/404', route.resolve('404'));
            $routeProvider.when('/inicio', route.resolve('inicio'));
            $routeProvider.when('/' ,{ redirectTo: '/inicio' });
            $routeProvider.otherwise({ redirectTo: '/404' });

     }]);


    app.controller('appController', ['$scope', '$rootScope', '$location', 'cookiesFactory', function ($scope, $rootScope, $location, cookiesFactory) {

        // console.log(APP.DATA.CONFIG.SESION, 'xxx');
        $scope.userRoles =angular.copy(APP.DATA.CONFIG.SESION);
        $scope.userRoles.rol = (APP.DATA.CONFIG.ROLES.length > 0) ? APP.DATA.CONFIG.ROLES[0].nombre : '';

        //creando las cookies
        angular.forEach(APP.DATA.CONFIG.COOKIE, function (value, key) {
            cookiesFactory.agregar(key, value);
        });

        // $scope.menuApp = APP.DATA.CONFIG.URLS; // cargando menus

   
        //console.log(data);

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            // console.log('change: ', event);
			
            APP.DATA.FN.showLoadingPage();
             
            var aliasActual = $location.path();
            var arbol = APP.DATA.CONFIG.obtenerArbolMenu(aliasActual, APP.DATA.CONFIG.URLS);
            $scope.menuLateral = arbol.nuevoArbol;
            $scope.menuPrincipal = arbol.menuPrincipal;
            $('body').removeClass('home_page');

			 $("body .btnHelp,body .contenidoHelp,#back_contenidoHelp").remove();

                var alias = window.location.href.split('/');
                var aliasRoute = alias[alias.length-1];

                var contenidoHelp = '';
                contenidoHelp += '<button class="btnHelp btn btn-green btn-help-screen"><i class="icon-question-sign"></i> Ayuda</button>';
                contenidoHelp += '<div id="back_contenidoHelp"></div>';
                contenidoHelp +='<div class="contenidoHelp panel panel-default panel-help-screen" >';
                contenidoHelp +='<div class="panel-heading">';
                contenidoHelp +='<i class="icon-question-sign"></i> Ayuda';
                contenidoHelp +='<button type="buttom" class="close" title="Cerrar">';
                contenidoHelp +='Cerrar';
                contenidoHelp +='</button>';
                contenidoHelp +='</div>';
                contenidoHelp +='<div class="panel-body">';
                contenidoHelp +='<div class="panel-body-overflow">';
                contenidoHelp +='<div id="msjLoadBodyHTML">';
                contenidoHelp +='</div>';
                contenidoHelp +='<div id="panelBodyOverflowHTML">';
                contenidoHelp +='</div>';
                contenidoHelp +='<div id="panelBodyHelpPrint">';
                contenidoHelp +='</div>';
                contenidoHelp +='</div>';
                contenidoHelp +='</div>';
                contenidoHelp +='</div>';
                contenidoHelp +='</div>';
                $('body').prepend(contenidoHelp);
                
                var flagLoadHTMLHelp = 0; 
                $(".btnHelp").on("click", function (e) {
                    e.preventDefault();
                    $('#back_contenidoHelp').fadeIn(250);
                    if(flagLoadHTMLHelp===0){
                        $("#msjLoadBodyHTML").html('<div class="msj-preload msj-preload-20" style="margin-top:120px;"><i class="icon-preload"></i>Cargando, espere un momento por favor...</div>');
                    }
                    $('.contenidoHelp').animate({ 'right':'0'},'medium',function(){
                        if(flagLoadHTMLHelp===0){
                            $.get('template/help/'+aliasRoute+'.html', function(data) { 
                                $(".contenidoHelp .panel-body-overflow").hide(); 
                                $('#msjLoadBodyHTML').remove();
                                $("#panelBodyOverflowHTML").html(data);
								/*
                                if(APP.DATA.PAGINASHELPBUSCARPRINT(aliasRoute)){
                                    $("#panelBodyHelpPrint").html(APP.DATA.HELPDETECTBROWSERPRINT());
                                } */
                                flagLoadHTMLHelp = 1;
                                $(".contenidoHelp .panel-body-overflow").fadeIn();
                            });                    
                        }
                  
                    });
                });   

                $(".contenidoHelp .close").on("click",function(e){
                    e.preventDefault();
                    $('#back_contenidoHelp').fadeOut(250);
                    $(this).parent().parent().animate({ 'right': '-70%' }, 'medium');
                });
			 
			 
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
           // console.log('completo: ', event);
            APP.DATA.FN.removeLoadingPage();
        });

        $rootScope.$on("$routeChangeError", function (event) {
           // console.log('error: ', event);
            $location.path('/404');
        });

    }]);

    return app;
});
