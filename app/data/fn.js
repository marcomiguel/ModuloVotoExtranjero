var APP = APP || {};
APP.DATA = APP.DATA || {};
APP.DATA.FN = APP.DATA.FN || {};
//Mostrar mensaje de inicio de la aplicación
APP.DATA.FN.showMessageStart = function(code){
    var message = '';
    switch(code){
        case 'CODE001':
        message= 'Iniciando el sistema...';
        break;
        case 'CODE002':
        message = 'Obteniendo acceso...';
        break;
        case 'CODE003':
        message = 'Ocurrió un error, presione la tecla F5';
        break;
        default:
        message = '...';
        break;
    }
    $("#loading-msg").text(message);
};
//Eliminar mensaje de inicio de la aplicación
APP.DATA.FN.removeMessageStart=function(){
    setTimeout(function(){
        $('#loading').remove();
        $('#loading-mask').fadeOut('fast', function () {
            $('#cuerpo-dentro').fadeIn('fast');
            $('#loading-mask').remove();
        });
    },1000);
};
//Agregar icono loading
APP.DATA.FN.showLoadingPage = function(){
    $('body').prepend('<div class="addLoadingPage" style="background: #fff url(static/img/preload-64x64.gif) 50% 50% no-repeat;height: 100%;position: fixed;left: 0;top: 0;width: 100%;z-index: 20000;opacity: 0.90;"></div>');
};
//remover icono loading
APP.DATA.FN.removeLoadingPage = function(fn){
    setTimeout(function(){
        $('body>.addLoadingPage').remove();
        $('#cuerpo-dentro').show();
        if(typeof fn !=='undefined'){
            fn();
        }
    },500);
};
//deshabilitar el regreso hacia la página anterior al presionar la tecla backspace.
APP.DATA.FN.disabledBackspace = function(){
    $(document).keydown(function(e) {
        //var elid = $(document.activeElement).hasClass('textInput');
        var elid = $(document.activeElement).attr('data-ng-model') || $(document.activeElement).attr('ng-model');
        if (e.keyCode === 8 && !elid) {
            return false;
        };
    });
};
//mostrar un elemento
APP.DATA.FN.show = function(element,isClass){
    if(typeof isClass!=='undefined' && isClass){
        $('.'+element).show();
    }else{
        $('#'+element).show();
    }
};

APP.DATA.FN.isUndefined= function(value){
    return typeof value === 'undefined';
}

APP.DATA.FN.isEmpty= function(value) {
    return APP.DATA.FN.isUndefined(value) || value === '' || value === null || value !== value;
}

/**
 *     @desc: Convert string to it boolean representation
 *     @type: private
 *     @param: inputString - string for covertion
 *     @topic: 0
 */
 APP.DATA.FN.convertStringToBoolean = function(inputString){
    if (typeof (inputString) == "string")
        inputString=inputString.toLowerCase();

    switch (inputString){
        case "1":
        case "true":
        case "yes":
        case "y":
        case 1:
        case true:
        return true;
        break;

        default: return false;
    }
}

//Consulta AJAX principal de obtención de acceso
APP.DATA.FN.getSession = function(fnSuccess){
    
    $.sieAjax({
        
        url: APP.DATA.CONFIG.URL_BASE + 'Seguridad.aspx/ObtenerAcceso',
        parametros: {}
    }, fnSuccess,function(error){
    }, function () {
    });


};

//APP.DATA.FN.getInitialize = function (fnSuccess) {

//    $.sieAjax({
//        url: APP.DATA.CONFIG.URL_BASE + 'Presentacion/json/routes.json',
//        parametros: {}
//    }, fnSuccess, function (error) {
//    }, function () {
//    });

//};

//$.appAjax({
//    method: 'GET',
//    url: APP.DATA.CONFIG.URL_BASE + 'Presentacion/json/routes.json',
//    parametros: {}
//}, fnSuccess, function (error) {
//}, function () {
//});

//poblar los arrays de los alias y los enlaces de la aplicación
APP.DATA.FN.setRoutes = function(list){
    APP.DATA.CONFIG.ALIAS_ROUTES_LIST = list;
    APP.DATA.CONFIG.ROUTES_LIST = list;
};
