'use strict';


define(['app'], function (app) {

    app.register.controller('repHistoricoSolicitudController', ['$scope', '$http', 'ajaxFactory', 'alertsFactory','cookiesFactory', 'dateFactory','globalFactory','downloadFactory','reportingFactory', function ($scope, $http, ajaxFactory, alertsFactory, cookiesFactory, dateFactory, globalFactory, downloadFactory,reportingFactory) {

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
				
        ng.prRemoto = 'repHistoricoSolicitudes.aspx/';

        ng.mensajesApp = APP.DATA.MENSAJES;
		

        ng.alertaListaSolicitudesVacia = {
            mensaje: ng.mensajesApp.HEL021,
            tipo: 'info',
            mostrar: false,
            ocultar: { auto: false, click: true, tiempo: 0 }
        };
		ng.alertaListaSolicitudesVacia2 = {
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

        ng.itemEstado = {
			idEstadoSolicitud:'',
			descripcionEstado:''
		};
		
		ng.itemEstadoCopia = {
			idEstadoSolicitud:'',
			descripcionEstado:''
		};
		
        ng.modeloCiudadano = {
            numeroCedula: null,
			numeroSolicitud: null,
            nombre: null,
            apellidoPaterno: null,
            apellidoMaterno: null,
			idEstadoSolicitud:null
        };
		
		ng.modeloCiudadanoCopia = {
            numeroCedula: null,
			numeroSolicitud: null,
            nombre: null,
            apellidoPaterno: null,
            apellidoMaterno: null,
			idEstadoSolicitud:null
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
		
		ng.indiceActual = -1; 
		ng.indice = -1;
		ng.onlyNumbers = /^[0-9]*$/;
		ng.onlyLetters = /^[a-zA-Z\ \'\u00e1\u00e9\u00ed\u00f3\u00fa\u00c1\u00c9\u00cd\u00d3\u00da\u00f1\u00d1\u00FC\u00DC]*$/;
		ng.onlySolicitud = /^[0-9]{12}$/;
		
		ng.flagBtnBuscar = true;
		ng.flagBotonFiltro = true;

		ng.verListaSolicitudes = ng.verListaDetalleSolicitudes = false;
		
		ng.currentPage = ng.currentPage2 = 1;
		
		ng.cantidadRegistrosModel  = ng.cantidadRegistrosModel2 = 10;
		ng.maxsize = ng.maxsize2 = 5;
								
		ng.listaSolicitudes = [];
		ng.mostrarPreloadBuscar2 = false;
		
		ng.bloquearBotonImprimir = false;
		
		/* REPORTES */
		ng.reportes = {
			exportar: {
				exportarHistorico: {
					posicion: 'left',
					opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
					urlDescarga: 'Descarga/DescargaArchivo.aspx', //DescargaExcel.aspx
					metodoPr: 'repHistoricoSolicitudes.aspx/ReporteRepObtenerSolicitudesDesdeHistorico', // backend
				}
			},
            imprimir: {
                plantillas: {
                    reporteDetallado:'repHistoricoSolicitud.html' 
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
		
		ng.obtenerEstadosSolicitud = function () {
            var parametros = {
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerEstadosSolicitud', parametros, function (data) {
                ng.safeApply(function () {
				var respuesta = data;
					if (respuesta.success) {
						if(respuesta.lista.length>0){
							ng.listaEstadosSolicitudes = respuesta.lista;
						}else{
						}
					}else{
					}
                });
            }, function (error) {
                ng.safeApply(function () {
                });
            }, function (xhr) {
                ng.safeApply(function () {
                });
            });
        }; ng.obtenerEstadosSolicitud();
		
    var obtenerSolicitudes = function (pagina, numRegistros) {
            ng.abortarBuscarXHR()
            var parametros = {
                
                numeroCedula	: ng.modeloCiudadanoCopia.numeroCedula || null,
                numeroSolicitud: ng.modeloCiudadanoCopia.numeroSolicitud || null,
                nombre			: ng.modeloCiudadanoCopia.nombre ===''?null:ng.modeloCiudadanoCopia.nombre,
                apellidoPaterno	: ng.modeloCiudadanoCopia.apellidoPaterno ==''?null:ng.modeloCiudadanoCopia.apellidoPaterno,
                apellidoMaterno	: ng.modeloCiudadanoCopia.apellidoMaterno ==''?null:ng.modeloCiudadanoCopia.apellidoMaterno,
                idEstadoSolicitud : ng.itemEstadoCopia.idEstadoSolicitud==''?null:ng.itemEstadoCopia.idEstadoSolicitud,
                inicio: pagina || 0,
                cantidadRegistros: numRegistros
				
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerSolicitudTrasladoElectoral', parametros, function (data) {
                ng.safeApply(function () {
					 ng.verListaSolicitudes
					 var respuesta = data;

					 if (respuesta.success)
					 {
					   if (respuesta.lista.length > 0)
					   {
								ng.verListaSolicitudes = respuesta.success;
                               
							  ng.listaSolicitudes = respuesta.lista;
								ng.noOfPages = Math.ceil((1*respuesta.total)/(1*ng.cantidadRegistrosModel));   
																
								if (ng.noOfPages > 5)
								{
									ng.maxSize = 5; 
								}
								else
								{
									ng.maxSize = ng.noOfPages;
								}

							  ng.totalRegistros = respuesta.total;
								ng.seleccionMostrar = ng.cantidadRegistrosModel;
								ng.modeloDetalleCiudadano = {};

								angular.forEach (ng.listaSolicitudes, function (value, key) {
                                    formatearAtributosFecha(value);
								});

								ng.alertaListaSolicitudesVacia2.mostrar = false;
					   }
					   else
					   {
								ng.verListaSolicitudes = false;
								ng.listaSolicitudes = [];
								ng.modeloDetalleCiudadano = {};
                            	ng.alertaListaSolicitudesVacia2.mostrar = true;
             }
					 }
					 else
					 {
							ng.verListaSolicitudes = false;
							
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
					ng.mostrarResultados = false;
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
		
		ng.onCambiarPaginacion = function(page){
		  ng.verListaDetalleSolicitudes = false;
		  ng.currentPage = page;
		  obtenerSolicitudes(ng.currentPage, ng.cantidadRegistrosModel);
        };
		
		ng.cambioPaginacionCantidad = function() {
			ng.onCambiarPaginacion(1);
		};
				 
		var clickObtenerDetalleSolicitud = function (pagina, numRegistros) {
            ng.abortarBuscarXHR()
            var parametros = {
                numeroSolicitud	: ng.solicitudActual,
                inicio: pagina,
                cantidadRegistros: numRegistros
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerHistoricoSolicitudTrasladoElectoral', parametros, function (data) {
                ng.safeApply(function () {
					 var respuesta = data;
                        if (respuesta.success) {
                            if(respuesta.lista.length>0){
								ng.verListaDetalleSolicitudes = respuesta.success;
								ng.totalRegistros2 = respuesta.total;
								ng.noOfPages2 = Math.ceil((1 * respuesta.total) / (1 * ng.cantidadRegistrosModel2));
                                ng.listaDetalleSolicitudes = respuesta.lista;
								angular.forEach (ng.listaDetalleSolicitudes, function (value, key) {
                                    formatearAtributosFecha(value);
                                });	
								ng.parametrosExport = {
									numeroSolicitud	: ng.solicitudActual == ''? null: ng.solicitudActual,
									numeroCedula	: ng.cedulaActual ==''?null:ng.cedulaActual,
									nombreActual: ng.nombreActual==''? null: ng.nombreActual,
									paternoActual: ng.paternoActual==''? null: ng.paternoActual,
									maternoActual: ng.maternoActual==''?null:ng.maternoActual,
									fechaActual: ng.fechaActual==''?null:ng.fechaActual,
									horaActual: ng.horaActual==''?null:ng.horaActual,
									estadoDescripcionActual: ng.estadoDescripcionActual,
									totalRegistros: ng.totalRegistros2==''?null:ng.totalRegistros2
								};
                            }else{
								ng.verListaDetalleSolicitudes = false;
								ng.listaDetalleSolicitudes = [];
								ng.alertaListaSolicitudesVacia2.mostrar = true;
                            }
                        }else{
							ng.verListaDetalleSolicitudes = false;
							ng.listaDetalleSolicitudes = [];
                            ng.alertaListaSolicitudesVacia2.mostrar = true;
                        }
                    ng.mostrarPreloadBuscar2 = false;
					globalFactory.preload(false,'#paginacion2');
					ng.bloquearBotonImprimir = false;
                });
            }, function (error) {
                ng.safeApply(function () {
                    ng.mostrarPreloadBuscar2 = ng.verListaDetalleSolicitudes = false;
					ng.bloquearBotonImprimir = false;
                });
            }, function (xhr) {
                ng.safeApply(function () {
					if(ng.verListaDetalleSolicitudes == false){
						ng.mostrarPreloadBuscar2 = true;
					}else{
						globalFactory.preload(true,'#paginacion2');
					}
                    PETICIONES.xhrBuscar = xhr;
					ng.bloquearBotonImprimir = true;
                });
            });
            ng.currentPage2 = pagina;
        };
		
		ng.enviaDatosPlantilla = function(){
			var parametros = {
				cabecera : {
					cedula		: ng.cedulaActual,
					solicitud	: ng.solicitudActual,
					nombre		: ng.nombreActual,
					paterno : ng.paternoActual,
					materno : ng.maternoActual,
					fecha	: ng.fechaActual,
					hora	: ng.horaActual,
				    //estado	:  ng.itemEstado.descripcionEstado == null || ng.itemEstado.descripcionEstado == '' ? 'Todos' : ng.itemEstado.descripcionEstado,
					estado	:  ng.estadoDescripcionActual,
					total	: ng.totalRegistros2 
					
				},
				historico : ng.listaDetalleSolicitudesTotal 
			};
			globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporteDetallado, parametros);
		};
		
		var obtenerSolicitudesDetalleTotal = function (numRegistros) {
            var parametros = {
                numeroSolicitud	: ng.solicitudActual,
                inicio: 1,
                cantidadRegistros: numRegistros
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerHistoricoSolicitudTrasladoElectoral', parametros, function (data) {
                ng.safeApply(function () {
					 var respuesta = data;
                        if (respuesta.success) {
                            if(respuesta.lista.length>0){
								ng.totalRegistros2 = respuesta.total;
                                ng.listaDetalleSolicitudesTotal = respuesta.lista;
								
								ng.enviaDatosPlantilla();
                            }
                        }else{
                            ng.mostrarAlertaFlotante(ng.mensajesApp.SYS004,'error');
                        }
					globalFactory.preload(false); 
                });
            }, function (error) {
				ng.safeApply(function () {
                    globalFactory.preload(false);
                });
				
                
            }, function (xhr) {
				ng.safeApply(function () {
                    globalFactory.preload(true);
                });
               
            });
        };
		
		
		ng.onCambiarPaginacion2 = function(page){
			ng.currentPage2 = page;
			clickObtenerDetalleSolicitud(ng.currentPage2, ng.cantidadRegistrosModel2);
        };
		
		ng.cambioPaginacionCantidad2 = function() {
			ng.onCambiarPaginacion2(1);
		};
		
        ng.clicBuscar = function (frmHistorico) {
			if(frmHistorico.$valid){
				ng.alertaListaSolicitudesVacia.mostrar = false;
				ng.verListaSolicitudes = ng.verListaDetalleSolicitudes = false;
				
				ng.modeloCiudadanoCopia.numeroCedula=ng.modeloCiudadano.numeroCedula;
				ng.modeloCiudadanoCopia.numeroSolicitud = ng.modeloCiudadano.numeroSolicitud;
				ng.modeloCiudadanoCopia.nombre = ng.modeloCiudadano.nombre;
				ng.modeloCiudadanoCopia.apellidoPaterno = ng.modeloCiudadano.apellidoPaterno;
				ng.modeloCiudadanoCopia.apellidoMaterno = ng.modeloCiudadano.apellidoMaterno;
				ng.itemEstadoCopia.idEstadoSolicitud = ng.itemEstado.idEstadoSolicitud;
				ng.itemEstadoCopia.descripcionEstado = ng.itemEstado.descripcionEstado;
				
				obtenerSolicitudes(1, ng.cantidadRegistrosModel);	
			}
        };
		
		ng.enterBuscar = function(frmHistorico,$event){
			if($event.keyCode == '13' && frmHistorico.$valid ){
				ng.clicBuscar(frmHistorico);
			}
		}		
		
		ng.clicObtenerDetalle = function (solicitud,cedula,paterno,materno,nombre,fecha,hora,estado,indice){
		
			ng.solicitudActual = solicitud;
			ng.cedulaActual = cedula;
			ng.paternoActual = paterno;
			ng.maternoActual = materno;
			ng.nombreActual = nombre;
			ng.fechaActual = fecha;
			ng.horaActual = hora;
			ng.estadoDescripcionActual = estado;
			console.log('ng.estadoDescripcionActual:', ng.estadoDescripcionActual);
			ng.indice = indice;
			if (ng.solicitudActual!=='' && typeof ng.solicitudActual !=='undefined'){
			    ng.alertaListaSolicitudesVacia2.mostrar = false;
			    clickObtenerDetalleSolicitud(1, ng.cantidadRegistrosModel2);
			}
		}
		
		ng.clickImprimirReporteDetallado = function(){
			obtenerSolicitudesDetalleTotal(ng.totalRegistros2);
		};		
		
		ng.exportarReporteDetallado = function(tipoDocumento){
			
            if(tipoDocumento === globalFactory.tipoDocExportar.excel) parametrosExport.tipoDocumento = 0;
            if(tipoDocumento === globalFactory.tipoDocExportar.pdf) parametrosExport.tipoDocumento = 1;
			
			reportingFactory.descargar(APP.DATA.CONFIG.URL_BASE + ng.reportes.exportar.exportarHistorico.urlDescarga,'RSRepObtenerHistoricoSolicitudTrasladoElectoral', parametrosExport,0);
			
		};
		
		ng.cambiaEstado = function (){
		var i=0;
		var noEncontrado= true;
		var j=ng.listaEstadosSolicitudes;
		
			if(ng.itemEstado.idEstadoSolicitud!=''){
				while(noEncontrado || i< j){
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
        
    }]);
});
