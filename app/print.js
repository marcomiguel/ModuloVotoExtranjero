var ngApp = angular.module("ngApp",[]);

ngApp.factory('ajaxFactory',function(){
    var url_base = APP.DATA.CONFIG.URL_BASE;
    return {
        consultar: function(url,parametros,exito,error,before) {
            var browser = navigator.appName;
            if (browser == "Microsoft Internet Explorer"){
                parametros.sesion = window.opener.APP.DATA.CONFIG.SESION;
            }else{
                parametros.sesion = window.parent.APP.DATA.CONFIG.SESION;
            }
            var mapParametros = {
                metodo: url,
                parametros:parametros
            };
            $.sieAjax({
                url: url_base + 'Seguridad.aspx/consultar',
                parametros: mapParametros
            }, exito, error, before);
        }
    };
});

//Impresion

ngApp.factory('hashFactory',function(){
    
    // private method for UTF-8 encoding
    var utils = {	
        _utf8_encode : function (string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
            
            for (var n = 0; n < string.length; n++) {
                
                var c = string.charCodeAt(n);
                
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
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
        },
        
        // private method for UTF-8 decoding
        _utf8_decode : function (utftext) {
            var string = "";
            var i = 0;
            var c = 0, c1 =0, c2 = 0;
            
            while ( i < utftext.length ) {
                
                c = utftext.charCodeAt(i);
                
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i+1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                    else {
                        c2 = utftext.charCodeAt(i+1);
                        c3 = utftext.charCodeAt(i+2);
                        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                        i += 3;
                    }
                
            }
            
            return string;
        }
    }
    
    return {
        Base64 : {				 
            // private property
            _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            
            // public method for encoding
            encode : function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;
                
                input = utils._utf8_encode(input);
                
                while (i < input.length) {
                    
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);
                    
                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;
                    
                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }
                    
                    output = output +
                        this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                        this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
                    
                }
                
                return output;
            },
            
            // public method for decoding
            decode : function (input) {
                var output = "";
                var chr1, chr2, chr3;
                var enc1, enc2, enc3, enc4;
                var i = 0;
                
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
                
                while (i < input.length) {
                    
                    enc1 = this._keyStr.indexOf(input.charAt(i++));
                    enc2 = this._keyStr.indexOf(input.charAt(i++));
                    enc3 = this._keyStr.indexOf(input.charAt(i++));
                    enc4 = this._keyStr.indexOf(input.charAt(i++));
                    
                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;
                    
                    output = output + String.fromCharCode(chr1);
                    
                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }
                    
                }
                
                output = utils._utf8_decode(output);
                
                return output;
                
            }
            
        },
        popup : function popup(url) {
            var posicion_x, posicion_y, ancho=1000,alto=600; 
            posicion_x=(screen.width/2)-(ancho/2); 
            posicion_y=(screen.height/2)-(alto/2);
            window.open(url, "reporte", "width=" + ancho + ",height=" + alto + ",resizable=no,left=" + posicion_x + ",top=" + posicion_y);
        },
        obtenerVariables : function(name) {
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var tmpURL = window.location.href;
            var results = regex.exec(tmpURL);
            if (results == null)
                return "";
            else
                return results[1];
        }			
    }
});		
//date
ngApp.factory('dateFactory',function(){
    
    return {
        convertirDateTime: function(datetime,formato) {
            return  moment(datetime).format(formato);
        },
        convertirDate: function(midate,formato) {
            return  moment(midate).format(formato);
        },
        obtenerDate:function(midate){
            return  moment(midate);
        }
    };
});


