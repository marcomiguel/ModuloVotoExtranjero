'use strict';

define(['modules/directives'], function (module) {



    module.directive('uiAlerta', function () {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                opciones: '='
            },
            controller: function ($scope, $timeout) {
                $scope.closeAlert = function () {
                    $scope.mostrarAlerta = false;
                    $scope.opciones.mostrar = false;
                    $scope.opciones.ocultar.auto = false;
                    $scope.opciones.ocultar.tiempo = 0;
                }
                $scope.timeAlert = function (object) {
                    var auto = object.ocultar.auto;
                    var time = object.ocultar.tiempo;
                    if (time == undefined) {
                        time = 5000;
                    }
                    if (auto == true) {
                        $timeout($scope.closeAlert, time);
                    }
                }
                $scope.closeButton = function (click) {
                    if (click == true) {
                        $scope.mostrarClose = true;
                    } else {
                        $scope.mostrarClose = false;
                    }
                }
                $scope.showAlert = function (value) {
                    $scope.mostrarAlerta = value;
                    if ($scope.opciones.mostrar) {
                        $scope.opciones.mostrar = value;
                    }
                }
                $scope.typeAlert = function (type) {
                    switch (type) {
                        case 'success':
                            return 'alert-success';
                            break;
                        case 'info':
                            return 'alert-info';
                            break;
                        case 'warning':
                            return 'alert-warning';
                            break;
                        case 'error':
                            return 'alert-error';
                            break;
                    }
                }
            },
            link: function ($scope, element, attrs, tabsCtrl) {
                if ($scope.opciones) {

                    $scope.mensaje = $scope.opciones.mensaje;

                    $scope.$watch('opciones.tipo', function () {
                        $scope.type = $scope.opciones.tipo;
                    });

                    $scope.$watch('opciones.mensaje', function () {
                        $scope.nuevoMensaje = $scope.opciones.mensaje;
                    });

                    $scope.mostrarAlerta = true;
                    $scope.mostrarClose = true;

                    if ($scope.opciones.ocultar) {

                        $scope.timeAlert($scope.opciones);

                        $scope.$watch('opciones.ocultar.auto', function () {
                            $scope.timeAlert($scope.opciones);
                        });

                        $scope.$watch('opciones.ocultar.tiempo', function () {
                            $scope.timeAlert($scope.opciones);
                        });

                        $scope.$watch('opciones.ocultar.click', function () {
                            $scope.closeButton($scope.opciones.ocultar.click);
                        })

                    }

                    $scope.$watch('opciones.mostrar', function () {
                        switch ($scope.opciones.mostrar) {
                            case true:
                                $scope.showAlert(true);
                                break;
                            case false:
                                $scope.showAlert(false);
                                break;
                        }
                    },true);
                }
            },
            template: '<div class="alert" data-ng-class="typeAlert(type)" data-ng-show="mostrarAlerta">' +
                      '  <i></i>' +
                      '  <p class="cell">{{nuevoMensaje}}</p>' +
                      '  <button class="close" type="button" data-ng-show="mostrarClose" data-ng-click="showAlert(false)">Cerrar</button>' +
                      '</div>'
        };
    })

});




