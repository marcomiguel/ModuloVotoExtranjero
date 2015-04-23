'use strict';

define(['app'], function (app) {

    app.factory('reportingFactory', function () {
        
        var addModal = function(){
            var code = '';
            code += '<div class="modal-impresion-wrap hide"><div id="modalDownloadForce" class="modal" data-keyboard="false" data-backdrop="static">';
            code += '<div class="modal-header">';
            code += '<button type="button" onclick="$(this).parent().parent().parent().remove();" class="close"><i></i>&times;</button>';
            code += '<h3>Descarga</h3>';
            code += '</div>';
            code += '<div class="modal-body">';
            code += '<div id="loadingExp3" style="background:url(static/img/preload-64x64.gif) 50% 50% no-repeat;width:64px;height:64px;margin:0 auto;"></div>';
            code += '<div id="loadingExp4"></div>';
            code += '</div>';
            code += '</div><div class="modal-backdrop in"></div></div>';
            $('body').prepend(code);
            $('body > .modal-impresion-wrap').show();
        };

        var removeModal = function(){
            $('body > .modal-impresion-wrap').remove();
        };

        var jsonACadena = function (obj) {
            var str = '';
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    var strString = '', pipe = ',';
                    if (typeof obj[p] == 'string') {
                        strString = '"' + obj[p] + '"';
                    } else {
                        strString = obj[p];
                    }
                    str += '"' + p + '"' + ':' + strString + pipe;
                }
            }
            str = str.substr(0, str.length - 1);
            return '{' + str + '}';
        };
        

        var base64_encode = function(data) {
            // http://kevin.vanzonneveld.net
            // +   original by: Tyler Akins (http://rumkin.com)
            // +   improved by: Bayron Guevara
            // +   improved by: Thunder.m
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   bugfixed by: Pellentesque Malesuada
            // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // +   improved by: Rafał Kukawski (http://kukawski.pl)
            // *     example 1: base64_encode('Kevin van Zonneveld');
            // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
            // mozilla has this native
            // - but breaks in 2.0.0.12!
            //if (typeof this.window['btoa'] === 'function') {
            //    return btoa(data);
            //}
            var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\"=";
            var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = "",
            tmp_arr = [];

            if (!data) {
                return data;
            }

            do { // pack three octets into four hexets
                o1 = data.charCodeAt(i++);
                o2 = data.charCodeAt(i++);
                o3 = data.charCodeAt(i++);

                bits = o1 << 16 | o2 << 8 | o3;

                h1 = bits >> 18 & 0x3f;
                h2 = bits >> 12 & 0x3f;
                h3 = bits >> 6 & 0x3f;
                h4 = bits & 0x3f;

                // use hexets to index into b64, and append result to encoded string
                tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
            } while (i < data.length);

            enc = tmp_arr.join('');

            var r = data.length % 3;

            return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

        }

        var utf8_encode=function(string) {
            string = string.replace(/\r\n/g, "\n");
            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        }

        return {
            descargar: function (urlReporte, nombreReporte, parametros, tipoDocumento, callback) {
                console.log(urlReporte, nombreReporte, parametros, tipoDocumento, callback, 'ooooo');
                var objCadena = angular.toJson(parametros);
                objCadena=utf8_encode(objCadena);
                console.log(objCadena);
                var params = {
                    reporte: APP.DATA.CONFIG.URL_BASE_REPORTE_CARPETA + nombreReporte,
                    data: base64_encode(objCadena),
                    tipoDocumento: tipoDocumento
                };
                removeModal();

                addModal();

                $.fileDownload(urlReporte, {
                    httpMethod: "POST",
                    data: params
                })
                .done(function () { 
                    removeModal();
                    //Callback
                    if (typeof callback != 'undefined' && typeof callback === 'function') {
                        callback();
                    }
             })
                .fail(function () {
                    $('body #modalDownloadForce .modal-body #loadingExp3').remove();
                    $('body #modalDownloadForce .modal-body #loadingExp4').html('<div class="alert alert-error"><i></i>Hubo un problema al generar el reporte, por favor inténtelo de nuevo.</div>');
                });

            }
        };
    });

});