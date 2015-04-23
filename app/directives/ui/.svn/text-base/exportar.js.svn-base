'use strict';

define(['modules/directives'], function (module) {

    module.controller('ExportarController', ['$scope', '$interpolate', 'reportingFactory', 'downloadFactory', 'globalFactory', '$timeout', function ($scope, $interpolate, reportingFactory, downloadFactory, globalFactory, $timeout) {
       
        //Valores Estaticos ------
        $scope.mensajes = {
            M001:'Error en uno de los argumentos',
            M002:'Parametros debe ser de tipo object',
            M003:'Parametros debe ser de tipo string',
            M004:'Debe ingresar una Url válida y de tipo string',
            M005:'Opciones debe ser un objeto o colleccion de objetos',
            M006:'Callback debe ser de tipo function',
            M007:'El código de la plantilla debe ser tipo string'
        };
        $scope.listaErrores = [];
        var constantes = {
            titulo:'Exportar al formato:',
            tituloBoton:'Exportar',
            fecha:'fechaPlantilla',
            numero:'numeroPlantilla',
            destinatario:'destinatarioPlantilla',
            cargo:'cargoPlantilla'
        };
        var imagenURL = 'static/img/';
        $scope.tipoArchivo = new Array(globalFactory.tipoDocExportar.pdf,globalFactory.tipoDocExportar.excel,globalFactory.tipoDocExportar.word);
        // Json para los iconos
        $scope.iconoArchivo = [
            {id:1,tipo:'excel',icono:imagenURL+'icon_excel.png',alt:'PDF'},
            {id:2,tipo:'word',icono:imagenURL+'icon_word.png',alt:'Word'},
            {id:3,tipo:'pdf',icono:imagenURL+'icon_pdf.png',alt:'Excel'}
        ];
        $scope.urlPlantilla = 'Descarga/DescargaDocumento.aspx';
        //-----------
    
        //--Funciones auxiliares ------
        $scope.stringToBoolean = function(str){
            if(typeof str === 'boolean'){
                return str;
            }else{
                if(typeof str === 'undefined'){
                    return false;
                }else{
                    switch(str.toLowerCase()){
                        case 'true':
                        case 'si':
                        case 'yes':
                        case '1':    
                            return true;
                            break;
                        case 'false':
                        case 'no':
                        case '0':
                        case null:    
                            return false;
                        default:
                            return Boolean(str);
                    }
                }
            
            }
        };
    
        var isColeccionObject = function(objeto){
            var foo = true;
            var isColeccion = false;
            if(typeof objeto[0] === 'object' ){
                isColeccion = true;
            }
            return isColeccion;
        };
    
        var archivoValido = function(tipo){
            var i=0;
            var bool = false;
            while(i<$scope.tipoArchivo.length){
                if(tipo == $scope.tipoArchivo[i]){
                    bool = true;
                    break;
                }
                i++;
            }
            return bool;
        };
    
        var devuelveIcono = function(tipo){
            var icono = '';
            var tipo_ =tipo.toLowerCase(); 
            var lista = $scope.iconoArchivo;
            var foo=true;
            angular.forEach(lista,function(value,key){
                if(foo){
                    if(value.tipo.toLowerCase() == tipo_){
                        icono = value.icono;
                        foo = false
                    }
                }
            });
            return icono;
        };
    
        var devuelveKeyLista = function(lista){
            var key_ = '';
            angular.forEach(lista[0],function(value,key){
                key_ = key;
            });
            return key_;
        }
    
        var fnLlenarListaOpciones = function(lista){
            var listaTmp = [];
            if(typeof lista !== 'undefined'){
                if(isColeccionObject(lista)){
                    angular.forEach(lista,function(value,key){
                        var newValue = eval('value.'+devuelveKeyLista(lista));
                        if(newValue != undefined){
                            if(archivoValido(newValue)){
                                listaTmp.push({
                                    archivo:newValue,
                                    icono:devuelveIcono(newValue)
                                });
                            }
                        }
                    });
                }else{
                    var i = 0;
                    for(i;i<lista.length;i++){
                        listaTmp.push({
                            archivo:lista[i],
                            icono:devuelveIcono(lista[i])
                        });
                    }
                }
            }
            $scope.listaOpcionesTemp = listaTmp;
            return listaTmp;
        };
        //------------------------------
    
        if(typeof $scope.titulo === 'undefined'){
            $scope.textTittleTemp = constantes.titulo;
        }else{
            $scope.textTittleTemp = $scope.titulo;
        }
        if(typeof $scope.tituloBoton === 'undefined'){
            $scope.textLinkTmp = constantes.tituloBoton;
        }else{
            $scope.textLinkTmp = $scope.tituloBoton;
        }
        if(typeof $scope.isPlantilla === 'undefined'){
            $scope.isPlantillaTemp = true;
        }else{
            $scope.isPlantillaTemp = $scope.stringToBoolean($scope.isPlantilla);
        }
        if(typeof $scope.position === 'undefined'){
            $scope.positionTmp = 'left'
        }else{
            $scope.positionTmp = $scope.position;
        }
    
        $scope.validarParametros = function(){
            $scope.listaErrores = [];
            var bool = false;
        
            if(fnLlenarListaOpciones($scope.opciones) != ''){
                if(typeof $scope.callback === 'undefined'){
                    if($scope.isPlantillaTemp){
                        if(typeof $scope.parametros === 'string'){
                            if(angular.isString($scope.codigoPlantilla) || angular.isNumber($scope.codigoPlantilla)){
                                bool = true;
                            }else{
                                $scope.listaErrores.push({
                                    mensaje:$scope.mensajes.M007
                                });
                            }
                        }else{
                            $scope.listaErrores.push({
                                mensaje:$scope.mensajes.M003
                            });                    
                        }
                    }else{
                        if(typeof $scope.parametros === 'object'){
                            if(typeof $scope.url === 'string' && $scope.url.length >1 ){
                                bool=true;
                            }else{
                                $scope.listaErrores.push({
                                    mensaje:$scope.mensajes.M004
                                });
                            }
                        }else{
                            $scope.listaErrores.push({
                                mensaje:$scope.mensajes.M002
                            });
                        }
                    }
                
                }else{
                    if(typeof ($scope.callback) === 'function'){
                        bool = true
                    }else{
                        $scope.listaErrores.push({
                            mensaje:$scope.mensajes.M006
                        });
                    }   
                }
            
            }else{
                $scope.listaErrores.push({
                    mensaje:$scope.mensajes.M005
                });
            }
        
            return bool;
        };
    
        var verificarCadenaVacia = function(cadena){
            var bool = false;
            if(angular.isString(cadena)){
                for(var i in cadena){
                    if(cadena[i].toString() != " "){
                        bool = true;
                        break;
                    }
                }
            }
            return bool;
        };
    
        $scope.exportPlantilla = function(tipoDocumento){
            var elemento = !!$scope.parametros? angular.element($scope.parametros):'';
            if(elemento != ''){
                var fecha = angular.isDefined(elemento.find('#'+constantes.fecha)[0])?elemento.find('#'+constantes.fecha)[0].innerText:'';
                var numero = angular.isDefined(elemento.find('#'+constantes.numero)[0])?elemento.find('#'+constantes.numero)[0].innerText:'';
                var destinatario = angular.isDefined(elemento.find('#'+constantes.destinatario)[0])?elemento.find('#'+constantes.destinatario)[0].innerText:'';
                var cargo = angular.isDefined(elemento.find('#'+constantes.cargo)[0])?elemento.find('#'+constantes.cargo)[0].innerText:'';
                var headers = new Array();
                var i = 0;
                if(verificarCadenaVacia(fecha)){
                    headers[i]=fecha;
                    i++;
                }
                if(verificarCadenaVacia(numero)){
                    headers[i]=numero;
                    i++;
                }
                if (verificarCadenaVacia(cargo)) {
                    headers[i] = cargo;
                }
                if (verificarCadenaVacia(destinatario)) {
                    if (verificarCadenaVacia(cargo))
                        headers[i] = headers[i] + " " + destinatario;
                    else
                        headers[i] = destinatario;
                }
            }
            var parametros = {
                tipoDocumento: tipoDocumento,
                contenidoHtml: globalFactory.htmlEntities($scope.parametros, 'ENT_NOQUOTES'),
                datosCabecera: angular.toJson(headers),
                codigoPlantilla:$scope.codigoPlantilla
            };
            downloadFactory.forceDownloadPost(APP.DATA.CONFIG.URL_BASE + $scope.urlPlantilla, parametros); 
        };
    
        $scope.exportarReporting = function (tipoDocumento) {
            reportingFactory.descargar(APP.DATA.CONFIG.URL_BASE_REPORTE, $scope.url, $scope.parametros, tipoDocumento);
        };
    
        $scope.exportar = function(tipoDocumento){
            if(!$scope.stringToBoolean($scope.eDisabled)){
                if(typeof $scope.callback === 'undefined'){
                    if($scope.isPlantillaTemp){
                        $scope.exportPlantilla(tipoDocumento);
                    }else{
                        $scope.exportarReporting(tipoDocumento);
                    }
                }else{
                    $scope.callback(tipoDocumento);
                } 
            }
        };
    
        //jQuery para cerrar el popover 
        jQuery('.popover-print').mouseup(function() {
            return false
        });
        jQuery(document).mouseup(function(e) {
            if(jQuery(e.target).parent('div.popover-print .btn-link').length==0) {
                jQuery('.popover-print .popover-scytl').removeClass('dblock');
            }
        });
        jQuery('.popover-print .icon-scytl-clear').click(function(){
            jQuery(this).parent().removeClass('dblock');
        });
        /* jQuery para cerrar el popover */	    
    }])

    module.directive('export', function ($document) {
        return {
            restrict:'EA',
            replace:true,
            scope:{
                tituloBoton:'=',
                titulo:'=',
                opciones:'=',
                isPlantilla:'@',
                parametros:'=',
                callback:'=',
                position:'=',
                url:'=',
                eDisabled:'=',
                codigoPlantilla:'='
            },
            controller: 'ExportarController',
            link:function(scope,element,attrs){
                //verifica cambio de variable y si los datos son correctos
                var constantes = {
                    titulo:'Exportar al formato:',
                    tituloBoton:'Exportar',
                    fecha:'fecha',
                    numero:'numero',
                    destinatario:'destinatario'
                };
                scope.$watch('parametros + url + callback + isPlantilla + opciones',function(){
                    scope.isOk = scope.validarParametros(); 
                });
            },
            templateUrl: 'template/directives/ui/exportar.html'    
        };
    });

});