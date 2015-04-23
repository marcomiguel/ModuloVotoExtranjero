'use strict';

define(['modules/directives'], function (module) {

    module.directive('eventdate', ['$timeout', 'dateFactory', function ($timeout, dateFactory) {

        return {
            restrict: 'EA',
            replace: true,
            scope: {
                currentDate: "@edCurrentDate",
                labelStart: "@edStartLabel",
                labelEnd: "@edEndLabel",
                startModel: "=edStartModel",
                endModel: "=edEndModel",
                required: "=edRequired",
                validate: "=edValidate",
                timePicker: "=edTimePicker",
                labelTimeStart: "@edLabelTimeStart",
                labelTimeEnd: "@edLabelTimeEnd",
                startTimeModel: "=edStartTimeModel",
                endTimeModel: "=edEndTimeModel",
                formatTime: "@edFormatTime",
                localReset: "=edReset",

            },
            templateUrl: 'template/directives/ui/eventdate.html',
            controller: function ($scope, $element, $attrs) {
                // scope
                var ng = $scope;
                
                // local variables
                var fecha= new Date();
                var empty = "",
                lSetCurrent = angular.isUndefined(ng.currentDate) ? false: angular.fromJson(ng.currentDate),
                lTimePicker = angular.isUndefined(ng.timePicker) ? false : angular.fromJson(ng.timePicker),
                lFormatTime = angular.isUndefined(ng.formatTime) ? '24' : ng.formatTime;
                
                // local Functions
                
                var fnIncorrectFormat = function () {                         
                    fnSetMessage('MSG_FORMATO_INCORRECTO'); 
                },
                fnMayorStartDateEndDate = function () { 
                    fnSetMessage('MSG_FECHA_INICIO_MAYOR_FECHA_FIN');
                    ng.mensajeError = APP.DATA.MSG_FECHA_INICIO_MAYOR_FECHA_FIN;
                },
                fnMinorStartDateEndDate = function () {  
                    fnSetMessage('MSG_FECHA_FIN_MENOR_FECHA_INICIO'); 
                    ng.mensajeError = APP.DATA.MSG_FECHA_FIN_MENOR_FECHA_INICIO;
                },
                fnMissingStartDate = function () { 
                    fnSetMessage('MSG_FALTA_INGRESAR_FECHA_INICIO');
                    ng.mensajeError = APP.DATA.MSG_FALTA_INGRESAR_FECHA_INICIO; 
                },
                fnMissingEndDate = function () { 
                    fnSetMessage('MSG_FALTA_INGRESAR_FECHA_FIN');
                    ng.mensajeError = APP.DATA.MSG_FALTA_INGRESAR_FECHA_FIN;
                },
                fnMissingStartTime = function () { 
                    fnSetMessage('MSG_FALTA_INGRESAR_HORA_INICIO');
                    ng.mensajeError = APP.DATA.MSG_FALTA_INGRESAR_HORA_INICIO;
                },
                fnMissingEndTime = function () { 
                    fnSetMessage('MSG_FALTA_INGRESAR_HORA_FIN');
                    ng.mensajeError = APP.DATA.MSG_FALTA_INGRESAR_HORA_FIN;
                },
                fnMayorStartTimeEndTime = function () { 
                    fnSetMessage('MSG_HORA_INICIO_MAYOR_HORA_FIN');
                    ng.mensajeError = APP.DATA.MSG_HORA_INICIO_MAYOR_HORA_FIN;
                },
                fnMinorStartCurrentDate = function () { 
                    fnSetMessage('MSG_HORA_INICIO_MAYOR_HORA_FIN');
                    ng.mensajeError = APP.DATA.MENSAJES.FECHA_INICIO_MENOR_FECHA_ACTUAL;
                },                    
                fnSetMessage = function (msj) {
                    ng.typeMessage = msj;
                    ng.reset = true;
                    ng.validate = true;
                    ng.optional = true;
                },
                fnValidateEntryZero = function () {						
                    if (angular.isDate(ng.startModel) && angular.isDate(ng.endModel)) {
                        var dStart = parseInt(dateFactory.convertirDate(dateFactory.cambiarUTC(ng.startModel), 'YYYYMMDD')),
                        dEnd = parseInt(dateFactory.convertirDate(dateFactory.cambiarUTC(ng.endModel), 'YYYYMMDD')),
                        dTmp = parseInt(dateFactory.convertirDate((fecha), 'YYYYMMDD'));

                      //if (dTmp>dStart){                                
                      //    return false;
                      //}

                        var startDateTimeConHora = fnGetDateTime(ng.startModel, fnGetFormatDateTime(ng.startTimeModel)),
                        endDateTimeConHora = fecha;
                        if (endDateTimeConHora.getTime() > startDateTimeConHora._d.getTime())
                          return false;
                    }
                    return true;
                },
                fnValidateEntry = function(){
                    if(angular.isDate(ng.startModel) && angular.isDate(ng.endModel)){
                        var dStart = parseInt(dateFactory.convertirDate(dateFactory.cambiarUTC(ng.startModel),'YYYYMMDD')),
                        dEnd = parseInt(dateFactory.convertirDate(dateFactory.cambiarUTC(ng.endModel),'YYYYMMDD'));
                        if(dStart > dEnd)
                            return true;
                    }
                    return false;
                },                   
                fnSetValueStart = function (startValue) {
                    fnMissingStartDate();
                        // if (angular.equals(startValue, empty))
                        //     fnMissingStartDate();
                        // else
                        //     fnIncorrectFormat();
                    },
                    fnSetInitProcess = function () {
                        // Current Set date
                        if (lSetCurrent) {
                            var d = new Date();
                            ng.startModel = dateFactory.cambiarUTC(new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()));
                            ng.endModel = dateFactory.cambiarUTC(d);
                        } else {
                         if(!angular.isDate(ng.startModel))
                            ng.startModel = empty;
                        if(!angular.isDate(ng.endModel))
                            ng.endModel = empty;
                    }

                        // Initialization
                        if (angular.isUndefined(ng.validate))
                            ng.validate = false;

                        if (ng.localRequired) {
                            if (!lSetCurrent) {
                                ng.optional = false;
                                ng.validate = true;
                            }
                        }
                    },
                    fnGetErrorDateTime = function () {
                        if (angular.equals(ng.startModel, empty) && angular.equals(ng.endModel, empty) && angular.equals(ng.startTimeModel, empty) && angular.equals(ng.endTimeModel, empty)) {
                            ng.optional = false;
                            ng.validate = true;
                        } else {
                            if (angular.isUndefined(ng.startModel) || angular.equals(ng.startModel, empty))
                                fnMissingStartDate();
                            else if (angular.isUndefined(ng.endModel) || angular.equals(ng.endModel, empty))
                                fnMissingEndDate();
                            else if (angular.isUndefined(ng.startTimeModel) || angular.equals(ng.startTimeModel, empty))
                                fnMissingStartTime();
                            else if (angular.isUndefined(ng.endTimeModel) || angular.equals(ng.endTimeModel, empty))
                                fnMissingEndTime();
                            else {
                                ng.optional = false;
                                ng.validate = false;

                                var startDateTime = fnGetDateTime(ng.startModel, fnGetFormatDateTime(ng.startTimeModel)),
                                endDateTime = fnGetDateTime(ng.endModel, fnGetFormatDateTime(ng.endTimeModel));

                                if (endDateTime.diff(startDateTime) < 0)
                                    fnMayorStartTimeEndTime();
                            }
                        }
                        return false;
                    },
                    fnGetFormatDateTime = function (time) {
                        var stime = angular.equals(parseInt(lFormatTime), 12)
                        ? moment(time, 'h:mm a').format('H:mm') : time

                        return stime;
                    },
                    fnGetDateTime = function (pdate, ptime) {
                        var year = moment(pdate).year(),
                        month = moment(pdate).month(),
                        day = moment(pdate).date(),
                        arDatetime = [year, month, day].concat(ptime.split(':').concat([0, 0]));

                        angular.forEach(arDatetime, function (value, key) {
                            arDatetime[key] = parseInt(value);
                        });

                        return moment(arDatetime);
                    }

                // ng variables
                ng.typeMessage = 'MSG_FORMATO_INCORRECTO';
                ng.localRequired = angular.isUndefined(ng.required) ? false : angular.fromJson(ng.required);
                ng.localLabelStart = angular.isUndefined(ng.labelStart) ? 'Desde' : ng.labelStart;
                ng.localLabelEnd = angular.isUndefined(ng.labelEnd) ? 'Hasta' : ng.labelEnd;
                ng.localLabelTimeStart = angular.isUndefined(ng.labelTimeStart) ? 'Inicio' : ng.labelTimeStart;
                ng.localLabelTimeEnd = angular.isUndefined(ng.labelTimeEnd) ? 'Fin' : ng.labelTimeEnd;
                ng.optional = true;

                // ng Functions
                ng.fnGetStartDate = function () {
                    ng.validate = false;
                    ng.optional = false;
                    var startValue = $("#startInput").val();
                    var endValue = $("#endInput").val();
                    if (!angular.isUndefined(ng.endModel)) {
                        if (!angular.equals(ng.endModel, empty)) {
                            if (!angular.isUndefined(ng.startModel)) {
                                if(!fnValidateEntryZero()){
                                    fnMinorStartCurrentDate();
                                }else{
                                    if (fnValidateEntry()){
                                        fnMayorStartDateEndDate();
                                    } else {
                                        if (lTimePicker){
                                            fnGetErrorDateTime();
                                        }
                                    }                                    
                                }
                            } else{
                                fnSetValueStart(startValue);
                            }
                        } else{
                            fnMissingEndDate();
                        }
                    } else {
                        if (angular.equals(endValue, empty)) {
                            if (angular.equals(startValue, empty)) {
                                if (ng.localRequired) {
                                    ng.optional = false;
                                    ng.validate = true;
                                }
                            } else {
                                fnMissingEndDate();
/*                                if (angular.isUndefined(ng.startModel))
                                    fnMissingEndDate();
                                else
                                    fnMissingEndDate();*/
                            }
                        } else
                        fnSetValueStart(startValue);
                    }
                };

                ng.fnGetEndDate = function () {
                    ng.validate = false;
                    ng.optional = false;
                    var startValue = $("#startInput").val();
                    var endValue = $("#endInput").val();
                    if (angular.isDefined(ng.startModel)) {
                        if (!angular.isUndefined(ng.endModel)) {
                            if (fnValidateEntry())
                                fnMinorStartDateEndDate();
                            else {
                                if (lTimePicker)
                                    fnGetErrorDateTime();
                            }
                        } else {
                            fnMissingEndDate();
                            // if (angular.equals(endValue, empty))
                            //     fnMissingEndDate();
                            // else
                            //     fnIncorrectFormat();
                        }
                    } else {
                        if (!angular.equals(startValue, empty) && !angular.equals(endValue, empty)) {
                            if (angular.isUndefined(ng.startModel) || angular.isUndefined(ng.endModel))
                                fnIncorrectFormat();
                        } else {
                            if (angular.equals(startValue, empty)) {
                                if (ng.localRequired)
                                    fnMissingStartDate()
                            } else if (angular.equals(endValue, empty)) {
                                if (ng.localRequired) {
                                    ng.optional = false;
                                    ng.validate = true;
                                }
                            }
                        }
                    }
                };

                // ng-change event
                ng.changeTime = function () {
                    fnGetErrorDateTime();
                };

                ng.$watch('localReset', function (newValue, oldValue) {
                    if (!angular.isUndefined(newValue) && newValue) {
                        ng.validate = true;
                        ng.localReset = false;
                    }
                });

                ng.$watch('startTimeModel', function (newValue, oldValue) {
                  if (angular.isDefined(newValue))
                    ng.fnGetStartDate();
                });

                ng.$watch('endModel', function (newValue, oldValue) {
                  if (angular.isDefined(newValue))
                    ng.fnGetStartDate();
                });

                ng.$watch('endTimeModel', function (newValue, oldValue) {
                  if (angular.isDefined(newValue))
                    ng.fnGetStartDate();
                });

                // Caso SIE
                ng.mensajeError = APP.DATA.MENSAJES.MSG_FORMATO_INCORRECTO;

                // Calls
                fnSetInitProcess();
            }
        };

    }]);

    module.directive('eventdates', function(dateFactory) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            currentDate: "@edCurrentDate",
            labelStart: "@edStartLabel",
            labelEnd: "@edEndLabel",
            startModel: "=edStartModel",
            endModel: "=edEndModel",
            required:"=edRequired",
            validate: "=edValidate",
            timePicker: "=edTimePicker",
            labelTimeStart: "@edLabelTimeStart",
            labelTimeEnd: "@edLabelTimeEnd",
            startTimeModel: "=edStartTimeModel",
            endTimeModel: "=edEndTimeModel",
            formatTime: "@edFormatTime",
            localReset: "=edReset",

        },
        templateUrl: 'template/directives/ui/eventdates.html',
        controller: function($scope, $element, $attrs) {
                // scope
                var ng = $scope;            

                // local variables
                var empty = "",
                lSetCurrent = angular.isUndefined(ng.currentDate) ? false : angular.fromJson(ng.currentDate),
                lTimePicker = angular.isUndefined(ng.timePicker) ? false : angular.fromJson(ng.timePicker),
                lFormatTime = angular.isUndefined(ng.formatTime) ? '24' : ng.formatTime;

                // local Functions
                var fnIncorrectFormat = function(){fnSetMessage('MSG_FORMATO_INCORRECTO');},
                fnMayorStartDateEndDate = function(){fnSetMessage('MSG_FECHA_INICIO_MAYOR_FECHA_FIN');},
                fnMinorStartDateEndDate = function(){fnSetMessage('MSG_FECHA_FIN_MENOR_FECHA_INICIO');},
                fnMissingStartDate = function(){fnSetMessage('MSG_FALTA_INGRESAR_FECHA_INICIO');},
                fnMissingEndDate = function(){fnSetMessage('MSG_FALTA_INGRESAR_FECHA_FIN');},
                fnMissingStartTime = function(){fnSetMessage('MSG_FALTA_INGRESAR_HORA_INICIO');},
                fnMissingEndTime = function(){fnSetMessage('MSG_FALTA_INGRESAR_HORA_FIN');},
                fnMayorStartTimeEndTime = function(){fnSetMessage('MSG_HORA_INICIO_MAYOR_HORA_FIN');},
                fnSetMessage = function(msj){
                    ng.typeMessage = msj;
                    ng.reset = true;
                    ng.validate = true;
                    ng.optional = true;
                },
                fnValidateEntry = function(){
                    if (angular.isDate(ng.startModel) && angular.isDate(ng.endModel)) {
                        var dStart = parseInt(dateFactory.convertirDate(dateFactory.cambiarUTC(ng.startModel),'YYYYMMDD')),
                        dEnd = parseInt(dateFactory.convertirDate(dateFactory.cambiarUTC(ng.endModel), 'YYYYMMDD'));
                        dcurrentDate = parseInt(dateFactory.convertirDate(dateFactory.cambiarUTC(ng.currentDate), 'YYYYMMDD'));
                        if (dStart > dEnd && dStart>dcurrentDate)
                            return true;
                    }
                    return false;
                },
                fnSetValueStart = function(startValue){
                    if(angular.equals(startValue, empty))
                        fnMissingStartDate();
                    else
                        fnIncorrectFormat();
                },
                fnSetInitProcess = function(){
                        // Current Set date
                        if (lSetCurrent) {
                            var d = new Date();
                            ng.startModel = dateFactory.cambiarUTC(new Date(d.getFullYear() - 1, d.getMonth(), d.getDate()));
                            ng.endModel = dateFactory.cambiarUTC(d);
                        } else {
                         if(!angular.isDate(ng.startModel))
                            ng.startModel = empty;
                        if(!angular.isDate(ng.endModel))
                            ng.endModel = empty;
                    }

                        // Initialization
                        if(angular.isUndefined(ng.validate))
                            ng.validate = false;

                        if(ng.localRequired){
                            if(!lSetCurrent){
                                ng.optional = false;
                                ng.validate = true;
                            }
                        }                                    
                    },
                    fnGetErrorDateTime = function(){
                        if(angular.equals(ng.startModel, empty)&&angular.equals(ng.endModel, empty)&&angular.equals(ng.startTimeModel, empty)&&angular.equals(ng.endTimeModel, empty)){
                            ng.optional = false;
                            ng.validate = true;
                        }else{
                            if(angular.isUndefined(ng.startModel) || angular.equals(ng.startModel, empty))
                                fnMissingStartDate();
                            else if(angular.isUndefined(ng.endModel) || angular.equals(ng.endModel, empty))
                                fnMissingEndDate();
                            else if(angular.isUndefined(ng.startTimeModel) || angular.equals(ng.startTimeModel, empty))
                                fnMissingStartTime();
                            else if(angular.isUndefined(ng.endTimeModel) || angular.equals(ng.endTimeModel, empty))
                                fnMissingEndTime();
                            else{
                                ng.optional = false;
                                ng.validate = false;
                                var startDateTime = fnGetDateTime(ng.startModel, fnGetFormatDateTime(ng.startTimeModel)),
                                endDateTime = fnGetDateTime(ng.endModel, fnGetFormatDateTime(ng.endTimeModel));
                                if(endDateTime.diff(startDateTime) < 0)
                                    fnMayorStartTimeEndTime();
                            }
                        }
                        return false;
                    },
                    fnGetFormatDateTime = function(time){
                        var stime = angular.equals(parseInt(lFormatTime), 12) 
                        ? moment(time, 'h:mm a').format('H:mm') : time

                        return stime;
                    },
                    fnGetDateTime = function(pdate, ptime){
                        var year = moment(pdate).year(),
                        month = moment(pdate).month(),
                        day = moment(pdate).date(),
                        arDatetime = [year, month, day].concat(ptime.split(':').concat([0, 0]));

                        angular.forEach(arDatetime, function(value, key){
                            arDatetime[key] = parseInt(value);
                        });

                        return moment(arDatetime);
                    }                 

                // ng variables
                ng.typeMessage = 'MSG_FORMATO_INCORRECTO';
                ng.localRequired = angular.isUndefined(ng.required) ? false : angular.fromJson(ng.required);
                ng.localLabelStart = angular.isUndefined(ng.labelStart) ? 'Desde' : ng.labelStart;
                ng.localLabelEnd = angular.isUndefined(ng.labelEnd) ? 'Hasta' : ng.labelEnd;
                ng.localLabelTimeStart = angular.isUndefined(ng.labelTimeStart) ? 'Inicio' : ng.labelTimeStart;
                ng.localLabelTimeEnd = angular.isUndefined(ng.labelTimeEnd) ? 'Fin' : ng.labelTimeEnd;
                ng.optional = true;

                // ng Functions
                ng.fnGetStartDate = function(){
                    ng.validate = false;
                    ng.optional = false;
                    var startValue = $("#startInput").val();
                    var endValue = $("#endInput").val();
                    if(!angular.isUndefined(ng.endModel)){
                        if(!angular.equals(ng.endModel, empty)){
                            if(!angular.isUndefined(ng.startModel)){
                                if(fnValidateEntry())
                                    fnMayorStartDateEndDate();
                                else{
                                    if(lTimePicker)
                                        fnGetErrorDateTime();                                
                                }
                            }else
                            fnSetValueStart(startValue);
                        }else
                        fnMissingEndDate();
                    }else{
                        if(angular.equals(endValue, empty)){
                            if(angular.equals(startValue, empty)){
                                if(ng.localRequired){
                                    ng.optional = false;
                                    ng.validate = true;
                                }                         
                            }else{
                                if(angular.isUndefined(ng.startModel))
                                    fnIncorrectFormat();
                                else
                                 fnMissingEndDate();
                         }
                     }else
                     fnSetValueStart(startValue);
                 }
             };

             ng.fnGetEndDate = function(){
                ng.validate = false;
                ng.optional = false;
                var startValue = $("#startInput").val();
                var endValue = $("#endInput").val();
                if(!angular.isUndefined(ng.startModel)){
                    if(!angular.isUndefined(ng.endModel)){
                        if(fnValidateEntry())
                            fnMinorStartDateEndDate();
                        else{
                            if(lTimePicker)
                                fnGetErrorDateTime();
                        }
                    }else{
                        if(angular.equals(endValue, empty))
                            fnMissingEndDate();
                        else
                            fnIncorrectFormat();
                    }
                }else{
                    if(!angular.equals(startValue, empty) && !angular.equals(endValue, empty)){
                        if(angular.isUndefined(ng.startModel) || angular.isUndefined(ng.endModel))
                            fnIncorrectFormat();
                    }else{
                        if(angular.equals(startValue, empty)){
                            if(ng.localRequired)
                                fnMissingStartDate()
                        }else if(angular.equals(endValue, empty)){
                            if(ng.localRequired){
                                ng.optional = false;
                                ng.validate = true;                                
                            }                            
                        }
                    }
                }                 
            };

                // ng-change event
                ng.changeTime = function(){
                    fnGetErrorDateTime();
                };

                ng.$watch('localReset', function(newValue, oldValue) {
                    if (!angular.isUndefined(newValue) && newValue) {
                        ng.validate = true;
                        ng.localReset = false;
                    }
                });            

                // Caso SIE
                ng.mensajeError = APP.DATA.MENSAJES.MSG_ERROR_DATETIME;

                // Calls
                fnSetInitProcess();
            }
        };
    });

});