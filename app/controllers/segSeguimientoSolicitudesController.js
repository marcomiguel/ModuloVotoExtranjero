'use strict';
// cird version ***

define(['app'], function (app) {

    app.register.controller('segSeguimientoSolicitudesController', ['$scope', '$http', 'ajaxFactory', 'alertsFactory','cookiesFactory', 'dateFactory','globalFactory','downloadFactory','reportingFactory', function ($scope, $http, ajaxFactory, alertsFactory, cookiesFactory, dateFactory, globalFactory, downloadFactory, reportingFactory){

        var ng = $scope;
		
		ng.safeApply = function (fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && (typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };
				
        ng.prRemoto = 'segSeguimientoSolicitudes.aspx/';

        ng.mensajesApp = APP.DATA.MENSAJES;
		
		ng.currentPage  = 1;
		ng.cantidadRegistrosModel = 10;
		ng.maxsize = 5;

        ng.alertaListaSolicitudesVacia = {
            mensaje: ng.mensajesApp.NOT009,
            tipo: 'info',
            mostrar: false,
            ocultar: { auto: false, click: true, tiempo: 0 }
        };

        ng.mostrarAlertaFlotante = function (mensaje, tipo) {
            alertsFactory.alerta({
                tipo: tipo,
                mensaje: mensaje,
                oculto: false
            });
        };

        ng.modeloDetalleCiudadano = {
            cedula: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
			idEstadoSolicitud: '',
			numeroSolicitud: '',
			descripcionEstado: ''
        };
		
        ng.modeloCiudadano = {
            numeroCedula: null,
			numeroSolicitud: null,
            nombre: null,
            apellidoPaterno: null,
            apellidoMaterno: null,
			idEstadoSolicitud:''
        };
		
		ng.modeloCiudadanoCopia = {
            numeroCedula: null,
			numeroSolicitud: null,
            nombre: null,
            apellidoPaterno: null,
            apellidoMaterno: null,
			idEstadoSolicitud:''
        };
		
		ng.itemEstado = {
			idEstadoSolicitud:'',
			descripcionEstado:''
		};
		
		ng.itemEstadoCopia = {
			idEstadoSolicitud:'',
			descripcionEstado:''
		};
		
		var PETICIONES = {
            xhrBuscar: null,
            xhrDetalle: null
        };

        
        ng.abortarBuscarXHR = function () {
            if (PETICIONES.xhrBuscar !== null) {
                PETICIONES.xhrBuscar.abort();
            }
        };

        ng.abortarDetalleXHR = function () {
            if (PETICIONES.xhrDetalle !== null) {
                PETICIONES.xhrDetalle.abort();
            }
        };
		
		ng.indice = -1;
		$scope.onlyNumbers = /^[0-9]*$/;
		$scope.onlyLetters = /^[a-zA-Z\ \'\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]*$/;
		$scope.onlySolicitud = /^[0-9]{12}$/;
		
		ng.flagBtnBuscar = true;
		ng.flagBotonFiltro = true;

		ng.verListaSolicitudes = ng.ListaDetalleSolicitudes = false;
		
		ng.listaSolicitudes = [];
		ng.listaTotalSolicitudes = [];
		ng.listaEstadosSolicitudes = [];
		
		ng.mostrarResultados = false;
		ng.mostrarDatos = false;
		
		/* REPORTES */
		ng.reportes = {
			exportar: {
				exportarSeguimiento: {
					posicion: 'left',
					opciones: [{ archivo: globalFactory.tipoDocExportar.excel }],
					urlDescarga: 'Descarga/DescargaArchivo.aspx',
					metodoPr: 'segSeguimientoSolicitudes.aspx/ReporteRepObtenerSolicitudesDesdeEstadistica', // backend
				}
			},
            imprimir: {
                plantillas: {
                    reporteSeguimiento:'segSeguimientoSolicitudes.html'
                }
            }
		};
		
		var formatearAtributosFecha=function(obj){
            var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;
            var i=0;
            for( var property in obj ){
            	i++;
                if(obj[property]!==null&&obj[property]!==''){
                    if(moment(obj[property]).isValid()&&isNaN(obj[property])&&aspNetJsonRegex.test(obj[property])){
                        // var fecha="dateFactory.convertirDateTime(dateFactory.cambiarUTC(moment(obj[property])), 'DD/MM/YYYY')";
                    	var fecha="(moment(obj[property]).format('DD/MM/YYYY'))";
                      //var hora="(moment(obj[property]).format('HH:mm:ss'))";
                    	// var hora="dateFactory.convertirDateTime(dateFactory.cambiarUTC(moment(obj[property])), 'HH:mm:ss')";
                    	eval("obj.front" + property + "=" + "{fecha:" + fecha + "}");
                    }
                }
            }
            return obj;
        };
        
        var obtenerSolicitudes = function (pagina,numRegistros) {
            
            ng.abortarBuscarXHR()
			
            var parametros = {
                
                numeroCedula	: ng.modeloCiudadanoCopia.numeroCedula == ''? null: ng.modeloCiudadanoCopia.numeroCedula,
                numeroSolicitud	: ng.modeloCiudadanoCopia.numeroSolicitud ===''?null:ng.modeloCiudadanoCopia.numeroSolicitud,
                nombre			: ng.modeloCiudadanoCopia.nombre ===''?null:ng.modeloCiudadanoCopia.nombre,
                apellidoPaterno	: ng.modeloCiudadanoCopia.apellidoPaterno ===''?null:ng.modeloCiudadanoCopia.apellidoPaterno,
                apellidoMaterno	: ng.modeloCiudadanoCopia.apellidoMaterno ===''?null:ng.modeloCiudadanoCopia.apellidoMaterno,
                idEstadoSolicitud: ng.itemEstadoCopia.idEstadoSolicitud ,
                inicio: pagina,
                cantidadRegistros: numRegistros
				
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerSolicitudTrasladoElectoral', parametros, function (data) {
                ng.safeApply(function () {
					 
					 var respuesta = data;
						
                        if (respuesta.success) {
							
                            if(respuesta.lista.length>0){
								ng.verListaSolicitudes = respuesta.success;
								
								ng.totalRegistros = respuesta.total;
								ng.noOfPages = Math.ceil((1 * respuesta.total) / (1 * ng.cantidadRegistrosModel));
                ng.listaSolicitudes = respuesta.lista;
                ng.modeloDetalleCiudadano = {};

								angular.forEach (ng.listaSolicitudes, function (value, key) {
                                    formatearAtributosFecha(value);
                                });	
								
								ng.parametrosExport = {
									numeroCedula	: ng.modeloCiudadanoCopia.numeroCedula == ''? null: ng.modeloCiudadanoCopia.numeroCedula,
									numeroSolicitud	: ng.modeloCiudadanoCopia.numeroSolicitud ==''?null:ng.modeloCiudadanoCopia.numeroSolicitud,
									nombre			: ng.modeloCiudadanoCopia.nombre ==''?null:ng.modeloCiudadanoCopia.nombre,
									apellidoPaterno	: ng.modeloCiudadanoCopia.apellidoPaterno ==''?null:ng.modeloCiudadanoCopia.apellidoPaterno,
									apellidoMaterno	: ng.modeloCiudadanoCopia.apellidoMaterno ==''?null:ng.modeloCiudadanoCopia.apellidoMaterno,
									idEstadoSolicitud: ng.itemEstadoCopia.idEstadoSolicitud == '' ? null : ng.itemEstadoCopia.idEstadoSolicitud,
									descripcionEstadoSolicitudFiltro: ng.itemEstadoCopia.idEstadoSolicitud == '' ? null : ng.itemEstadoCopia.descripcionEstado
								};
                            }else{
								ng.verListaSolicitudes = ng.verListaDetalleSolicitudes =false;
								ng.modeloDetalleCiudadano = {};
                            	ng.alertaListaSolicitudesVacia.mostrar = true;
								ng.listaSolicitudes = [];
                            }
                        }else{
							ng.verListaSolicitudes = ng.verListaDetalleSolicitudes = false;
							
							ng.listaSolicitudes = [];
							ng.modeloDetalleCiudadano = {};
                            ng.mostrarAlertaFlotante(ng.mensajesApp.SYS004,'error');
							
                        }
                    ng.mostrarPreloadBuscar = false;
					globalFactory.preload(false,'#paginacion');
                });
            }, function (error) {
                ng.safeApply(function () {
                    ng.mostrarPreloadBuscar = false;
					ng.verListaSolicitudes = false;
					ng.mostrarDatos = false;
                });
            }, function (xhr) {
                ng.safeApply(function () {
                    if(ng.verListaSolicitudes==false){
						ng.mostrarPreloadBuscar = true;
					}else{
						globalFactory.preload(true,'#paginacion');
					}
                    PETICIONES.xhrBuscar = xhr;
                });
            });

            ng.currentPage = pagina;
        };
		
		ng.enviaDatosPlantilla = function(){
			var parametros = {
				cabecera : {
					cedula		: ng.modeloCiudadanoCopia.numeroCedula==null?'TODOS':ng.modeloCiudadanoCopia.numeroCedula,
					solicitud	: ng.modeloCiudadanoCopia.numeroSolicitud==null?'TODOS':ng.modeloCiudadanoCopia.numeroSolicitud,
					nombre		: ng.modeloCiudadanoCopia.nombre==null?'TODOS':ng.modeloCiudadanoCopia.nombre,
					paterno : ng.modeloCiudadanoCopia.apellidoPaterno==null?'TODOS':ng.modeloCiudadanoCopia.apellidoPaterno,
					materno : ng.modeloCiudadanoCopia.apellidoMaterno==null?'TODOS':ng.modeloCiudadanoCopia.apellidoMaterno,
					estado: ng.itemEstadoCopia.idEstadoSolicitud == null || ng.itemEstadoCopia.idEstadoSolicitud==0 ? 'TODOS' : ng.itemEstadoCopia.descripcionEstado,
					total	: ng.totalRegistros 
				},
				seguimiento : ng.listaTotalSolicitudes
			};
			globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporteSeguimiento, parametros);
		};
		
		var obtenerSolicitudesTotal = function (numRegistros) {
            
            ng.abortarBuscarXHR()
			
            var parametros = {
                
                numeroCedula	: ng.modeloCiudadanoCopia.numeroCedula == ''? null: ng.modeloCiudadanoCopia.numeroCedula,
                numeroSolicitud	: ng.modeloCiudadanoCopia.numeroSolicitud ===''?null:ng.modeloCiudadanoCopia.numeroSolicitud,
                nombre			: ng.modeloCiudadanoCopia.nombre ===''?null:ng.modeloCiudadanoCopia.nombre,
                apellidoPaterno	: ng.modeloCiudadanoCopia.apellidoPaterno ===''?null:ng.modeloCiudadanoCopia.apellidoPaterno,
                apellidoMaterno	: ng.modeloCiudadanoCopia.apellidoMaterno ===''?null:ng.modeloCiudadanoCopia.apellidoMaterno,
                idEstadoSolicitud: ng.itemEstadoCopia.idEstadoSolicitud,
                inicio: 1,
                cantidadRegistros: numRegistros
				
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerSolicitudTrasladoElectoral', parametros, function (data) {
                ng.safeApply(function () {
					var respuesta = data;
					if (respuesta.success && respuesta.lista.length>0) {
						ng.listaTotalSolicitudes = respuesta.lista;
						angular.forEach (ng.listaTotalSolicitudes, function (value, key) {
							formatearAtributosFecha(value);
						});		
						ng.enviaDatosPlantilla();
					}else{
						ng.listaTotalSolicitudes = [];
					}
                });
            }, function (error) {
                ng.safeApply(function () {
                    
                });
            }, function (xhr) {
                ng.safeApply(function () {
                    PETICIONES.xhrBuscar = xhr;
                });
            });
        };
		
		ng.obtenerEstadosSolicitud = function () {
            var parametros = {
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerEstadosSolicitud', parametros, function (data) {
                ng.safeApply(function () {
				var respuesta = data;
					if (respuesta.success && respuesta.lista.length>0) {
						ng.listaEstadosSolicitudes = respuesta.lista;
					}else{
						ng.mostrarAlertaFlotante(ng.mensajesApp.SYS004,'error');
					}
                });
            }, function (error) {
                ng.safeApply(function () {
					ng.mostrarAlertaFlotante(ng.mensajesApp.SYS004,'error');
                });
            }, function (xhr) {
                ng.safeApply(function () {
                });
            });
        };
		
		
        ng.clicBuscar = function (frm) {
			if(frm.$valid){
				ng.alertaListaSolicitudesVacia.mostrar = false;
				ng.verListaSolicitudes = ng.verListaDetalleSolicitudes = false;
				ng.currentPage=1;
				
				ng.modeloCiudadanoCopia.numeroCedula = ng.modeloCiudadano.numeroCedula,
                ng.modeloCiudadanoCopia.numeroSolicitud = ng.modeloCiudadano.numeroSolicitud,
                ng.modeloCiudadanoCopia.nombre = ng.modeloCiudadano.nombre,
                ng.modeloCiudadanoCopia.apellidoPaterno = ng.modeloCiudadano.apellidoPaterno,
                ng.modeloCiudadanoCopia.apellidoMaterno = ng.modeloCiudadano.apellidoMaterno,
                ng.itemEstadoCopia.idEstadoSolicitud = ng.itemEstado.idEstadoSolicitud,
				ng.itemEstadoCopia.descripcionEstado = ng.itemEstado.descripcionEstado
				
				obtenerSolicitudes(1,ng.cantidadRegistrosModel);	
			}
        };
		
		ng.enterBuscar = function(frm,$event){
			if($event.keyCode == '13' && frm.$valid ){
				ng.clicBuscar(frm);
			}
		}		
		
        ng.clicObtenerDetalle = function(i){
				ng.indice = i;
				ng.verListaDetalleSolicitudes = true;
				ng.modeloDetalleCiudadano.cedula 		  = ng.listaSolicitudes[i].numeroCedula;
				ng.modeloDetalleCiudadano.numeroSolicitud = ng.listaSolicitudes[i].numeroSolicitud;
				ng.modeloDetalleCiudadano.nombre 	      = ng.listaSolicitudes[i].nombre;
				ng.modeloDetalleCiudadano.primerApellido  = ng.listaSolicitudes[i].apellidoPaterno;
				ng.modeloDetalleCiudadano.segundoApellido = ng.listaSolicitudes[i].apellidoMaterno;
				ng.modeloDetalleCiudadano.fecha			  = ng.listaSolicitudes[i].frontfechaHora.fecha;
				ng.modeloDetalleCiudadano.hora			  = ng.listaSolicitudes[i].hora;
				ng.modeloDetalleCiudadano.idEstadoSolicitud = ng.listaSolicitudes[i].estadoCodigoSICI;
				ng.modeloDetalleCiudadano.descripcionEstado = ng.listaSolicitudes[i].descripcionEstado;
		}
		
        ng.onCambiarPaginacion = function (page)
        {
          ng.verListaDetalleSolicitudes = false
          ng.currentPage = page;
			    obtenerSolicitudes(page,ng.cantidadRegistrosModel);
        };
		
		ng.cambioPaginacionCantidad = function() {
			ng.onCambiarPaginacion(1);
		};
		
		ng.cambiaEstado = function (){
		var i=0;
		var noEncontrado= true;
			if(ng.itemEstado.idEstadoSolicitud!=''){
				while(noEncontrado || i< ng.listaEstadosSolicitudes){
					if(ng.listaEstadosSolicitudes[i].idEstadoSolicitud==ng.itemEstado.idEstadoSolicitud){
						noEncontrado=false;
						ng.itemEstado.descripcionEstado = ng.listaEstadosSolicitudes[i].descripcionEstado;
					}
				i++;
				}
			}else{
				ng.itemEstado.idEstadoSolicitud='';
				ng.itemEstado.descripcionEstado='TODOS';
			}
		};
		
		ng.init = function () {
			ng.obtenerEstadosSolicitud();
        };
			
		ng.clickImprimirReporteSeguimiento = function(){
			obtenerSolicitudesTotal(ng.totalRegistros);
		};
				
		ng.exportarReporteSeguimiento = function (tipoDocumento) {
			
			reportingFactory.descargar(APP.DATA.CONFIG.URL_BASE + ng.reportes.exportar.exportarSeguimiento.urlDescarga,'RSRepObtenerSolicitudesDesdeSeguimiento', parametrosExport,0);
		};
       
    }]);
});
