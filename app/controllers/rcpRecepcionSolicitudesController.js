'use strict';

define(['app'], function (app) {

    app.register.controller('rcpRecepcionSolicitudesController', ['$scope', '$http', 'globalFactory', 'ajaxFactory', 'alertsFactory','cookiesFactory', 'dateFactory', function ($scope, $http, globalFactory, ajaxFactory, alertsFactory, cookiesFactory, dateFactory) {

        var ng = $scope;

        ng.prRemoto = 'rcpRecepcionSolicitudes.aspx/';

        var co = cookiesFactory;

        /* COOKIES */
        var cookies = {
            login: co.obtener('loginUsuario'),
            idUsuario: co.obtener('idUsuario'),
        };

        ng.safeApply = function(fn) {
			var phase = this.$root.$$phase;
			if (phase == '$apply' || phase == '$digest') {
				if (fn && ( typeof (fn) === 'function')) {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};
        
        var PETICIONES = {
            xhrBuscar: null,
            xhrDetalle:null
        };

        var modeloCiudadano = {
            cedula:'',
            nombre:'',
            primerApellido:'',
            segundoApellido:''
        };

        ng.init = function() {
        	resetearFiltro();
        	resetearExcepcionesAdjuntos();
        	resetearListaExcepciones();
        	consultarPais();
		};

		function resetearFiltro(){
			ng.modeloCiudadano={
				cedula:'',
				nombre:'',
				primerApellido:'',
				segundoApellido:''
			};
		}
		
		ng.abortarBuscarXHR = function () {
            if(PETICIONES.xhrBuscar !== null){
                PETICIONES.xhrBuscar.abort();
            }
        };

        ng.abortarDetalleXHR = function () {
            if(PETICIONES.xhrDetalle !== null){
                PETICIONES.xhrDetalle.abort();
            }
        };

		// var sesion = cookiesFactory.obtener('sesion');
		var constantes={
			idEstadoSolicitud:1,
			idEstadoSolicitudEnviar:3,
			numeroSolicitud:'',
		};

        ng.enumDedo={
            indice:{alias:' ', descripcion:'Índice'},
            medio:{alias:'M', descripcion:'Medio'},
            anular:{alias:'A', descripcion:'Anular'},
            pulgar:{alias:'P', descripcion:'Pulgar'},
            menique:{alias:'Q', descripcion:'Meñique'},
            ninguno:{alias:'N', descripcion:'Ninguno'}
        };

		ng.mensajesApp = APP.DATA.MENSAJES;

		ng.alertaListaSolicitudesVacia = {
            mensaje: ng.mensajesApp.NOT006,
            tipo: 'info',
            mostrar: false,
            ocultar: { auto: false, click: true, tiempo: 0 }
        };

        ng.alertaEnviar = {
            mensaje: '',
            tipo: 'success',
            mostrar: false,
            ocultar: { auto: false, click: true, tiempo: 0 }
        };

        ng.indice = -1;

        ng.disabledBotonEnviar=false;
        ng.modeloNumeroSolicitud=null;

        ng.currentPage=1;
		ng.cantidadRegistrosModel = 10;		
		// ng.nroPaginasVisibles = 10;
        ng.maximoPorPagina = 10;        
        ng.nroPaginasVisibles = 10;

		ng.mostrarResultados=false;
		ng.mostrarDatos=false;

		ng.mostrarAlertaFlotante = function (mensaje,tipo) {
            alertsFactory.alerta({
                tipo: tipo,
                mensaje: mensaje,
                oculto: false
            });
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

        function isNumber(n){
        	return n == parseFloat(n);
		}

        function isEven(n){
        	return isNumber(n) && (n % 2 == 0);
		}

		function isOdd(n){
			return isNumber(n) && (Math.abs(n) % 2 == 1);
		}

		function resetearListaExcepciones(){
			ng.listaExcepciones_1=[];
			ng.listaExcepciones_2=[];	
		}

        function formatearListaExcepciones(lista) {
        	var i=1;
            angular.forEach (lista, function (value, key) {
            	i++;
                if (isEven(i)){
                    ng.listaExcepciones_1.push(value);
                }else{
                	if(isOdd(i)){
                		ng.listaExcepciones_2.push(value);	
                	}
                }
            });
            angular.forEach(ng.listaExcepciones_1, function (value, key) {
            	value.seleccionado=false;
            });
            angular.forEach(ng.listaExcepciones_2, function (value, key) {
            	value.seleccionado=false;
            });
        };

		ng.obtenerSolicitudes=function(pagina, numRegistros, mostrarPreload){
            // if(ng.modeloPartidoPolitico.idPartidoPolitico!==-1){
                ng.abortarBuscarXHR();
                var parametros = {
                    numeroCedula:modeloCiudadano.cedula===''?null:modeloCiudadano.cedula,
                    nombre:modeloCiudadano.nombre===''?null:modeloCiudadano.nombre,
                    apellidoPaterno:modeloCiudadano.primerApellido===''?null:modeloCiudadano.primerApellido,
                    apellidoMaterno:modeloCiudadano.segundoApellido===''?null:modeloCiudadano.segundoApellido,
                    inicio:pagina,
                    // inicio:(pagina-1)*ng.maximoPorPagina,
                    // cantidadRegistros:ng.maximoPorPagina
                    cantidadRegistros:numRegistros
                };
                ajaxFactory.consultar(ng.prRemoto + 'ObtenerListaSolicitudTrasladoElectoral', parametros, function(respuesta){
                    ng.safeApply(function(){
                        globalFactory.preload(false,'#paginacion');
                    	  ng.mostrarResultados=respuesta.success;
                        
                        ng.currentPage = pagina;
                    	  ng.totalRegistros = respuesta.total;
                    	  ng.nroPaginas = Math.ceil((1 * respuesta.total) / (1 * ng.cantidadRegistrosModel));
                        
                        if (respuesta && respuesta.success) {
                            if(respuesta.lista.length>0){
                                
                                ng.listaSolicitudes=respuesta.lista;
                                angular.forEach (ng.listaSolicitudes, function (value, key) {
                                    formatearAtributosFecha(value);
                                });
                                ng.alertaListaSolicitudesVacia.mostrar = false;
                            }else{
                            	ng.alertaListaSolicitudesVacia.mostrar = true;
                            }
                        }else{
                            ng.mostrarAlertaFlotante(respuesta.msg, ng.mensajesApp.ERROR);
                        }
                        if(mostrarPreload)
                            ng.mostrarPreloadBuscar=false;
                    });
                    }, function(error){
                        ng.safeApply(function(){
                            globalFactory.preload(false,'#paginacion');
                            if(mostrarPreload)
                                ng.mostrarPreloadBuscar=false;
                        });
                    }, function(xhr){
                        ng.safeApply(function(){
                            globalFactory.preload(true,'#paginacion');
                            if(mostrarPreload)
                                ng.mostrarPreloadBuscar=true;
                            PETICIONES.xhrBuscar=xhr;
                    });
                }); 
            // }
        };

		ng.modeloSolicitud = {};

        ng.clicBuscar=function(frmFiltro){
        	if(frmFiltro.$valid){
        		ng.listaSolicitudes=[];
        		ng.indice=-1;
                ng.mostrarResultados=false;
        		ng.mostrarDatos=false;
        		
        		resetearExcepcionesAdjuntos();
        		resetearListaExcepciones();
        		ng.alertaEnviar.mensaje = '';
        		ng.alertaEnviar.mostrar = false;
        		modeloCiudadano = angular.copy(ng.modeloCiudadano);
                ng.currentPage=1;
        		ng.obtenerSolicitudes(1, ng.cantidadRegistrosModel, true);	
        	}
        };

        ng.onCambiarPaginacion = function(page){
            ng.obtenerSolicitudes(page,ng.cantidadRegistrosModel, false);
            ng.indice=-1;
            ng.mostrarDatos=false;
            ng.modeloSolicitud={};
            // resetearFiltro();
            resetearExcepcionesAdjuntos();
            resetearListaExcepciones();
        };
        
        ng.cambioPaginacionCantidad = function() {
            ng.onCambiarPaginacion(1);
        };
        var cambioPais = null;
        ng.clicObtenerDetalle=function(row, $index){
        	if(ng.indice !== $index){
                ng.mostrarDatos=false;
                ng.listaExcepciones=[];
                ng.listaExcepciones_1=[];
                ng.listaExcepciones_2=[];
        		ng.abortarDetalleXHR();
        		ng.indice=$index;
	        	var parametros = {
	            	idSolicitudTrasladoElectoral:row.idSolicitudTrasladoElectoral
	            };
	            ajaxFactory.consultar(ng.prRemoto + 'ObtenerDetalleSolicitudTrasladoElectoral', parametros, function(respuesta){
	                ng.safeApply(function(){
	                	ng.mostrarDatos=respuesta.success;
	                    if (respuesta && respuesta.success) {
	                        ng.modeloSolicitud = formatearAtributosFecha(respuesta.lista);
	                        ng.listaAuxiliar = respuesta.lista;
	                        if (ng.listaAuxiliar != undefined && ng.listaAuxiliar != null) {
	                            ng.modeloSolicitud.idPais = ng.listaAuxiliar.idPais;
	                            cambioPais = true;
	                            ng.cambiarListaConsulado(ng.modeloSolicitud.idPais);
	                            ng.modeloSolicitud.idConsulado = ng.listaAuxiliar.idConsulado;	                            
	                        }

	                        ng.listaExcepciones=respuesta.listaExcepciones;
                            resetearExcepcionesAdjuntos();
	                        if(ng.listaExcepciones.length>0)
	                        	formatearListaExcepciones(ng.listaExcepciones);
                            
                            ng.adjuntos={
                                firma:respuesta.firma,
                                fotografia:respuesta.fotografia,
                                dactilares:respuesta.dactilares
                            };
                            if(ng.adjuntos.dactilares.izquierda.dedo==ng.enumDedo.medio.alias)
                                ng.adjuntos.dactilares.izquierda.dedo=ng.enumDedo.medio.descripcion;
                                else if(ng.adjuntos.dactilares.izquierda.dedo==ng.enumDedo.anular.alias)
                                ng.adjuntos.dactilares.izquierda.dedo=ng.enumDedo.anular.descripcion;
                                    else if(ng.adjuntos.dactilares.izquierda.dedo==ng.enumDedo.pulgar.alias)
                                    ng.adjuntos.dactilares.izquierda.dedo=ng.enumDedo.pulgar.descripcion;
                                        else if(ng.adjuntos.dactilares.izquierda.dedo==ng.enumDedo.menique.alias)
                                        ng.adjuntos.dactilares.izquierda.dedo=ng.enumDedo.menique.descripcion;
                                            else if(ng.adjuntos.dactilares.izquierda.nombreArchivo===null&&ng.adjuntos.dactilares.izquierda.nombreArchivo==='')
                                            ng.adjuntos.dactilares.izquierda.dedo=ng.enumDedo.ninguno.descripcion;
                                                else
                                                     ng.adjuntos.dactilares.izquierda.dedo=ng.enumDedo.indice.descripcion;

                            if(ng.adjuntos.dactilares.derecha.dedo==ng.enumDedo.medio.alias)
                                ng.adjuntos.dactilares.derecha.dedo=ng.enumDedo.medio.descripcion;
                                else if(ng.adjuntos.dactilares.derecha.dedo==ng.enumDedo.anular.alias)
                                ng.adjuntos.dactilares.derecha.dedo=ng.enumDedo.anular.descripcion;
                                    else if(ng.adjuntos.dactilares.derecha.dedo==ng.enumDedo.pulgar.alias)
                                    ng.adjuntos.dactilares.derecha.dedo=ng.enumDedo.pulgar.descripcion;
                                        else if(ng.adjuntos.dactilares.derecha.dedo==ng.enumDedo.menique.alias)
                                        ng.adjuntos.dactilares.derecha.dedo=ng.enumDedo.menique.descripcion;
                                            else if(ng.adjuntos.dactilares.derecha.nombreArchivo===null&&ng.adjuntos.dactilares.derecha.nombreArchivo==='')
                                            ng.adjuntos.dactilares.derecha.dedo=ng.enumDedo.ninguno.descripcion;
                                                else
                                                     ng.adjuntos.dactilares.derecha.dedo=ng.enumDedo.indice.descripcion;

	                    }else{
	                        ng.mostrarAlertaFlotante(respuesta.msg, ng.mensajesApp.ERROR);
	                    }
	                    // ng.mostrarPreloadDatos=false;
                        globalFactory.preload(false,'#paginacion');
	                });
	                }, function(error){
	                    ng.safeApply(function(){
	                        ng.mostrarPreloadDatos=false;
	                    });
	                }, function(xhr){
	                    ng.safeApply(function(){
	                        // ng.mostrarPreloadDatos=true;
	                        PETICIONES.xhrDetalle=xhr;
                            globalFactory.preload(true,'#paginacion');
	                });
	            });
        	}
        };

        ng.enterBuscar=function($event, frmFiltro){
            if ($event.keyCode == '13'){
            	ng.clicBuscar(frmFiltro);
            }
        };

        function resetearExcepcionesAdjuntos(){
        	ng.modeloExcepcionFirma=false;
	        ng.modeloExcepcionFotografia=false;
	        ng.modeloExcepcionIzquierda=false;
	        ng.modeloExcepcionDerecha=false;	
        }

        ng.cambiarExcepcion=function(excepcionFirma,excepcionFoto,excepcionIzquierda,excepcionDerecha){
        	if(excepcionFirma||excepcionFoto||excepcionIzquierda||excepcionDerecha){
        		ng.disabledBotonEnviar=false;
        		return true;	
        	}else{
        		ng.disabledBotonEnviar=false;
        		return false;
        	}
        };

        function validarChecados(lista){
            var checados=[];
            angular.forEach(lista, function(value, key){
                if(value.seleccionado){
                    checados.push(value);
                }
            });
            if(checados.length>0){
                return false;
            }else{
                return true;
            }
        }

        ng.cambiarListaExcepciones_1=function(){
        	if(ng.cambiarExcepcion(ng.modeloExcepcionFirma, ng.modeloExcepcionFotografia, ng.modeloExcepcionIzquierda, ng.modeloExcepcionDerecha)){
        		ng.disabledBotonEnviar=validarChecados(ng.listaExcepciones_1);
        	}
        };

        ng.cambiarListaExcepciones_2=function(){
        	if(ng.cambiarExcepcion(ng.modeloExcepcionFirma, ng.modeloExcepcionFotografia, ng.modeloExcepcionIzquierda, ng.modeloExcepcionDerecha)){
        		ng.disabledBotonEnviar=validarChecados(ng.listaExcepciones_2);
        	}
        };

        ng.clicEnviar=function(){
        	if(!ng.disabledBotonEnviar){
        		var listaExcepcionesEnviar=[];
        		angular.forEach(ng.listaExcepciones_1, function (value, key) {
	            	if(value.seleccionado){
	            		listaExcepcionesEnviar.push(value.idExcepcion);	
	            	}
	            });
	            angular.forEach(ng.listaExcepciones_2, function (value, key) {
	            	if(value.seleccionado){
	            		listaExcepcionesEnviar.push(value.idExcepcion);	
	            	}
	            });

	            var objetoSolicitud = {
	                numeroCedula: ng.modeloSolicitud.numeroCedula,
	                conocidoComo: ng.modeloSolicitud.conocidoComo,
	                telefonoExterior: ng.modeloSolicitud.telefonoExterior,
	                telefonoCostaRica: ng.modeloSolicitud.telefonoCostaRica,
	                correoElectronico: ng.modeloSolicitud.correoElectronico,
	                paisResidenciaExterior: ng.modeloSolicitud.paisResidenciaExterior,
	                ciudadResidenciaExterior: ng.modeloSolicitud.ciudadResidenciaExterior,
	                direccionExacta: ng.modeloSolicitud.direccionExacta,
	                direccionCostaRica: ng.modeloSolicitud.direccionCostaRica,
	                idPais: ng.modeloSolicitud.idPais,
	                idConsulado: ng.modeloSolicitud.idConsulado,
	                sexo: ng.modeloSolicitud.sexo,
	                observacionesComentariosSolicitud: ng.modeloSolicitud.observacionesComentariosSolicitud
	            };

	            var parametros = {
	        		idSolicitudTrasladoElectoral:ng.modeloSolicitud.idSolicitudTrasladoElectoral,
	        		lstExcepcionTraslado:listaExcepcionesEnviar,
                    flagFoto:ng.modeloExcepcionFotografia?'H':'D',
                    flagFirma:ng.modeloExcepcionFirma?'H':'D',
                    flagHuellaIzquierda:ng.modeloExcepcionIzquierda?'H':'D',
                    flagHuellaDerecha:ng.modeloExcepcionDerecha?'H':'D',
                    idUsuario: cookies.idUsuario,
                    objetoSolicitud:objetoSolicitud
	            };

	            ajaxFactory.consultar(ng.prRemoto + 'ActualizarSolicitudTrasladoElectoral', parametros, function(respuesta){
                    ng.safeApply(function(){
                    	if (respuesta && respuesta.success) {
		                    ng.alertaEnviar.mensaje = 'La solicitud fue enviada éxitosamente.';
			                ng.alertaEnviar.tipo = ng.mensajesApp.SUCCESS;
				            ng.alertaEnviar.mostrar = true;
				            ng.listaSolicitudes=[];
				            ng.indice=-1;
				            ng.modeloNumeroSolicitud=null;
				            ng.mostrarResultados=false;
			        		ng.mostrarDatos=false;
			        		ng.modeloSolicitud={};
			        		resetearFiltro();
			        		resetearExcepcionesAdjuntos();
			        		resetearListaExcepciones();
                    	} else {
                    	    if (respuesta.validoEnviarSICI != undefined) {
                    	        var arregloError = respuesta.validoEnviarSICI.split('-');
                    	        ng.mostrarAlertaFlotante('Error del SICI:' + arregloError[1],ng.mensajesApp.ERROR);
                    	    }
                    	    else {
                    	        ng.mostrarAlertaFlotante(ng.mensajesApp.ERR002, ng.mensajesApp.ERROR);
                    	    }
		                }
                        globalFactory.preload(false);
                    });
                    }, function(error){
                        ng.safeApply(function(){
                            globalFactory.preload(false);
                        });
                    }, function(xhr){
                        ng.safeApply(function(){
                            globalFactory.preload(true);
                    });
                });
        	}
        };
      
        ng.reportes = {
            exportar: {

            },
            imprimir: {
                plantillas: {
                    informacionSolicitud: 'rcpRecepcionSolicitudes.html'
                }
            }
        };
        
        ng.imprimirInformacionSolicitud = function(){
            var parametros = {
                solicitud: ng.modeloSolicitud,
                traslado:ng.traslado,
                adjuntos:ng.adjuntos
            };
            globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.informacionSolicitud, parametros);
        };

        var mensajes = APP.DATA.MENSAJES;


        //ng.modeloSolicitud.idPais = 0;

        var consultarPais = function () {
          ng.arregloConsulado = [];
          ng.arregloConsulado.push({ canton: { idCanton: "0" }, provincia: { idProvincia: "8" }, idDistrito: "0", descripcion: mensajes.MSG002 });
          //traslado.ciudadano.consulado="0";
          //ng.modeloSolicitud.idConsulado = (ng.modeloSolicitud.idConsulado > 0 ? ng.modeloSolicitud.idConsulado : 0);

          globalFactory.preload(true);
          var parametros = { idParametro: 8 };
          ajaxFactory.consultar(ng.prRemoto + 'ObtenerPais', parametros, function (data) {
            globalFactory.preload(false);
            if (data) {
              if (data.success) {
                  ng.arregloPaises = [];
                  ng.arregloPaises = data.lista;
                  ng.modeloSolicitud.idConsulado = 0;
              } else {
                // ng.alertaTablaExcepciones.mensaje = data.d.msg;
                // ng.alertaTablaExcepciones.mostrar = true;
              }
            }
            else {
              // ng.alertaTablaExcepciones.mensaje = APP.DATA.MENSAJES.SYS004;
              // ng.alertaTablaExcepciones.mostrar = true;
            }
            $scope.$apply();
          }, function () {
          }, function () {

          });

        };

        var idPaisAuxiliar = null;
        var contador = 0;
        ng.cambiarListaConsulado = function (idPais) {
          ng.arregloConsulado = [];
          ng.arregloConsulado.push({ canton: { idCanton: "0" }, provincia: { idProvincia: "8" }, idDistrito: "0", descripcion: mensajes.MSG002 });

          //if (esVolver) {
          //  ng.modeloSolicitud.consulado = (ng.modeloSolicitud.consulado > 0 ? ng.modeloSolicitud.consulado : 0);
          //ng.modeloSolicitud.idconsulado = 4;

          var parametros = {
            idParametro: 8,
            idPais: idPais
          };
          ajaxFactory.consultar(ng.prRemoto + 'ObtenerConsulado', parametros, function (data) {
            if (data) {
              if (data.success) {
                angular.forEach(data.lista, function (value, key) {
                  ng.arregloConsulado.push(value);
                });
                ng.arregloConsulado[0].descripcion = mensajes.MSG002;
                if (ng.modeloSolicitud.idConsulado == undefined || ng.modeloSolicitud.idConsulado == null || ng.modeloSolicitud.idConsulado == 0 || cambioPais != true)
                {
                  ng.modeloSolicitud.idConsulado = 0;
                }
                else
                {
                  cambioPais = false;
                  ng.modeloSolicitud.idConsulado = ng.modeloSolicitud.idConsulado;
                }
              }
              else {
                // ng.alertaTablaExcepciones.mensaje = data.d.msg;
                // ng.alertaTablaExcepciones.mostrar = true;
              }
            }
            else {
              // ng.alertaTablaExcepciones.mensaje = APP.DATA.MENSAJES.SYS004;
              // ng.alertaTablaExcepciones.mostrar = true;
            }

            $scope.$apply();
          }, function () {
          }, function () {
            ng.arregloConsulado[0].descripcion = mensajes.SYS003;
          });

        };

      //Evento change combo consulado
        ng.SeleccionarConsulado = function () {
          if (ng.modeloSolicitud.idConsulado != -1 && ng.modeloSolicitud.idPais != -1) 
          {
            for (var i=0; i < ng.arregloConsulado.length; i++) 
            { 
              if (ng.arregloConsulado[i].idDistrito == ng.modeloSolicitud.idConsulado) 
              {
                ng.modeloSolicitud.consulado = ng.arregloConsulado[i].descripcion;
              }
            }
          }
        };

    }]);
});
