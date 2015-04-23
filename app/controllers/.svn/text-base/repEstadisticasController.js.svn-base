'use strict';

define(['app'], function (app) {

    app.register.controller('repEstadisticasController', ['$scope', '$http', 'ajaxFactory', 'alertsFactory','cookiesFactory', 'dateFactory','globalFactory','downloadFactory','reportingFactory', function ($scope, $http, ajaxFactory, alertsFactory, cookiesFactory, dateFactory, globalFactory, downloadFactory,reportingFactory){

	
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
				
        ng.prRemoto = 'repEstadisticas.aspx/';

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
		
		ng.itemEstado = {
			idEstadoSolicitud:'',
			descripcionEstado:''
		};
		
		ng.itemEstadoCopia = {
			idEstadoSolicitud:'',
			descripcionEstado:''
		};
		
        ng.objModel = {
            pais		: '',
            consulado	: '',
            genero		: '',
            estacion	: ''
        };
		
		ng.objModelCopia = {
            pais		: '',
            consulado	: '',
            genero		: '',
            estacion	: ''
        };
		
		var PETICIONES = {
            xhrBuscar: null,
        };

       
        ng.abortarBuscarXHR = function () {
            if (PETICIONES.xhrBuscar !== null) {
                PETICIONES.xhrBuscar.abort();
            }
        };

		ng.indice = -1;
		ng.onlyNumbers = /^[0-9]*$/;
					
		ng.mostrarGrillaSolicitudes = false;
		ng.listaSolicitudes =[];
		ng.listaPaises =[];
		ng.listaConsulados =[];
		ng.listaTotalConsulados =[];
		ng.ListaSolicitudesTotal = [];
		
		ng.nombrePaisActual='TODOS';
		ng.nombreConsuladoActual='TODOS';
		
		/* REPORTES */
		ng.reportes = {
			exportar: {
				exportarEstadisticas: {
					posicion: 'left',
					opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
					urlDescarga: 'Descarga/DescargaArchivo.aspx',
					metodoPr: 'repEstadisticasSolicitudes.aspx/ReporteRepObtenerSolicitudesDesdeEstadistica', // backend
				}
			},
            imprimir: {
                plantillas: {
                    reporteEstadisticas:'repEstadisticas.html' 
                }
            }
		};
		
		ng.formateoSexo = function(s){
			return s==1?'Masculino':'Femenino';
		};
		
			
        ng.formateoSolicitudes = function (lista) {
		    var fila = 1;
			for (var i=0, j=lista.length;i < j;i++){
				lista[i].genero = ng.formateoSexo(lista[i].genero);
			}
			return lista;
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
							// mensaje 0 registros
						}
					}else{
						ng.mostrarAlertaFlotante(ng.mensajesApp.SYS004,'error');
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
		
		ng.itemConsulado='';
        var obtenerSolicitudes = function (pagina,numRegistros) {
            ng.abortarBuscarXHR();
            var parametros = {
                pais		: ng.objModelCopia.pais == '' ? null: ng.objModelCopia.pais,
                // consulado	: ng.objModelCopia.consulado ===''?null:ng.objModelCopia.consulado,
                consulado	: ng.itemConsulado ===''?null:ng.itemConsulado.idDistrito,
                genero		: ng.objModelCopia.genero ===''?null:ng.objModelCopia.genero,
                estacion	: ng.objModelCopia.estacion ===''?null:ng.objModelCopia.estacion,
				idEstadoSolicitud : ng.itemEstadoCopia.idEstadoSolicitud===''?null:ng.itemEstadoCopia.idEstadoSolicitud,
                inicio		: pagina,
                cantidadRegistros: numRegistros
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerSolicitudesDesdeEstadistica', parametros, function (data) {
                ng.safeApply(function () {
					
					 var respuesta = data;
                       if (respuesta.success) {
							ng.mostrarGrillaSolicitudes = respuesta.success;
							ng.listaSolicitudes = respuesta.lista;
							ng.formateoSolicitudes(ng.listaSolicitudes);
							
                            if(ng.listaSolicitudes.length>0){
								ng.mostrarGrillaSolicitudes = respuesta.success;
								ng.totalRegistros = respuesta.cantidad;
								ng.noOfPages = Math.ceil(respuesta.cantidad / ng.cantidadRegistrosModel);
								
								ng.parametrosExport = {
									pais	  : ng.objModelCopia.pais==''?null:ng.objModelCopia.pais,
									// consulado : ng.objModelCopia.consulado==''?null:ng.objModelCopia.consulado,
									consulado	: ng.itemConsulado ===''?null:ng.itemConsulado.idDistrito,
									genero	  : ng.objModelCopia.genero==''?null:ng.objModelCopia.genero,
									estacion  : ng.objModelCopia.estacion==''?null:ng.objModelCopia.estacion,
									idEstadoSolicitud : ng.itemEstadoCopia.idEstadoSolicitud==''?null:ng.itemEstadoCopia.idEstadoSolicitud
								};
								
                            }else{
								ng.mostrarGrillaSolicitudes = false;
								ng.listaSolicitudes = [];
								ng.alertaListaSolicitudesVacia.mostrar = true;
                            }
                        }else{ 
							ng.mostrarGrillaSolicitudes = false;
							ng.listaSolicitudes = [];
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
					if(ng.mostrarGrillaSolicitudes==false){
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
					pais	  : ng.objModelCopia.pais ==''?'TODOS': ng.paisActual(ng.objModelCopia.pais),
					//consulado : ng.objModelCopia.consulado ==''?'TODOS':ng.consuladoActual(ng.objModelCopia.consulado),
					consulado : ng.itemConsulado ===''?'TODOS':ng.itemConsulado.descripcion,
					genero	  : ng.objModelCopia.genero ==''?'TODOS': ng.formateoSexo(ng.objModelCopia.genero),
					estacion  : ng.objModelCopia.estacion ==''?'TODAS': ng.objModelCopia.estacion,
					estado	  : ng.itemEstadoCopia.descripcionEstado===''?'TODOS': ng.itemEstadoCopia.descripcionEstado,
					total	  : ng.totalRegistrosEnvio
				},
				estadisticas : ng.listaSolicitudesTotal
            };
            globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporteEstadisticas, parametros);
		};
		
		var obtenerSolicitudesTotal = function (numRegistros) {
            var parametros = {
                pais		: ng.objModelCopia.pais ===''?null:ng.objModelCopia.pais,
                // consulado	: ng.objModelCopia.consulado ===''?null:ng.objModelCopia.consulado,
                consulado	: ng.itemConsulado ===''?null:ng.itemConsulado.idDistrito,
                genero		: ng.objModelCopia.genero ===''?null:ng.objModelCopia.genero,
                estacion	: ng.objModelCopia.estacion ===''?null:ng.objModelCopia.estacion,
				idEstadoSolicitud : ng.itemEstadoCopia.idEstadoSolicitud ===''?null:ng.itemEstadoCopia.idEstadoSolicitud,
                inicio		: 1,
                cantidadRegistros: numRegistros
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerSolicitudesDesdeEstadistica', parametros, function (data) {
                ng.safeApply(function () {
					 var respuesta = data;
                       if (respuesta.success) {
                            if(respuesta.lista.length>0){
								ng.listaSolicitudesTotal = respuesta.lista;
								ng.totalRegistrosEnvio = respuesta.cantidad;
								ng.formateoSolicitudes(ng.listaSolicitudesTotal);
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
		
		ng.obtenerPaises = function () {
            var parametros = {
                idParametro	: 8 
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerPais', parametros, function (data) {
                ng.safeApply(function () {
					var respuesta = data;
						if (respuesta.success) {
							if(respuesta.lista!=null){
								if(respuesta.lista.length>0){
									ng.listaPaises = respuesta.lista;
								}
							}
						} else {
							// mostrar mensaje?
						}
                });
            }, function (error) {
                ng.safeApply(function () {
                   
                });
            }, function (xhr) {
                ng.safeApply(function () {
                });
            }); 
        };
		
		ng.obtenerConsulados = function (idPais) {
            var parametros = {
                idParametro	: 8, 
				idPais: idPais
            };
            ajaxFactory.consultar(ng.prRemoto + 'ObtenerConsulado', parametros, function (data) {
                ng.safeApply(function () {
				var respuesta = data;
					if (respuesta.success) {
						if(respuesta.lista.length>0){
							ng.listaConsulados = respuesta.lista;
						}else{
							ng.listaConsulados =[];
						}
					}
                });
            }, function (error) {
                ng.safeApply(function () {
                   
                });
            }, function (xhr) {
                ng.safeApply(function () {
                });
            }); 
        };
		
		ng.paisActual= function (id){
			var i=0;
			var flag = true;
			var nombrePais='TODOS';
			while (i< ng.listaPaises.length && flag){
				if(ng.listaPaises[i].idCanton==id){
					nombrePais = ng.listaPaises[i].descripcion;
					flag=false;
				}
				i++;
			}
			return nombrePais;
		};
		
		ng.consuladoActual= function(obj){
			var nombreConsulado='TODOS';
			nombreConsulado = obj.descripcion;
			return nombreConsulado;
		};
		
		ng.clickImprimirReporteEstadisticas = function(){
			obtenerSolicitudesTotal(ng.totalRegistros);
		};
		
		ng.exportarReporteEstadisticas = function(tipoDocumento){
			return true;
			/*
			var parametrosExport = {
				pais	  : ng.objModelCopia.pais,
				consulado : ng.objModelCopia.consulado,
				genero	  : ng.objModelCopia.genero,
				estacion  : ng.objModelCopia.estacion ,
				idEstadoSolicitud : ng.objModelCopia.idEstadoSolicitud
			};
			*/
            if(tipoDocumento === globalFactory.tipoDocExportar.excel) parametrosExport.tipoDocumento = 0;
            if(tipoDocumento === globalFactory.tipoDocExportar.pdf) parametrosExport.tipoDocumento = 1;

			reportingFactory.descargar(APP.DATA.CONFIG.URL_BASE + ng.reportes.exportar.exportarEstadisticas.urlDescarga,'RSRepObtenerSolicitudesDesdeEstadistica', parametrosExport,0);
		};
		
        ng.clicBuscar = function (frm) {
			if(frm.$valid){
				ng.alertaListaSolicitudesVacia.mostrar = false;
				ng.mostrarGrillaSolicitudes = false;
				
				
				ng.objModelCopia.pais = ng.objModel.pais;
				ng.objModelCopia.consulado = ng.objModel.consulado;
				ng.objModelCopia.genero = ng.objModel.genero;
				ng.objModelCopia.estacion = ng.objModel.estacion;
				
				ng.itemEstadoCopia.descripcionEstado = ng.itemEstado.descripcionEstado;
				ng.itemEstadoCopia.idEstadoSolicitud = ng.itemEstado.idEstadoSolicitud; 
				
				obtenerSolicitudes(1, ng.cantidadRegistrosModel);
			}
        };
		
		ng.enterBuscar = function(frm,$event){
			if($event.keyCode == '13' && frm.$valid ){
				ng.clicBuscar(frm);
			}
		}		
        
		ng.onCambiarPaginacion = function(page){
			ng.currentPage = page;
			obtenerSolicitudes(ng.currentPage,ng.cantidadRegistrosModel);
        };
		
		ng.cambioPaginacionCantidad = function() {
			ng.onCambiarPaginacion(1);
		};
		
		ng.inicio = function(frm){
			//ng.clicBuscar(frm);
		};
		
		ng.cargarCombos = function(){
			ng.obtenerPaises();
		};
		
		ng.cambioPais = function(){
			if(ng.objModel.pais!=''){
				ng.nombrePaisActual =  ng.paisActual(ng.objModel.pais);
				ng.obtenerConsulados(ng.objModel.pais);
				
			} else {
				ng.nombrePaisActual = 'TODOS';
				
				ng.nombreConsuladoActual='TODOS';
				ng.objModel.consulado = '';
				ng.itemConsulado = '';
				ng.listaConsulados = [{idCanton:'',descripcion:'- Todos -'}];
			}
		};
		
		ng.cambioConsulado = function(){
			if(ng.itemConsulado!= null){
				ng.nombreConsuladoActual =  ng.consuladoActual(ng.itemConsulado);
			} else {
				ng.nombreConsuladoActual='TODOS';
				ng.itemConsulado = '';
			}
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
		
    }]);
});
