'use strict';

define(['modules/directives'], function (module) {

    module.directive('uiDatepicker', ['$timeout', function ($timeout) {

        var getUTC = function (now) {
            var nowUtc = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
            return nowUtc;
        };
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                var dateFormatList = ['d', 'm', 'Y'];

                var format = $(element).attr('data-date-format') || $(element).attr('date-format');

                var readOnly = $(element).attr('data-date-read-only') || $(element).attr('date-read-only') || false;

                var formatSeparators = [];

                var isValidFormat = true;
				
                for (var i = 0; i < format.length; i++) {
                    var character = format[i];
                    for (var j = 0; j < dateFormatList.length; j++) {
                        if (format[i] === dateFormatList[j]) {
                            isValidFormat = true;
                            break;
                        } else {
                            isValidFormat = false;
                        }
                    }
                    if (!isValidFormat) {
                        formatSeparators.push(character);
                    }
                }

                function isUndefined(value) { return typeof value == 'undefined'; }
                function isEmpty(value) {
                    return isUndefined(value) || value === '' || value === null || value !== value;
                }

                var optionsZebra = {
                    format: format,
                    days: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'],
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    lang_clear_date: 'Borrar',
                    show_select_today: 'Hoy día',
                    readonly_element: (typeof readOnly !== 'undefined' && readOnly === 'true') ? true : false,
                    show_clear_date: false,
                    inside: false,
                    header_navigation: ['&#171;', '&#187;'],
                    onSelect: function (a, b, c, d) {
                        scope.$apply(function () {
                            ctrl.$setViewValue(c);
                        });
                    }
                };



                $(element).Zebra_DatePicker(optionsZebra);


                scope.$watch(attrs.zdpDirection, function (value_direction) {
                    var datepicker = $(element).data('Zebra_DatePicker');
                    if (typeof value_direction !== 'undefined') {
                        if (parseInt(value_direction, 10) === 0) {
                            datepicker.update({ direction: [false, false] });
                        } else {
                            datepicker.update({
                                direction: value_direction
                            });
                        }
                    }
                });

                scope.$watch(attrs.zdpStartDate, function (value) {
                    var datepicker = $(element).data('Zebra_DatePicker');
                    if (typeof value !== 'undefined') {

                        datepicker.update({
                            start_date: value
                        });
                    }
                });

                var validatorFormatters = function (value) {
                    if (!isEmpty(value)) {
                        value = getUTC(value);
                        var datepicker = $(element).data('Zebra_DatePicker');
                        try {
                            var getFormat = datepicker.format(value);
                            if (getFormat.indexOf('NaN') !== -1){
                                console.error('Invalid Date: ' + value);
                                ctrl.$setValidity('uidate', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('uidate', true);
                                return getFormat;
                            }
                        } catch (ex) {
                            console.error('Invalid Date: ' + value);
                            ctrl.$setValidity('uidate', false);
                            return undefined;
                        }
                    } else {
                        ctrl.$setValidity('uidate', true);
                        return undefined;
                    }
                };

                var validatorParsers = function (value) {

                    if (isEmpty(value)) {

                        ctrl.$setValidity('uidate', true);
                        return undefined;

                    } else {

                        var datepicker = $(element).data('Zebra_DatePicker');
                        try {
                            var getFormat = datepicker.format(value);
                            if (getFormat.indexOf('NaN') !== -1) {
                                console.error('Invalid Date: ' + value);
                                ctrl.$setValidity('uidate', false);
                                return undefined;
                            } else {
                                ctrl.$setValidity('uidate', true);
                                return value;
                            }
                        } catch (ex) {
                            //si se escribe directamente en el input y no se logra obtener el format
                            //verificarmos si es una fecha válida lo que se escribe validando contra el formato establecido.
                            if (datepicker.check_date(value)) {
                                ctrl.$setValidity('uidate', true);

                                var blockList = [];
                                var isBlock = false;
                                var block = '';
                                for (var i = 0; i < value.length; i++) {

                                    for (var j = 0; j < formatSeparators.length; j++) {
                                        if (value[i] === formatSeparators[j]) {
                                            isBlock = true;
                                            break;
                                        } else {
                                            isBlock = false;
                                        }
                                    }

                                    if (isBlock) {
                                        blockList.push(block);
                                        block = '';
                                    } else {
                                        block = block + value[i];
                                        if (i == value.length - 1) {
                                            blockList.push(block);
                                        }
                                    }
                                }

                                var blockFormatList = [];
                                isBlock = false;
                                block = '';
                                for (var i = 0; i < format.length; i++) {
                                    for (var j = 0; j < formatSeparators.length; j++) {
                                        if (format[i] === formatSeparators[j]) {
                                            isBlock = true;
                                            break;
                                        } else {
                                            isBlock = false;
                                        }
                                    }

                                    if (isBlock) {
                                        blockFormatList.push(block);
                                        block = '';
                                    } else {
                                        block = block + format[i];
                                        if (i == format.length - 1) {
                                            blockFormatList.push(block);
                                        }
                                    }
                                }

                                var newList = [];
                                for (var c = 0; c < blockList.length; c++) {
                                    var key = blockFormatList[c];
                                    var value = blockList[c];
                                    newList[key] = value;
                                }
                                value = new Date(newList['Y'], parseInt(newList['m'], 10) - 1, newList['d'], 0, 0, 0, 0);
                                if(datepicker.is_disabled(value)){
                                    console.error('Invalid Date: ' + value);
                                    ctrl.$setValidity('uidate', false);
                                    return undefined;
                                }else{
                                    return value;
                                }
                            } else {
                                console.error('Invalid Date: ' + value);
                                ctrl.$setValidity('uidate', false);
                                return undefined;
                            }
                        }

                    }

                };

                //Controlador - Vista
                ctrl.$formatters.push(validatorFormatters);
                //Vista - Controlador
                ctrl.$parsers.push(validatorParsers);

            }

        };


    }])

});
