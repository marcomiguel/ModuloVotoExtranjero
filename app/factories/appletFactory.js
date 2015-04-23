'use strict';
define(['app'], function (app) {
    app.factory('appletFactory',function(){
        var addModal = function(mensaje){
            var code = '';
            code +='<div id="modalFirmaDigital" class="modal hide" style="z-index:50000;" data-keyboard="false" data-backdrop="static">';
            code +='<div class="modal-header">';
            code +='<button type="button" class="close" data-dismiss="modal"><i></i>&times;</button>';
            code +='<h3>Firma Digital</h3>';
            code +='</div>';
            code +='<div class="modal-body">';
            if(mensaje==''){
                code +='<div style="background:url(static/img/preload-64x64.gif) 50% 50% no-repeat;width:64px;height:64px;margin:0 auto;"></div>';
            }
            else{
                code += '<div class="alert alert-error"><i></i>'+mensaje+'</div>';
            }
            code +='<p></p>';
            code +='</div>';
            code +='</div>';
            $('body').prepend(code);
            $('#modalFirmaDigital').modal('show');
        };

        var removeModal = function(){
            $('body>#modalFirmaDigital').remove();
            $('body>.modal-backdrop').remove()
        };

        return{
            obtenerPdfFirmado: function(pdfBytes){
                var mensaje='';
                removeModal();
                //addModal(mensaje);
                var applet = '';
                var pdfFirmado = '';
                var applet = document.getElementById('idApplet');
                var pdfFirmado = applet.firmaDocumento(pdfBytes);               
                //removeModal();
                switch(pdfFirmado){
                    case '1':
                        mensaje='Está usando un Sistema Operativo no soportado para la firma digital, use Windows, Linux o Mac OS.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '2':
                        mensaje='No tiene instalado un JRE soportado para la firma digital, instale JRE versión 1.7 de 32 bits.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '3':
                        mensaje='Fichero de configuración no guarda el formato esperado, borre dicho fichero e ingrese a la página donde se ejecuta el applet para generar un fichero con configuración por defecto.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '4':
                        mensaje='No está instalada la librería PKCS11, asegúrese de instalar la librería y los drivers de la tarjeta y la lectora.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '5':
                        mensaje='No está conectada la lectora, asegúrese de conectarla.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '6':
                        mensaje='No está insertada la tarjeta, asegúrese de insertarla.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '7':
                        mensaje='Cerró el ingreso del PIN para la firma.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '8':
                        mensaje='Canceló el ingreso del PIN para la firma.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '9':
                        mensaje='Su certificado está expirado, no puede realizar la firma, contáctese con la Autoridad Certificadora para la renovación.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '10':
                        mensaje='Su certificado no es válido, consulte a la Autoridad Certificadora.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '11':
                        mensaje='Su PIN está bloqueado, ha realizado demasiados intentos. Desbloquee su PIN con el PIN Admin.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '12':
                        mensaje='No se encuentra el fichero de configuración del proveedor de PKCS11.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '13':
                        mensaje='Su certificado está revocado, contáctese con la Autoridad Certificadora para la renovación.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '14':
                        mensaje='Ha ingresado un PIN incorrecto, si sigue ingresando PINs incorrectos, bloqueará el PIN.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '15':
                        mensaje='Asegúre de estar conectado a Internet y al proveedor de servicios de certificados revocados.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '16':
                        mensaje='El recurso web de listado de certificados revocados (CRL) no está disponible.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                    case '17':
                        mensaje='El servicio online OCSP no está disponible.';
                        addModal(mensaje);
                        pdfFirmado='';
                        break;
                }   
                return pdfFirmado;           
            }
        }      
    }); 
});