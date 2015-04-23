
angular.element(document).ready(function() {

    require.config({
        urlArgs: 'v='+(new Date()).getTime(),
        waitSeconds: 0
    });


    require(
        [
        'app',
        'modules/directives',
        'modules/filters',
        'modules/factories',
        'modules/pagination',
        'constants/globalConstant',
        'factories/ajaxFactory',
        'factories/cookiesFactory',
        'factories/globalFactory',
        'factories/alertsFactory',
        'factories/dateFactory',
        'factories/reportingFactory',
        'factories/downloadFactory',
        'directives/ui/menu',
        'directives/ui/alerta',
        'directives/ui/validador',
        'directives/ui/datepicker',
        'directives/ui/timepicker',
        'directives/ui/autocomplete',
        'directives/ui/eventdate',
        'directives/ui/exportar'
        ],
        function(app){

            APP.DATA.FN.getSession(function (rpta) {
                
                if (rpta.success) {
                    
                    APP.DATA.CONFIG.SESION = rpta.sesion;
                    //console.log('sesion',rpta.sesion)
                    APP.DATA.CONFIG.USUARIO = rpta.item.d.usuario;
                    APP.DATA.CONFIG.URLS = rpta.item.d.lista;
                    APP.DATA.CONFIG.ROLES = rpta.item.d.roles;
                    APP.DATA.CONFIG.COOKIE = rpta.item.d.usuario;

                    APP.DATA.CONFIG.SESSION = rpta;

                   

                    APP.DATA.FN.setRoutes(APP.DATA.CONFIG.URLS);

                        angular.bootstrap(angular.element(document), [
                            'appModule',
                            APP.DATA.CONFIG.NAMESPACE + '.directives',
                            APP.DATA.CONFIG.NAMESPACE + '.filters',
                            APP.DATA.CONFIG.NAMESPACE + '.factories',
                            APP.DATA.CONFIG.NAMESPACE + '.constants',
							'ui.bootstrap.pagination'
							
                        ]);

                        APP.DATA.FN.showMessageStart('CODE001');
                        APP.DATA.FN.removeMessageStart();

                   

                } else {

                    APP.DATA.FN.showMessageStart('CODE003');

                }
            });


        });

});
