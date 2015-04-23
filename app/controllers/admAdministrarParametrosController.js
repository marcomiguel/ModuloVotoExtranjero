'use strict';
// last
define(['app'], function (app) {

    app.register.controller('admAdministrarParametrosController', ['$scope', '$http', 'ajaxFactory', 'globalFactory', 'cookiesFactory', 'dateFactory','alertsFactory', function ($scope, $http, ajaxFactory, globalFactory, cookiesFactory, dateFactory, alertsFactory) {

        var ng = $scope;
		
		ng.esReset = false;
		ng.edTimePicker = true;
		
		ng.directivaLista = false;
		ng.isValid = true;
        ng.direccion = true;
       
		
		ng.onlyNumbers = /^[0-9]*$/; 
		
		ng.mensajes = APP.DATA.MENSAJES;
		ng.fecTemporal = new Date();
		
        ng.formatearFecha = function (fecha) {
            var f = fecha.split(' ');
            var format = f[0].split('/');
            return format;
        };

        ng.formatearHora = function (fecha) {
            var hora = fecha.split(' ');
            return hora[1]+" "+hora[2];
        };

        ng.forzarFecha = function (time) {
            return dateFactory.convertirDateTime(time, 'DD/MM/YYYY');
        };

        ng.forzarHora = function (time) {
            return dateFactory.convertirDateTime(time, 'hh:mm');
        };
		
		ng.isValidDate= function(d) {
		  if ( Object.prototype.toString.call(d) !== "[object Date]" )
			return false;
		  return true; // !isNaN(d.getTime());
		};
		
        ng.mostrarSuccess = function () {
            alertsFactory.alerta({
                tipo: 'success',
                mensaje:ng.mensajes.NOT004, //'Se guardaron los cambios correctamente.',
                oculto: false
            });
        };
		
		ng.criticalError = function () {
            alertsFactory.alerta({
                tipo: 'error',
                mensaje: ng.mensajes.SYS004,
                oculto: false
            });
        };
		
		var deshabilitarBotones =  function(secuencia){
			// de acuerdo al parametro deshabilitamos los botones
			switch (secuencia) {
				case 0:
					ng.deshabilitarRangoFechas = ng.deshabilitarBotonFechaVencimiento = ng.deshabilitarBotonCantidadMaximaSolicitudes = ng.deshabilitarBotonTamanoMaximoJPG = ng.deshabilitarBotonTamanoMaximoBMP = ng.deshabilitarBotonChkVideoInstructivo = true;
					break;
				case 1 :
					ng.deshabilitarRangoFechas = true;
					break;
				case 2 :
					ng.deshabilitarRangoFechas = true;
					break;
				case 3 :
					ng.deshabilitarBotonFechaVencimiento = true;
					break;
				case 4 : 
					ng.deshabilitarBotonCantidadMaximaSolicitudes = true;
					break;
				case 5 : 
					ng.deshabilitarBotonTamanoMaximoJPG = true;
					break;
				case 6 : 
					ng.deshabilitarBotonTamanoMaximoBMP  = true;
					break;
				case 7 : 
					ng.deshabilitarBotonChkVideoInstructivo = true;
					break;
			}
			
		};
		
        ng.listarParametros = function () {
            var parametros = { idSubsistema: 3, flagActivo: 'S' }
            ajaxFactory.consultar('admAdministrarParametros.aspx/ObtenerParametros', parametros, function (data) {
                ng.safeApply(function () {
					if (data) {
						if (data.success) {
							
							ng.arregloParametros = data.lista;
						   
							var fechaDesde = ng.formatearFecha(ng.arregloParametros[0].valor);
							ng.modFecIni = new Date(fechaDesde[2], (fechaDesde[1] - 1), fechaDesde[0]);
													
							ng.modHorIni = ng.formatearHora(ng.arregloParametros[0].valor);

							//Copia
							ng.modeloFechaRecepcionDesdeCaptura = angular.copy(ng.modFecIni);
							ng.horaFechaRecepcionDesdeCaptura   = angular.copy(ng.modHorIni);
							
							var fechaHasta = ng.formatearFecha(ng.arregloParametros[1].valor);
							ng.modFecFin = new Date(fechaHasta[2], (fechaHasta[1] - 1), fechaHasta[0]);
													
							ng.modHorFin = ng.formatearHora(ng.arregloParametros[1].valor);

							//Copia
							ng.modeloFechaRecepcionHastaCaptura = angular.copy(ng.modFecFin);
							ng.horaFechaRecepcionHastaCaptura   = angular.copy(ng.modHorFin);
							
												
							var fechaVencimiento = ng.formatearFecha(ng.arregloParametros[2].valor);
							ng.modeloFechaVencimiento = new Date(fechaVencimiento[2], (fechaVencimiento[1] - 1), fechaVencimiento[0]);

							//Copia
							ng.modeloFechaVencimientoCaptura = angular.copy(ng.modeloFechaVencimiento);  
							
							var numMaxSolicitudes = ng.arregloParametros[3].valor; // numero de solicitudes
							ng.modeloCantidadMaximaSolicitudes = numMaxSolicitudes;

							//Copia
							ng.modeloCantidadMaximaSolicitudesCaptura = angular.copy(ng.modeloCantidadMaximaSolicitudes);  
							
							var tamanoMaximoJPG = ng.arregloParametros[4].valor; // tamano JPG
							ng.modeloTamanoMaximoJPG = tamanoMaximoJPG;

							//Copia
							ng.modeloTamanoMaximoJPGCaptura = angular.copy(ng.modeloTamanoMaximoJPG); 
							
							var tamanoMaximoBMP = ng.arregloParametros[5].valor; // tamano BMP
							ng.modeloTamanoMaximoBMP = tamanoMaximoBMP;

							//Copia
							ng.modeloTamanoMaximoBMPCaptura = angular.copy(ng.modeloTamanoMaximoBMP);  
							
							var chkVideoInstructivo = ng.arregloParametros[6].valor; // visualizar video instructivo
							ng.modeloChkVideoInstructivo = chkVideoInstructivo;
							
							//Copia
							ng.modeloChkVideoInstructivoCaptura = angular.copy(ng.modeloChkVideoInstructivo);  
							
							//ng.directivaLista = true;
						} else {

							ng.criticalError();

						}
					} else {
						ng.criticalError();

					}
                });
            }, function () {
            }, function () {

            });

        }

        ng.guardarParametros = function (lista,secuencia) {

            var parametros = { parametros: lista }
            globalFactory.preload(true, '#formParametros');
            ajaxFactory.consultar('admAdministrarParametros.aspx/GuardarParametros', parametros, function (data) {
                globalFactory.preload(false, '#formParametros');
                ng.safeApply(function () {
				
                if (data) {
						if (data.success) {
							ng.mostrarSuccess();

							switch (secuencia) {
								case 0:
									ng.modeloFechaRecepcionDesdeCaptura = angular.copy(ng.modFecIni);
									ng.horaFechaRecepcionDesdeCaptura 	= angular.copy(ng.modHorIni);
									ng.modeloFechaRecepcionHastaCaptura = angular.copy(ng.modFecFin);
									ng.horaFechaRecepcionHastaCaptura 	= angular.copy(ng.modHorFin);
									ng.modeloFechaVencimientoCaptura	= angular.copy(ng.modeloFechaVencimiento);
									ng.modeloCantidadMaximaSolicitudesCaptura = angular.copy(ng.modeloCantidadMaximaSolicitudes);
									ng.modeloTamanoMaximoJPGCaptura = angular.copy(ng.modeloTamanoMaximoJPG);
									ng.modeloTamanoMaximoBMPCaptura = angular.copy(ng.modeloTamanoMaximoBMP);
									ng.modeloChkVideoInstructivoCaptura = angular.copy(ng.modeloChkVideoInstructivo);
									break;
								case 1 :
									ng.modeloFechaRecepcionDesdeCaptura = angular.copy(ng.modFecIni);
									ng.horaFechaRecepcionDesdeCaptura = angular.copy(ng.modHorIni);
									break;
								case 2 :
									ng.modeloFechaRecepcionDesdeCaptura = angular.copy(ng.modFecIni);
									ng.horaFechaRecepcionDesdeCaptura = angular.copy(ng.modHorIni);
									
									ng.modeloFechaRecepcionHastaCaptura = angular.copy(ng.modFecFin);
									ng.horaFechaRecepcionHastaCaptura = angular.copy(ng.modHorFin);
									break;
								case 3 :
									ng.modeloFechaVencimientoCaptura = angular.copy(ng.modeloFechaVencimiento);
									break;
								case 4 : // nro.solicitudes
									ng.modeloCantidadMaximaSolicitudesCaptura = angular.copy(ng.modeloCantidadMaximaSolicitudes);
									break;
								case 5 : // tamano JPG
									ng.modeloTamanoMaximoJPGCaptura = angular.copy(ng.modeloTamanoMaximoJPG);
									break;
								case 6 : // tamano BMP
									ng.modeloTamanoMaximoBMPCaptura = angular.copy(ng.modeloTamanoMaximoBMP);
									break;
								case 7 : // visualizar video
									ng.modeloChkVideoInstructivoCaptura = angular.copy(ng.modeloChkVideoInstructivo);
									break;
							}    
							deshabilitarBotones(secuencia);
							ng.botonGuardarFechaRecepcion = habilitarBotonFechaRecepcion();
							ng.botonGuardarGeneral = habilitarBotonGeneral();
						} else {
							ng.criticalError();
						}
					} else {
						ng.criticalError();
					}
                });
            }, function () {
            }, function () {
            });
        }

        var habilitarBotonFechaRecepcion = function () {
            var bool = false;
            if (angular.equals(ng.forzarFecha(ng.modFecIni), ng.forzarFecha(ng.modeloFechaRecepcionDesdeCaptura)) && angular.equals(ng.modHorIni, ng.horaFechaRecepcionDesdeCaptura) && 
                angular.equals(ng.forzarFecha(ng.modFecFin), ng.forzarFecha(ng.modeloFechaRecepcionHastaCaptura)) && angular.equals(ng.modHorFin, ng.horaFechaRecepcionHastaCaptura)) {
                bool = true;
            }
            return bool;
        };

        var habilitarBotonGeneral = function () {
            var boolFR = ng.isValid || habilitarBotonFechaRecepcion();
            var boolE = ng.deshabilitarBotonCantidadMaximaSolicitudes;
            var boolTMI = ng.deshabilitarBotonTamanoMaximoJPG || ng.deshabilitarBotonTamanoMaximoJPG;
            var boolVideo = ng.deshabilitarBotonChkVideoInstructivo;
            return boolFR && boolE && boolTMI && boolVideo;
        };

        ng.botonGuardarFechaRecepcion = true;
        ng.botonGuardarGeneral = true;

        $scope.$watch('modFecIni', function (newVal, oldVal) {
            ng.deshabilitarRangoFechas = ng.isValid || (angular.equals(ng.forzarFecha(ng.modFecIni), ng.forzarFecha(ng.modeloFechaRecepcionDesdeCaptura)));
            ng.botonGuardarFechaRecepcion = habilitarBotonFechaRecepcion();
            ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
        $scope.$watch('modHorIni', function (newVal, oldVal) {
            ng.deshabilitarRangoFechas = ng.isValid || (angular.equals(ng.forzarHora(ng.modHorIni), ng.forzarHora(ng.horaFechaRecepcionDesdeCaptura)));
            ng.botonGuardarFechaRecepcion = habilitarBotonFechaRecepcion();
            ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
        $scope.$watch('modFecFin', function (newVal, oldVal) {
            ng.deshabilitarRangoFechas = ng.isValid || (angular.equals(ng.forzarFecha(ng.modFecFin), ng.forzarFecha(ng.modeloFechaRecepcionHastaCaptura)));
            ng.botonGuardarFechaRecepcion = habilitarBotonFechaRecepcion();
            ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
        $scope.$watch('modHorFin', function (newVal, oldVal) {
            ng.deshabilitarRangoFechas = ng.isValid || (angular.equals(ng.modHorFin, ng.horaFechaRecepcionHastaCaptura));
            ng.botonGuardarFechaRecepcion = habilitarBotonFechaRecepcion();
            ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
        $scope.$watch('modeloFechaVencimiento', function (newVal, oldVal) {
            ng.deshabilitarBotonFechaVencimiento = !(ng.isValidDate(ng.modeloFechaVencimiento)) || angular.equals(ng.forzarFecha(ng.modeloFechaVencimiento), ng.forzarFecha(ng.modeloFechaVencimientoCaptura));
            ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
        
        $scope.$watch('modeloCantidadMaximaSolicitudes', function (newVal, oldVal) {
			if(typeof ng.modeloCantidadMaximaSolicitudes!='undefined' && ng.modeloCantidadMaximaSolicitudes>0){
				ng.deshabilitarBotonCantidadMaximaSolicitudes = angular.equals(ng.modeloCantidadMaximaSolicitudes, ng.modeloCantidadMaximaSolicitudesCaptura);
			} else { ng.deshabilitarBotonCantidadMaximaSolicitudes = true; }
			ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
        $scope.$watch('modeloTamanoMaximoJPG', function (newVal, oldVal) {
			if(typeof ng.modeloTamanoMaximoJPG!='undefined' && ng.modeloTamanoMaximoJPG>0){
            ng.deshabilitarBotonTamanoMaximoJPG = angular.equals(ng.modeloTamanoMaximoJPG, ng.modeloTamanoMaximoJPGCaptura);
			} else { ng.deshabilitarBotonTamanoMaximoJPG = true; }
			ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
        $scope.$watch('modeloTamanoMaximoBMP', function (newVal, oldVal) {
			if(typeof ng.modeloTamanoMaximoBMP!='undefined' && ng.modeloTamanoMaximoBMP>0){
				ng.deshabilitarBotonTamanoMaximoBMP = angular.equals(ng.modeloTamanoMaximoBMP, ng.modeloTamanoMaximoBMPCaptura);
			} else { ng.deshabilitarBotonTamanoMaximoBMP = true; }
			ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
		$scope.$watch('modeloChkVideoInstructivo', function (newVal, oldVal) {
		    ng.deshabilitarBotonChkVideoInstructivo = angular.equals(ng.modeloChkVideoInstructivo, ng.modeloChkVideoInstructivoCaptura);
		    ng.botonGuardarGeneral = habilitarBotonGeneral();
        }, true);
		
		
        //Metodos de guardado

        var arreglo = [];
		
		ng.guardarRangoFechas = function(){
			if(ng.isValid==false && !habilitarBotonFechaRecepcion()){
				arreglo[0] = ng.arregloParametros[0];
				arreglo[0].valor = ng.forzarFecha(ng.modFecIni) + " " + ng.modHorIni;

				ng.guardarParametros(arreglo,1);
				
				arreglo[0] = ng.arregloParametros[1];
				arreglo[0].valor = ng.forzarFecha(ng.modFecFin) + " " + ng.modHorFin;

				ng.guardarParametros(arreglo,2);
			} else { console.log('restringido');}
		}
		
        ng.guardarFechaVencimiento = function () {
			if(ng.isValidDate(ng.modeloFechaVencimiento)){
				arreglo[0] = ng.arregloParametros[2];
				arreglo[0].valor = ng.forzarFecha(ng.modeloFechaVencimiento);

				ng.guardarParametros(arreglo,3);
			} else { console.log('restringido');}
        }
		
		ng.guardarCantidadMaximaSolicitudes = function (frmParametros) {
			if(frmParametros.$valid ){
            arreglo[0] = ng.arregloParametros[3];
            arreglo[0].valor = ng.modeloCantidadMaximaSolicitudes;

            ng.guardarParametros(arreglo,4);
			}else{console.log('restringido');}
        }
		
		ng.guardarMaximoTamanoImagenJPG = function (frmParametros) {
            if(frmParametros.$valid){
			arreglo[0] = ng.arregloParametros[4];
            arreglo[0].valor = ng.modeloTamanoMaximoJPG;

            ng.guardarParametros(arreglo,5);
			}else{console.log('restringido');}
        }
		
		ng.guardarMaximoTamanoImagenBMP = function (frmParametros) {
			if(frmParametros.$valid){
            arreglo[0] = ng.arregloParametros[5];
            arreglo[0].valor = ng.modeloTamanoMaximoBMP;

            ng.guardarParametros(arreglo,6);
			}else{console.log('restringido');}
        }
		
		ng.guardarChkVideoInstructivo = function (frmParametros) {
			if(frmParametros.$dirty){
				arreglo[0] = ng.arregloParametros[6];
				arreglo[0].valor = ng.modeloChkVideoInstructivo;

				ng.guardarParametros(arreglo,7);
			}
        }
		
        ng.guardarTodo = function (frmParametros) {
			console.log('frmParametros.$dirty '+frmParametros.$dirty);
			console.log('frmParametros.$valid '+frmParametros.$valid);
			console.log('ng.isValid '+ng.isValid);
			if(frmParametros.$dirty && frmParametros.$valid && ng.isValidDate(ng.modeloFechaVencimiento) && ng.modeloTamanoMaximoJPG>0 && ng.modeloTamanoMaximoBMP>0 && !habilitarBotonGeneral()){
				ng.arregloParametros[0].valor = ng.forzarFecha(ng.modFecIni) + " " + ng.modHorIni;
				ng.arregloParametros[1].valor = ng.forzarFecha(ng.modFecFin) + " " + ng.modHorFin;
				ng.arregloParametros[2].valor = ng.forzarFecha(ng.modeloFechaVencimiento);
				ng.arregloParametros[3].valor = ng.modeloCantidadMaximaSolicitudes; // estacion
				ng.arregloParametros[4].valor = ng.modeloTamanoMaximoJPG;
				ng.arregloParametros[5].valor = ng.modeloTamanoMaximoBMP;
				ng.arregloParametros[6].valor = ng.modeloChkVideoInstructivo;
				
				ng.guardarParametros(ng.arregloParametros,0);
			}else{
				console.log('restringido.');
			}
        }
		
		
		ng.inicio = function(){
			ng.listarParametros();
		}
		ng.inicio();

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
        

    }]);
});
