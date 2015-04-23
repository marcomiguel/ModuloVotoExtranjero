'use strict';

define(['modules/directives'], function (module) {

    module.constant('mensaje', {

        "validaciones": {
            "maxlength": function (longitud) {
                return "Solo esta permitido un maximo de " + longitud + " caracteres";
            },
            "minlength": function (longitud) {
                return "Solo esta permitido un minimo de " + longitud + " caracteres";
            },
            "required": "Este campo es requerido"
        }
    });

    module.constant('expresion', {

        "letras": /^[a-z]*$/,
        "entero": /^\-?\d+$/,
        "correo": /^[A-Za-z0-9_-]{1}[[A-Za-z0-9._-]{2,62}[A-Za-z0-9_-]{1}]?@[A-Za-z0-9.-]{1,191}\.[A-Za-z]{2,63}$/,
        "alfanumerico": /^[0-9a-zA-Z\s\'\-\/\&\(\)\.-]*$/,
        "texto": /^[a-zA-Z0-9\s\'\-\.\/\&-]*$/,
        "numeros": /^[(]{0,1}?[0-9]{3}[)]{0,1}?[0-9]{3}[-]{0,1}?[0-9]{4}$/,
        "codigo_zip": /^\d{5}(?:[-]{0,1}\d{4})?$/,
        "cedula": /^[0-9]{9}$/,

    });

    module.constant('validacionesConfig', {
        INTEGER_REGEXP: /^\-?\d*$/,
        FLOAT_REGEXP: /^\-?\d+((\.|\,)\d+)?$/,
        NUMERO_CEDULA_REGEXP:/^[0-9]{9}$/,
        EMAIL_REGEXP: /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/,
        NATURAL_REGEXP: /^\s*\d+\s*$/,
    });

    module.directive('validar', ['expresion', 'mensaje', function (expresion, mensaje) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                mensaje: '@mensajeValidar'
            },
            link: function ($scope, $element, $attr, ctrl) {
                var flags = $attr.validarFlag || '';
                var regex = new RegExp(expresion[$attr.validar]);

                angular.element($element).on('keyup', function (ev) {

                    if ($.inArray(ev.keyCode, [40, 38, 9, 13, 27, 16]) === -1) {
                        var valid = regex.test(ctrl.$viewValue);
                        errorClass(valid);
                        ctrl.$setValidity('validacion', valid);
                        required();
                    }

                });

                var required = function () {
                    if (ctrl.$error.required) {
                        errorClass(false);
                        agregarMensaje(mensaje.validaciones.required);
                    } else {
                        length();
                    }
                }
                var length = function () {
                    if (ctrl.$error.maxlength) {
                        errorClass(false);
                        agregarMensaje(mensaje.validaciones.maxlength($attr.ngMaxlength));
                    } else {
                        if (ctrl.$error.minlength) {
                            errorClass(false);
                            agregarMensaje(mensaje.validaciones.minlength($attr.ngMinlength));
                        }
                    }
                }
                var errorClass = function (valid) {
                    if (valid) {
                        angular.element($element).css({
                            background: "#f9f9fa",
                            color: "#333",
                            borderColor: "#c9c9ca"
                        });
                        borrarMensaje();
                    } else {
                        angular.element($element).css({
                            background: "#f3e0e0",
                            color: "#933",
                            borderColor: "#933"
                        });
                        agregarMensaje($scope.mensaje);
                    }
                }
                var agregarMensaje = function (mensaje) {
                    var error = '<div style="color: #933" class="help-block">' +
                                    '<i class="icon-scytl-error"></i>' +
                                    mensaje +
                              '</div>';
                    angular.element($element).next().remove();
                    angular.element($element).after(error);

                }
                var borrarMensaje = function () {
                    angular.element($element).next().remove();
                }
            }
        };
    }]);

    module.directive('uiCedula', ['expresion', function (expresion) {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {

                    try{
                        if (viewValue.length === 0) {
                            ctrl.$setValidity('cedula', true);
                            return undefined;
                        } else {

                            if (viewValue == 0) {

                                ctrl.$setValidity('cedula', false);
                                return undefined;

                            } else {

                                if (expresion['cedula'].test(viewValue)) {
                                    ctrl.$setValidity('cedula', true);
                                    return viewValue;
                                } else {
                                    ctrl.$setValidity('cedula', false);
                                    return undefined;
                                }

                            }




                        }
                    }catch(ex){
                        // console.log(ex,'ex');
                    }

                    
                });
            }
        };
    }]);

    module.directive('uiCedulaZero',['validacionesConfig',function(config){
        return{
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                function isUndefined(value){return typeof value == 'undefined';}                
                function isEmpty(value) {
                    return isUndefined(value) || value === '' || value === null || value !== value;
                }

                var validator = function(value) {
                    if (isEmpty(value) || (config.NUMERO_CEDULA_REGEXP.test(value))) {
                        ctrl.$setValidity('uicedulazero', true);
                        return value;
                    } else {
                        ctrl.$setValidity('uicedulazero', false);
                        return undefined;
                    }
                };

                ctrl.$formatters.push(validator);
                ctrl.$parsers.push(validator);

            }
        };
    }]);

    module.directive('uiCedulaNoZero',['validacionesConfig',function(config){
        return{
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                function isUndefined(value){return typeof value == 'undefined';}                
                function isEmpty(value) {
                    return isUndefined(value) || value === '' || value === null || value !== value;
                }

                var validator = function(value) {
                    if (isEmpty(value) || (config.NUMERO_CEDULA_REGEXP.test(value) && parseInt(value,10) !== 0)) {
                        ctrl.$setValidity('uicedulanozero', true);
                        return value;
                    } else {
                        ctrl.$setValidity('uicedulanozero', false);
                        return undefined;
                    }
                };

                ctrl.$formatters.push(validator);
                ctrl.$parsers.push(validator);

            }
        };
    }]);

});
