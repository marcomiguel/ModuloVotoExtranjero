var APP = APP || {};

APP.DATA = APP.DATA || {};
APP.DATA.CONFIG = APP.DATA.CONFIG || {};

//url base prRemoto
APP.DATA.CONFIG.URL_BASE = 'http://192.168.101.35/VotoExtranjeroInterno/';

//url base webapp
APP.DATA.CONFIG.URL_WEBAPP = APP.DATA.CONFIG.URL_BASE + 'Presentacion/';

//url base reportes
APP.DATA.CONFIG.URL_BASE_REPORTE = APP.DATA.CONFIG.URL_BASE + 'Descarga/Descarga.aspx';

//reporte carpeta
APP.DATA.CONFIG.URL_BASE_REPORTE_CARPETA = '/ReportesVotoExtranjero/';

//lista rutas
APP.DATA.CONFIG.URLS = [];

//variable sesion del usuario
APP.DATA.CONFIG.SESION = null;

//variable contenido para cookies
APP.DATA.CONFIG.COOKIE = {};

//procesos electorales
APP.DATA.CONFIG.PROCESOS_ELECTORALES = [];

//variable con la lista de roles
APP.DATA.CONFIG.ROLES = [];

// funciones útiles
APP.DATA.CONFIG.agregarTypeButton = function () {
    $('button').attr('type', 'button');
};

// Obtener las urls clickables, las utilizamos para registrar las rutas en la aplicación.
APP.DATA.CONFIG.obtenerRoutesClickables = function (listaMenus) {
    var listaAlias = [];
    for (var i = 0; i < listaMenus.length; i++) {
        var tempMenu = listaMenus[i];
        if (typeof tempMenu.secciones !== 'undefined' && tempMenu.secciones.length > 0) {
            for (var j = 0; j < tempMenu.secciones.length; j++) {
                var tempSubMenu = tempMenu.secciones[j];
                if (typeof tempSubMenu.secciones !== 'undefined' && tempSubMenu.secciones.length > 0) {
                    for (var k = 0; k < tempSubMenu.secciones.length; k++) {
                        var tempSubSubMenu = tempSubMenu.secciones[k];
                        listaAlias.push({ alias: tempSubSubMenu.alias });
                    }
                } else {
                    listaAlias.push({ alias: tempSubMenu.alias });
                }
            }
        } else {
            listaAlias.push({ alias: tempMenu.alias });
        }
    }
    return listaAlias;
};

//obtener los menus desde un alias
APP.DATA.CONFIG.obtenerArbolMenu = function (alias, menu) {

    alias = alias.substring(1); //quitamos el /
    //detectar posicion del alias actual para el menú principal
    var posicion = 0;
    for (var i = 0; i < menu.length; i++) {
        if (menu[i].alias === alias) {
            posicion = i;
            break;
        } else {
            var listaSecciones = menu[i].secciones;
            for (var j = 0; j < listaSecciones.length; j++) {
                if (listaSecciones[j].alias === alias) {
                    posicion = i;
                    break;
                } else {
                    var listaSubSecciones = listaSecciones[j].secciones;
                    for (var k = 0; k < listaSubSecciones.length; k++) {
                        if (listaSubSecciones[k].alias === alias) {
                            posicion = i;
                            break;
                        }
                    }
                }
            }
        }
    }

    //contenido para el menú principal
    var menuPrincipal = [];
    for (var o = 0; o < menu.length ; o++) {
        var tempMenu = menu[o];
        var isActive = false;
        if (o === posicion) {
            isActive = true;
        }
        var newAlias = '';
        if (typeof tempMenu.secciones !== 'undefined' && tempMenu.secciones.length > 0) {
            var temptempMenu = tempMenu.secciones[0];
            if (typeof temptempMenu.secciones !== 'undefined' && temptempMenu.secciones.length > 0) {
                var temptemptempMenu = temptempMenu.secciones[0];
                newAlias = temptemptempMenu.alias;
            } else {
                newAlias = temptempMenu.alias;
            }
        } else {
            newAlias = tempMenu.alias;
        }

        menuPrincipal.push({ nombre: tempMenu.nombre, alias: newAlias, isActive: isActive, icono: tempMenu.icono });
    }

    var nuevoArbol = [];

    if (alias === '404'|| alias === 'inicio') {
        return { menuPrincipal: menuPrincipal, nuevoArbol: nuevoArbol };
    } else {
        var arbolEncontrado = menu[posicion].secciones;
        for (var p = 0; p < arbolEncontrado.length; p++) {
            var tempArbol = arbolEncontrado[p];
            var secciones = [];
            var isOpenSeccion = false;

            var secc = [];
            if (tempArbol.secciones.length > 0) {
                var isEncontrado = false;
                for (var q = 0; q < tempArbol.secciones.length; q++) {
                    var tempSubArbol = tempArbol.secciones[q];
                    var isOpen = false;
                    if (tempSubArbol.alias === alias) {
                        isOpen = true;
                        isOpenSeccion = true;
                        tempSubArbol.isOpen = isOpen;
                        //break;
                        isEncontrado = true;
                    } else {
                        isOpen = false;
                        if (!isEncontrado) {
                            isOpenSeccion = false;
                        }
                        tempSubArbol.isOpen = isOpen;
                    }
                    secc.push(tempSubArbol);
                }

            } else {
                if (tempArbol.alias === alias) {
                    isOpenSeccion = true;
                }
            }

            tempArbol.secciones = secc;
            nuevoArbol.push({ nombre: tempArbol.nombre, alias: tempArbol.alias, secciones: tempArbol.secciones, isOpen: isOpenSeccion });
        }

        return { menuPrincipal: menuPrincipal, nuevoArbol: nuevoArbol };
    }
};

APP.DATA.CONFIG.errorXHR = function (status) {
    var body = $('body')
    , mod = parseInt($('body #modalXHRError').length)
    , errorMensaje = '';

    switch (parseInt(status)) {
        case 404: errorMensaje = APP.DATA.MENSAJES.SYS004;
            break;
        default: errorMensaje = APP.DATA.MENSAJES.SYS004;
    }

    var modalError = '<div id="modalXHRError" class"hide" style="position:fixed;top:0;left:0;right:0;z-index:999999">' +
        //'<div class="modal-backdrop in" style="background:transparent">'+
        '<div class="alert alert-error" style="width:60%"><i></i> ' + errorMensaje + '<button type="button" class="close" onclick="$(\'#modalXHRError\').hide()">×</button></div>' +
        //'</div>'+
        '</div>';
    if (mod == 0) {
        body.append(modalError);
    }
    $("#modalXHRError").slideDown().delay(7000).fadeOut();

};