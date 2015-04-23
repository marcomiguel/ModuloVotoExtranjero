'use strict';

define(['app'], function (app) {

    app.factory('dateFactory',function(){
       
        return {
            convertirDateTime: function(datetime,formato) {
                //return  moment(datetime).format(formato);
                //se agrega validación para evitar fechas vacias
                var paramsValid = (datetime == ' ' || datetime == '');
                //se agrega try catch
                try
                {                    
                    if(paramsValid)
                    {                                      
                        return moment().format();                                          
                    }
                    else
                    {                                                         
                        return moment(datetime).format(formato);                                                                 
                    }
                }
                catch(error)
                {
                    return moment().format();
                }
            },
            convertirDate: function(midate,formato) {
                //return  moment(midate).format(formato);
                var paramsValid = (midate == ' ' || midate == '');
                //se agrega try catch
                try
                {                    
                    if(paramsValid)
                    {                                      
                        return moment().format();                                          
                    }
                    else
                    {  
                        return moment(midate).format(formato);                                                                                                                    
                    }
                }
                catch(error)
                {
                    return moment().format();
                }
            },
            obtenerDate:function(midate){
                return  moment(midate);
            },
            cambiarUTC:function(date){
                var now = new Date(date);
                //var nowUtc = new Date( now.getTime() + (now.getTimezoneOffset() * 60000));
                var nowUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                return nowUtc;
            },
            convertirMilisegundos: function (milisegundos, formato) {
                var day = moment().milliseconds(milisegundos);
                return moment(day._d).format(formato);
            }
        };
    });

});