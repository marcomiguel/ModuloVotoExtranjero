'use strict';
var count = 1060;
define(['app'], function (app) {

    app.factory('alertsFactory',function(){
		var config = {};
        return {
            alerta: function(parametros) {
            	config = {
            		tipo : 'warning',
            		mensaje:'Mensaje...',
            		oculto:false
            	};
            	var objNew = jQuery.extend(config, parametros),
            	html_base = '<div style="z-index:' + count++ + '" id="alert' + count++ + '" class="hide alert alert-' + objNew.tipo + ' alert-process">' +
					'<i></i>' +	
					objNew.mensaje +
					'<button type="buttom" class="close alert-process-close" title="Cerrar">' +
					'Cerrar' +
					'</button>' +
				'</div>';
                //Metodo de insercion
                var time = '500', timeHide = '7000', msjHTML;
                var closeAlertHTML = function(_html, time){
	            	_html.fadeOut(time, function(){
						_html.remove();
					});
                }                
                if(!objNew.oculto){
	                jQuery('body>.alert-process').remove();
	                jQuery('body').prepend(html_base);
	                msjHTML = jQuery('body>.alert-process').eq(0);
	                msjHTML.fadeIn(time);
	                jQuery('body>.alert-process>.alert-process-close').eq(0).click(function(){
	                	var _t = jQuery(this).parent();
	                	closeAlertHTML(_t, time);
	                });
	                //Cerrado por tiempo
	                setTimeout(function(){
	                	closeAlertHTML(msjHTML, time);
	                },timeHide);                	
                }else{
                	//Cerrado
                	msjHTML = jQuery('body>.alert-process').eq(0);
                	closeAlertHTML(msjHTML, 1000);
                }
               
                
            }
        };
    });

});