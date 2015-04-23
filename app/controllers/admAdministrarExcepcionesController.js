'use strict';
// cird version
define(['app'], function (app) {

    app.register.controller('admAdministrarExcepcionesController', ['$scope', '$http', 'ajaxFactory', 'globalFactory', 'globalConstant', 'cookiesFactory','alertsFactory', function ($scope, $http, ajaxFactory, globalFactory, globalConstant, cookiesFactory,alertsFactory) {

        var ng = $scope;

        ng.global = globalConstant;
		ng.mensajes = APP.DATA.MENSAJES;
		ng.flag = true;
		
		ng.mostarSuccessExcepciones = function () {
            alertsFactory.alerta({
                tipo: 'success',
                mensaje:ng.mensajes.NOT004, 
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
		
        ng.listaExcepcionesNombresTabla ={
            theads:[
                   { nombre: 'Código' },
                   { nombre: 'Descripción' },
                   { nombre: 'Habilitado' }
                  ]
        }

        ng.arregloExcepciones = [];
        ng.seleccionExcepciones = [];

        ng.deshabilitarBotonGuardar = true;
        ng.mostrarBotonGuardar = false;

        ng.listarExcepciones = function () {         
                var parametros = {}
                ajaxFactory.consultar('admAdministrarExcepciones.aspx/ListarExcepciones', parametros, function (data) {
                  ng.safeApply(function () {
                    if (data) {
                        if (data.success) {
                            ng.arregloExcepciones = data.lista;
                            ng.excepcionesCaptura = angular.copy(ng.arregloExcepciones);
                            globalFactory.preload(false);
                            ng.mostrarBotonGuardar = true;
							
                        } else {
							
                            ng.criticalError();
                            globalFactory.preload(false);
                            ng.mostrarBotonGuardar = false;
                            ng.deshabilitarBotonGuardar = true;
                        }
                    } else {
                        ng.criticalError();
                        globalFactory.preload(false);
                        ng.mostrarBotonGuardar = false;
                        ng.deshabilitarBotonGuardar = true;
                    }
                  });
                }, function () {
                }, function () {
                    globalFactory.preload(true);
                });

        }
        ng.listarExcepciones();
		
		ng.guardarExcepciones = function (frmExcepciones) {
			if (frmExcepciones.$dirty){
				var parametros = {arregloExcepciones: ng.arregloExcepciones }
				ajaxFactory.consultar('admAdministrarExcepciones.aspx/GuardarExcepciones', parametros, function (data) {
					globalFactory.preload(false);
					ng.excepcionesCaptura = angular.copy(ng.arregloExcepciones);
					ng.deshabilitarBotonGuardar = true;
					
					
						if (data.success) {
							ng.mostarSuccessExcepciones();
							globalFactory.preload(false);
							ng.flag=false;
							ng.listarExcepciones();
						} else {
							ng.criticalError();
							globalFactory.preload(false);
						}
					
				}, function () {
				}, function () {
					globalFactory.preload(true);
				});
			} else {
				console.log('No permitido.');
			}
			
		}
		
        $scope.$watch('arregloExcepciones', function (newVal, oldVal) {
			ng.comparar = angular.equals(ng.arregloExcepciones, ng.excepcionesCaptura);
			
			if (ng.comparar) {
				ng.deshabilitarBotonGuardar = true;
				ng.flag=false;
			} else {
				ng.deshabilitarBotonGuardar = false;
				ng.flag=true;
			}
			
        },ng.flag);
		
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
