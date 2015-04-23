'use strict';

define(['modules/directives'], function (module) {

    module.directive('uiTimepicker', function ($compile) {
        return {
            restrict: 'EA',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {

                var getTimePopover = function () {
                    var hour = $(getId()).find('.data .dataHour').text();
                    var minute = $(getId()).find('.data .dataMinute').text();
                    var meridian = $(getId()).find('.data .dataAM').text();
                    scope.$apply(function () {
                        ctrl.$setViewValue(hour + ':' + minute + ' ' + meridian);
                        ctrl.$render();
                    });
                };

                var deletePopover = function () {
                    //$('div.tableTimePicker').remove();
                    $(element).parent().find('div.tableTimePicker').remove();
                };

                var updateDataPopover = function (value) {
                    var hour = value;
                    var hourSplit = hour.substring(0, 2);
                    var minuteSplit = hour.substring(3, 5);
                    var meridianSplit = hour.substring(6, hour.length);
                    $(getId()).find('.data .dataHour').text(hourSplit);
                    $(getId()).find('.data .dataMinute').text(minuteSplit);
                    $(getId()).find('.data .dataAM').text(meridianSplit);
                };

                // formato de hora HH:MM AM|PM

                var validHour = function (hour) {
                    var isValid = false;
                    if (typeof hour !== 'undefined' && hour.length === 8) {
                        var hourSplit = hour.substring(0, 2);
                        var minuteSplit = hour.substring(3, 5);
                        var meridianSplit = hour.substring(6, hour.length);

                        if (meridianSplit === 'AM' || meridianSplit === 'PM') {

                            var hourInt = parseInt(hourSplit, 10);

                            if (!isNaN(hourInt)) {

                                if (hourInt > 0 && hourInt <= 12) {

                                    var minuteInt = parseInt(minuteSplit, 10);

                                    if (minuteInt >= 0 && minuteInt <= 59) {
                                        isValid = true;
                                    } else {
                                        isValid = false;
                                    }

                                } else {
                                    isValid = false;
                                }

                            } else {
                                isValid = false;
                            }

                        } else {
                            isValid = false;
                        }


                    } else {
                        isValid = false;
                    }
                    return isValid;
                };



                var myId = scope.$id + new Date().getTime();

                var getId = function () {
                    return '#' + myId;
                };

                function isUndefined(value) { return typeof value == 'undefined'; }

                function isEmpty(value) {
                    return isUndefined(value) || value === '' || value === null || value !== value;
                }


                attrs.$observe('disabled', function (newValue, oldValue) {
                    if (typeof newValue !== 'undefined') {
                        if (newValue) {
                            $(getId()).find('.back-gray').addClass('openTimerPickerBackup');
                            $(getId()).find('.back-gray').removeClass('back-gray');
                        } else {
                            $(getId()).find('.openTimerPickerBackup').addClass('back-gray');
                            $(getId()).find('.openTimerPickerBackup').removeClass('openTimerPickerBackup');
                        }
                    }
                });

                var data = '';
                data += '<div id="' + myId + '" class="control-timepicker" style="position:relative;">';
                data += '<span class="back-gray"><i class="icon-time"></i></span>';
                data += '</div>';

                $(data).insertBefore($(element));

                $(element).prependTo($(getId()));


                var validatorFormatters = function (value) {
                    // console.log('controlador -> vista:', value);

                    if (isEmpty(value)) {
                        ctrl.$setValidity('uitime', true);
                        return undefined;
                    } else {
                        if (validHour(value)) {
                            ctrl.$setValidity('uitime', true);
                            return value;
                        } else {
                            ctrl.$setValidity('uitime', false);
                            return undefined;
                        }
                    }
                };

                var validatorParsers = function (value) {
                    // console.log('vista -> controlador:', value);
                    if (isEmpty(value)) {
                        ctrl.$setValidity('uitime', true);
                        return undefined;
                    } else {
                        if (validHour(value)) {
                            updateDataPopover(value);
                            ctrl.$setValidity('uitime', true);
                            return value;
                        } else {
                            deletePopover();
                            ctrl.$setValidity('uitime', false);
                            return undefined;
                        }
                    }
                };


                //Controlador - Vista
                ctrl.$formatters.push(validatorFormatters);
                //Vista - Controlador
                ctrl.$parsers.push(validatorParsers);



                var openPopover = function () {

                    var hour = ctrl.$viewValue;

                    if (validHour(hour)) {
                        var hourSplit = hour.substring(0, 2);
                        var minuteSplit = hour.substring(3, 5);
                        var meridianSplit = hour.substring(6, hour.length);

                        var hourData = (parseInt(hourSplit, 10) < 10) ? '0' + parseInt(hourSplit, 10) : parseInt(hourSplit, 10);
                        var minuteData = (parseInt(minuteSplit, 10) < 10) ? '0' + parseInt(minuteSplit, 10) : parseInt(minuteSplit, 10);
                    } else {
                        var hourData = '12';
                        var minuteData = '00';
                        var meridianSplit = 'AM';
                    }

                    deletePopover();

                    $('.tableTimePicker').remove();

                    var data = '';
                    data += '<div class="tableTimePicker"><table>';
                    data += '<tbody>';

                    data += '<tr class="plusTop">';
                    data += '<td><button class="btn plusHour" type="button"><i class="icon-chevron-up"></i></button></td>';
                    data += '<td><button class="btn plusMinute" type="button"><i class="icon-chevron-up"></i></button></td>';
                    data += '<td><button class="btn plusAM" type="button"><i class="icon-chevron-up"></i></button></td>';
                    data += '</tr>';

                    data += '<tr class="data">';
                    data += '<td class="dataHour">' + hourData + '</td>';
                    data += '<td class="dataMinute">' + minuteData + '</td>';
                    data += '<td class="dataAM">' + meridianSplit + '</td>';
                    data += '</tr>';

                    data += '<tr class="plusBottom">';
                    data += '<td><button class="btn minusHour" type="button"><i class="icon-chevron-down"></i></button></td>';
                    data += '<td><button class="btn minusMinute" type="button"><i class="icon-chevron-down"></i></button></td>';
                    data += '<td><button class="btn minusAM" type="button"><i class="icon-chevron-down"></i></button></td>';
                    data += '</tr>';


                    data += '</tbody>';
                    data += '</table></div>';

                    $(data).insertBefore($(element));


                };

                $(element).on('click', function (e) {

                    e.stopPropagation();


                    openPopover();

                });

                $(document).on('click', '.tableTimePicker', function (e) {
                    e.stopPropagation();
                });

                $(document).on('click', function (e) {
                    deletePopover();
                });


                $(getId()).on('click', '.back-gray', function (e) {
                    e.stopPropagation();
                    deletePopover();
                    openPopover();
                });


                //events button popover timepicker
                $(getId()).on('click', '.plusAM', function (e) {

                    var $table = $(this).parent().parent().parent();
                    var AM = $($table).children('.data').children('.dataAM').text();
                    if (AM === 'AM') {
                        $($table).children('.data').children('.dataAM').text('PM');
                    } else {
                        $($table).children('.data').children('.dataAM').text('AM');
                    }
                    getTimePopover();
                });

                $(getId()).on('click', '.minusAM', function (e) {

                    var $table = $(this).parent().parent().parent();
                    var AM = $($table).children('.data').children('.dataAM').text();
                    if (AM === 'AM') {
                        $($table).children('.data').children('.dataAM').text('PM');
                    } else {
                        $($table).children('.data').children('.dataAM').text('AM');
                    }
                    getTimePopover();
                });

                $(getId()).on('click', '.plusMinute', function (e) {

                    var sum = 0;

                    var $table = $(this).parent().parent().parent();
                    //contenido de la celda
                    var minute = $($table).children('.data').children('.dataMinute').text();
                    //convertimos a entero
                    var minuteInt = parseInt(minute, 10);
                    //si por debajo lo ponen un valor que no es entero lo regresamos a 00
                    if (isNaN(minuteInt)) {
                        $($table).children('.data').children('.dataMinute').text('00');
                    } else {
                        if (minuteInt < 0) {
                            $($table).children('.data').children('.dataMinute').text('00');
                        } else {
                            if (minuteInt < 9) {
                                sum = minuteInt + 1;
                                $($table).children('.data').children('.dataMinute').text('0' + sum);
                            } else {
                                if (minuteInt <= 58) {
                                    sum = minuteInt + 1;
                                    $($table).children('.data').children('.dataMinute').text(sum);
                                } else {
                                    $($table).children('.data').children('.dataMinute').text('00');
                                }
                            }
                        }
                    }

                    getTimePopover();

                });



                $(getId()).on('click', '.minusMinute', function (e) {

                    var sum = 0;

                    var $table = $(this).parent().parent().parent();
                    //contenido de la celda
                    var minute = $($table).children('.data').children('.dataMinute').text();
                    //convertimos a entero
                    var minuteInt = parseInt(minute, 10);
                    //si por debajo lo ponen un valor que no es entero lo regresamos a 00
                    if (isNaN(minuteInt)) {
                        $($table).children('.data').children('.dataMinute').text('00');
                    } else {
                        if (minuteInt < 0) {
                            $($table).children('.data').children('.dataMinute').text('00');
                        } else {

                            if (minuteInt === 0) {
                                $($table).children('.data').children('.dataMinute').text('59');
                            } else {

                                if (minuteInt <= 59) {

                                    if (minuteInt <= 10) {
                                        sum = minuteInt - 1;
                                        $($table).children('.data').children('.dataMinute').text('0' + sum);
                                    } else {
                                        sum = minuteInt - 1;
                                        $($table).children('.data').children('.dataMinute').text(sum);
                                    }
                                } else {
                                    $($table).children('.data').children('.dataMinute').text('00');
                                }
                            }

                        }
                    }
                    getTimePopover();
                });



                $(getId()).on('click', '.plusHour', function (e) {

                    var sum = 0;

                    var $table = $(this).parent().parent().parent();
                    //contenido de la celda
                    var minute = $($table).children('.data').children('.dataHour').text();
                    //convertimos a entero
                    var minuteInt = parseInt(minute, 10);
                    //si por debajo lo ponen un valor que no es entero lo regresamos a 00
                    if (isNaN(minuteInt)) {
                        $($table).children('.data').children('.dataHour').text('01');
                    } else {
                        if (minuteInt < 0) {
                            $($table).children('.data').children('.dataHour').text('01');
                        } else {
                            if (minuteInt < 9) {
                                sum = minuteInt + 1;
                                $($table).children('.data').children('.dataHour').text('0' + sum);
                            } else {
                                if (minuteInt <= 11) {
                                    sum = minuteInt + 1;
                                    $($table).children('.data').children('.dataHour').text(sum);
                                } else {
                                    $($table).children('.data').children('.dataHour').text('01');
                                }
                            }
                        }
                    }
                    getTimePopover();
                });


                $(getId()).on('click', '.minusHour', function (e) {

                    var sum = 0;

                    var $table = $(this).parent().parent().parent();
                    //contenido de la celda
                    var minute = $($table).children('.data').children('.dataHour').text();
                    //convertimos a entero
                    var minuteInt = parseInt(minute, 10);
                    //si por debajo lo ponen un valor que no es entero lo regresamos a 00
                    if (isNaN(minuteInt)) {
                        $($table).children('.data').children('.dataHour').text('01');
                    } else {
                        if (minuteInt < 0) {
                            $($table).children('.data').children('.dataHour').text('01');
                        } else {

                            if (minuteInt <= 12) {

                                if (minuteInt === 1) {
                                    $($table).children('.data').children('.dataHour').text('12');
                                } else {
                                    if (minuteInt <= 10) {
                                        sum = minuteInt - 1;
                                        $($table).children('.data').children('.dataHour').text('0' + sum);
                                    } else {
                                        sum = minuteInt - 1;
                                        $($table).children('.data').children('.dataHour').text(sum);
                                    }
                                }
                            } else {
                                $($table).children('.data').children('.dataHour').text('01');
                            }

                        }
                    }
                    getTimePopover();
                });

            }

        };
    });

});