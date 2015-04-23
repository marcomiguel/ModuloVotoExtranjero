'use strict';

define(['app'], function (app) {

    app.factory('ajaxFactory', function (cookiesFactory) {
        var url_base = APP.DATA.CONFIG.URL_BASE;
        return {
            consultar: function (url, parametros, exito, error, before) {

                if (typeof cookiesFactory.obtener('idUsuario') === 'undefined' || typeof cookiesFactory.obtener('loginUsuario') === 'undefined' || typeof cookiesFactory.obtener('nombreUsuario') === 'undefined' || typeof cookiesFactory.obtener('apellidoPaternoUsuario') === 'undefined' || typeof cookiesFactory.obtener('apellidoMaternoUsuario') === 'undefined') {
                    // alert('Cuidado!, no debe eliminar las cookies de la aplicación');
                    window.location.href = APP.DATA.CONFIG.URL_WEBAPP;
                } else {
                    parametros.sesion = APP.DATA.CONFIG.SESION;
                    var mapParametros = {
                        metodo: url,
                        parametros: parametros
                    };
                    //console.log('map',mapParametros)
                    $.sieAjax({
                        url: url_base + 'Seguridad.aspx/consultar',
                        parametros: mapParametros
                    }, exito, error, before);
                }
            }
        };
    });

});