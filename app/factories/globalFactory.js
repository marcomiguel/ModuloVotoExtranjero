'use strict';

define(['app'], function (app) {

    app.factory('globalFactory',function(){

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
			},

			get_html_translation_table : function (table, quote_style) {
				//  discuss at: http://phpjs.org/functions/get_html_translation_table/
				// original by: Philip Peterson
				//  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
				// bugfixed by: noname
				// bugfixed by: Alex
				// bugfixed by: Marco
				// bugfixed by: madipta
				// bugfixed by: Brett Zamir (http://brett-zamir.me)
				// bugfixed by: T.Wild
				// improved by: KELAN
				// improved by: Brett Zamir (http://brett-zamir.me)
				//    input by: Frank Forte
				//    input by: Ratheous
				//        note: It has been decided that we're not going to add global
				//        note: dependencies to php.js, meaning the constants are not
				//        note: real constants, but strings instead. Integers are also supported if someone
				//        note: chooses to create the constants themselves.
				//   example 1: get_html_translation_table('HTML_SPECIALCHARS');
				//   returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}

				var entities = {},
				hash_map = {},
				decimal;
				var constMappingTable = {},
				constMappingQuoteStyle = {};
				var useTable = {},
				useQuoteStyle = {};

				// Translate arguments
				constMappingTable[0] = 'HTML_SPECIALCHARS';
				constMappingTable[1] = 'HTML_ENTITIES';
				constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
				constMappingQuoteStyle[2] = 'ENT_COMPAT';
				constMappingQuoteStyle[3] = 'ENT_QUOTES';

				useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
				useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() :
				'ENT_COMPAT';

				if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
				throw new Error('Table: ' + useTable + ' not supported');
				// return false;
				}

				entities['38'] = '&amp;';
				if (useTable === 'HTML_ENTITIES') {
				entities['160'] = '&nbsp;';
				entities['161'] = '&iexcl;';
				entities['162'] = '&cent;';
				entities['163'] = '&pound;';
				entities['164'] = '&curren;';
				entities['165'] = '&yen;';
				entities['166'] = '&brvbar;';
				entities['167'] = '&sect;';
				entities['168'] = '&uml;';
				entities['169'] = '&copy;';
				entities['170'] = '&ordf;';
				entities['171'] = '&laquo;';
				entities['172'] = '&not;';
				entities['173'] = '&shy;';
				entities['174'] = '&reg;';
				entities['175'] = '&macr;';
				entities['176'] = '&deg;';
				entities['177'] = '&plusmn;';
				entities['178'] = '&sup2;';
				entities['179'] = '&sup3;';
				entities['180'] = '&acute;';
				entities['181'] = '&micro;';
				entities['182'] = '&para;';
				entities['183'] = '&middot;';
				entities['184'] = '&cedil;';
				entities['185'] = '&sup1;';
				entities['186'] = '&ordm;';
				entities['187'] = '&raquo;';
				entities['188'] = '&frac14;';
				entities['189'] = '&frac12;';
				entities['190'] = '&frac34;';
				entities['191'] = '&iquest;';
				entities['192'] = '&Agrave;';
				entities['193'] = '&Aacute;';
				entities['194'] = '&Acirc;';
				entities['195'] = '&Atilde;';
				entities['196'] = '&Auml;';
				entities['197'] = '&Aring;';
				entities['198'] = '&AElig;';
				entities['199'] = '&Ccedil;';
				entities['200'] = '&Egrave;';
				entities['201'] = '&Eacute;';
				entities['202'] = '&Ecirc;';
				entities['203'] = '&Euml;';
				entities['204'] = '&Igrave;';
				entities['205'] = '&Iacute;';
				entities['206'] = '&Icirc;';
				entities['207'] = '&Iuml;';
				entities['208'] = '&ETH;';
				entities['209'] = '&Ntilde;';
				entities['210'] = '&Ograve;';
				entities['211'] = '&Oacute;';
				entities['212'] = '&Ocirc;';
				entities['213'] = '&Otilde;';
				entities['214'] = '&Ouml;';
				entities['215'] = '&times;';
				entities['216'] = '&Oslash;';
				entities['217'] = '&Ugrave;';
				entities['218'] = '&Uacute;';
				entities['219'] = '&Ucirc;';
				entities['220'] = '&Uuml;';
				entities['221'] = '&Yacute;';
				entities['222'] = '&THORN;';
				entities['223'] = '&szlig;';
				entities['224'] = '&agrave;';
				entities['225'] = '&aacute;';
				entities['226'] = '&acirc;';
				entities['227'] = '&atilde;';
				entities['228'] = '&auml;';
				entities['229'] = '&aring;';
				entities['230'] = '&aelig;';
				entities['231'] = '&ccedil;';
				entities['232'] = '&egrave;';
				entities['233'] = '&eacute;';
				entities['234'] = '&ecirc;';
				entities['235'] = '&euml;';
				entities['236'] = '&igrave;';
				entities['237'] = '&iacute;';
				entities['238'] = '&icirc;';
				entities['239'] = '&iuml;';
				entities['240'] = '&eth;';
				entities['241'] = '&ntilde;';
				entities['242'] = '&ograve;';
				entities['243'] = '&oacute;';
				entities['244'] = '&ocirc;';
				entities['245'] = '&otilde;';
				entities['246'] = '&ouml;';
				entities['247'] = '&divide;';
				entities['248'] = '&oslash;';
				entities['249'] = '&ugrave;';
				entities['250'] = '&uacute;';
				entities['251'] = '&ucirc;';
				entities['252'] = '&uuml;';
				entities['253'] = '&yacute;';
				entities['254'] = '&thorn;';
				entities['255'] = '&yuml;';
				}

				if (useQuoteStyle !== 'ENT_NOQUOTES') {
				entities['34'] = '&quot;';
				}
				if (useQuoteStyle === 'ENT_QUOTES') {
				entities['39'] = '&#39;';
				}
				entities['60'] = '&lt;';
				entities['62'] = '&gt;';

				// ascii decimals to real symbols
				for (decimal in entities) {
				if (entities.hasOwnProperty(decimal)) {
				  hash_map[String.fromCharCode(decimal)] = entities[decimal];
				}
				}

				return hash_map;
			}
		},
		$idown;  // Keep it outside of the function, so it's initialized once.
		var pwindow;
		    	
        return {
            obtenerClassEstadoSolicitud : function( idTipoEstado ){    
                var classState = '';
                switch (idTipoEstado) {
	                case 3:
	                    classState = 'state-success'; // APROBADA
	                    break;
	                case 2:
	                    //classState = 'state-received'; // RECIBIDA
	                    classState = 'state-success'; // RECIBIDA
	                    break;                            
	                case 5:
	                    classState = 'state-rejected'; // DENEGADA
	                    break;
	                case 4:
	                    classState = 'state-pending'; // PREVENIDA
	                    break;
	                case 1:
	                    //classState = 'state-received-temporary'; // RECIBIDA TEMPORALMENTE
	                    classState = 'state-success'; // RECIBIDA TEMPORALMENTE
	                    break;
                }                        
                return classState;
            },
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
			urlBase : 'template/print/',
			popup : function (url, paramsFrame) {
				var browser = navigator.appName;
				if (browser == "Microsoft Internet Explorer") {
					//Popup
					var posicion_x, posicion_y, ancho=1000,alto=600; 
					posicion_x=(screen.width/2)-(ancho/2); 
					posicion_y=(screen.height/2)-(alto/2);
					if(pwindow != undefined){
						pwindow.close();	
					}			
					if(paramsFrame != undefined){
						window.parametrosFrame = paramsFrame;
					}else{
						window.parametrosFrame = '';
					}
					pwindow = window.open(url, "reporte", "width=" + ancho + ",height=" + alto + ",resizable=no,left=" + posicion_x + ",top=" + posicion_y);
				}else{
					//Iframe
					$('body > .modal-impresion').remove();
					var htmlpopup = '<div><div class="modal modal-impresion" role="dialog" aria-hidden="true">' +		
						'<div class="modal-header">'+
						  '<button onclick="$(this).parent().parent().parent().remove();" type="button" class="close" data-dismiss="modal" aria-hidden="true"><i></i>Close</button>'+
						  '<h3>Impresión</h3>'+
						'</div>'+
						'<div class="modal-body">'+
						'<iframe name="idIframe" id="idIframe" src="'+ url +'">' +
						'</iframe>'+
						'</div>'+
					 '</div>'+
					 '<div class="modal-backdrop in"></div></div>';		
					$('body').append(htmlpopup);
					if(paramsFrame != undefined){
						window.frames['idIframe'].parametrosFrame = paramsFrame;	
					}else{
						window.frames['idIframe'].parametrosFrame = '';	
					}
			  	}		
			},
			popupUrl : function (url) {
				var posicion_x, posicion_y, ancho=1000,alto=600; 
				posicion_x=(screen.width/2)-(ancho/2); 
				posicion_y=(screen.height/2)-(alto/2);
				if(pwindow != undefined){
					pwindow.close();	
				}		
				pwindow = window.open(url, "reporte", "width=" + ancho + ",height=" + alto + ",resizable=no,left=" + posicion_x + ",top=" + posicion_y);
			},			
			jsonACadena : function objToString (obj) {
			    /*var str = '';
			    for (var p in obj) {
			        if (obj.hasOwnProperty(p)) {
			        	var strString = '', pipe = ',';
						if(typeof obj[p] == 'string'){
							strString = '"' + obj[p] + '"';
						}else{
							strString = obj[p];
						}
			            str += '"' + p + '"' + ':' + strString + pipe;
			        }
			    }
			    str = str.substr(0,str.length - 1);
			    return '{' + str + '}';*/
			    return angular.toJson(obj);
			},
			jsonUnion : function merge_options(obj1, obj2) {
				var obj3 = {};
				for (var attrname in obj1) {
					obj3[attrname] = obj1[attrname];
				}
				for (var attrname in obj2) {
					obj3[attrname] = obj2[attrname];
				}
				return obj3;
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
			},
			preload : function(isShow, id){
				var isLoad = jQuery('body #load-process');
				if(isLoad.size()>0){
					isLoad.remove();
				}
			    var htmlPreload = angular.element('<div id="load-process"><span><i></i><br/>Cargando, espere por favor ...</span></div>'),
				body = jQuery('body');
				if(isShow){
					if(id){
						var _h, jId = jQuery(id).innerHeight()/2, jH = 50;
					    if(jId>jH){
					    	_h = jId - jH; //Positivo
					    }else{
					    	_h = 0; //Negativo
					    }
						jQuery(id).css('position','relative').append(htmlPreload);
						$(htmlPreload).find('span').css('padding-top',_h  + 'px');
						$(htmlPreload).addClass('preload_absolute');
					}else{
						body.append(htmlPreload);
						$(htmlPreload).addClass('preload_fixed');
					}
				}else{
					jQuery('body #load-process').remove();
				}
			},

			htmlEntities : function (string, quote_style, charset, double_encode) {
				//  discuss at: http://phpjs.org/functions/htmlentities/
				// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
				//  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
				//  revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
				// improved by: nobbler
				// improved by: Jack
				// improved by: Rafał Kukawski (http://blog.kukawski.pl)
				// improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
				// bugfixed by: Onno Marsman
				// bugfixed by: Brett Zamir (http://brett-zamir.me)
				//    input by: Ratheous
				//  depends on: get_html_translation_table
				//   example 1: htmlentities('Kevin & van Zonneveld');
				//   returns 1: 'Kevin &amp; van Zonneveld'
				//   example 2: htmlentities("foo'bar","ENT_QUOTES");
				//   returns 2: 'foo&#039;bar'

				var hash_map = utils.get_html_translation_table('HTML_ENTITIES', quote_style),
				symbol = '';
				string = string == null ? '' : string + '';

				if (!hash_map) {
				return false;
				}

				if (quote_style && quote_style === 'ENT_QUOTES') {
				hash_map["'"] = '&#039;';
				}

				if ( !! double_encode || double_encode == null) {
				for (symbol in hash_map) {
				  if (hash_map.hasOwnProperty(symbol)) {
				    string = string.split(symbol)
				      .join(hash_map[symbol]);
				  }
				}
				} else {
				string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function(ignore, text, entity) {
				  for (symbol in hash_map) {
				    if (hash_map.hasOwnProperty(symbol)) {
				      text = text.split(symbol)
				        .join(hash_map[symbol]);
				    }
				  }

				  return text + entity;
				});
				}

				return string;
			},

			tipoDocExportar : {
				excel: 'Excel',
				word: 'Word',
				pdf: 'pdf'
			},

			enumPlantilla : {
				OficioCalculoAporteEstatalYFinanciamientoAnticipadoGlobal: '1',
				OficioDeterminacionFinanciamientoAnticipadoPorPartido : '2',
	            ComprobanteRecepcionGarantiasLiquidas : '3',
	            OficioDeSustitucionDeGarantiasOSolicitarAjustes : '4',
	            OficioRecomendacionDeAprobacionDeFinanciamientoAnticipado : '5',
	            OficioDeRechazoDeSolicitud : '6',
	            OficioSustitucionDeGarantia : '7',
	            OficioEjecucionDeGarantiaCuandoElPartidoDesiste : '8',
	            OficioEjecucionDeGarantiaCuandoPartidoPoliticoNoAlcanzoVotos : '9',
	            OficioEjecucionDeGarantiaPorVencimiento : '10',
	            DistribucionDeAporteEstatalPorPartidoPoliticoEleccionesNacionales : '11',
	            DistribucionDeAporteEstatalPorPartidoPoliticoEleccionesMunicipales : '12',
	            MontosDeContribucionEstatalQueNoCubreElFinanciamientoAnticipadoAprobado : '13',
	            ComprobanteDeDevolucionDeGarantias : '14',
	            InformeDeCertificacion : '15',
	            InformeGeneralDeGastosAprobados : '16',
	            ActaDeRecepcion : '17',
	            InformeParaElRechazoDePlanoLiquidacion : '18',
	            InformeDeMuestreoEstadistico : '19',
	            InformePorCuenta : '20',
	            InformeDeGastosRechazados : '21',
	            HojaDeTrabajo : '22',
	            InformeLiquidacionDeGastos : '23'
			},
        };
             
    });

});