ngApp.filter('uiMoneyMask', function () {
    
    function isUndefined(value){return typeof value == 'undefined';}  
    
     function isEmpty(value) {
                 return isUndefined(value) || value === '' || value === null || value !== value;
               }
    function dividir(numero){
                var elementos  = [];
                var exacto = numero.length / 3;
                var residuo = numero.length % 3;    
                var str = '';
                if(residuo !== 0){
                    str = str + numero.substr(0,residuo);
                    elementos.push(str);
                }
                for(var i = 1;i<=exacto;i++){
                    str = '';
                    str = str + numero.substr(residuo,3);
                    residuo = residuo + 3;
                    elementos.push(str);
                }
                    return elementos.join('.');
            };
               
        return function (text, length, end) {
                               
               function enmascarar(value){
                                                        
                    if(value || value == 0){
                        
                    var variable = value.toString();

                    var parteEntera = variable.split('.');                                     
                    var strEntera = parteEntera[0];                 
                    var strDecimal = ',00';

                    strEntera = dividir(strEntera); 
                     if(parteEntera.length > 1){                                 
                         if(parteEntera[1].length > 1){
                                    strDecimal = ','+parteEntera[1];
                          }else{
                              if(isEmpty(parteEntera[1])){
                                      strDecimal = ',00';
                               }else{
                                      strDecimal = ','+parteEntera[1]+'0';
                               }                   
                          }
                     }
                        return strEntera+strDecimal;

                    }   
                        else{                       
                        return '';
                     }

               }//cierre function enmascarar                    
                    return enmascarar(text);    
            }
    });

//Paginas para impresion
ngApp.factory('printFactory',function(){
    
    return {
        datosImprimir: function(listaOriginal,numPag1,numResto) {
            var numFilasPrimeraPagina = numPag1;
            var numFilasRestoPaginas = numResto;
            var listaPrimeraPagina = [];
            var listaRestoPaginas = [];
            var listaCantidadPaginasImpresas=[];
            var cantidadRegistros=0;
            var cantidadPaginasImpresas=0;
            var paginaActual = 1;
            if(typeof listaOriginal === 'undefined' || listaOriginal == '' || listaOriginal == null){
                var listaImprimir = [];
            }else{
                var listaImprimir = listaOriginal;
            }
            var cantidadPaginas =  listaImprimir.length;
            var lista=listaImprimir,size=lista.length,pageBreak=25;
            
            if (size > 0) {
                
                //n registros
                cantidadRegistros = lista.length - numFilasPrimeraPagina;
                cantidadPaginasImpresas = Math.ceil(cantidadRegistros / numFilasRestoPaginas);
                var cont = 1;
                angular.forEach(lista, function(value, key) {
                    value.incremento = ((paginaActual - 1) * cantidadPaginas) + key + 1;
                    if (cont <= numFilasPrimeraPagina)
                        listaPrimeraPagina.push(value);
                    else
                        listaRestoPaginas.push(value);
                    cont++;
                });
                //tengo el resto de registros listaRestoPaginas
                //tengo el numero de paginas a imprimir cantidadPaginasImpresas
                
                var contRegistrosInternosIndex = 1;
                for (var i = 0; i < cantidadPaginasImpresas; i++) {
                    var listaReg = [];
                    var contRegistrosInternos = 1;
                    for (var j = contRegistrosInternosIndex - 1; j < listaRestoPaginas.length; j++) {
                        var elemento = listaRestoPaginas[j];
                        elemento.incremento = ((paginaActual - 1) * cantidadPaginas) + j + 1 + numFilasPrimeraPagina;
                        if (contRegistrosInternos <= numFilasRestoPaginas)
                            listaReg.push(elemento);
                        else
                            break;
                        contRegistrosInternos++;
                        contRegistrosInternosIndex++;
                    }
                    listaCantidadPaginasImpresas.push({
                        page : true,
                        registros : listaReg
                    });
                }
            }
            return {
                listaPrimeraPagina:listaPrimeraPagina,
                listaCantidadPaginasImpresas:listaCantidadPaginasImpresas, 
                numFilasPrimeraPagina: numFilasPrimeraPagina,
                numFilasRestoPaginas:numFilasRestoPaginas
            };
        }
     };
});