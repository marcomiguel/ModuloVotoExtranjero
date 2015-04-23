(function ($) {
    $.extend({

        sieAjax: function (Opciones, mySuccess, myError, myBeforeSend) {

            var defaults = {

            };

            $.extend(defaults, Opciones);
           // console.log('opc', Opciones)
            $.ajax({
                type: 'POST',
                url: defaults.url,
                data: JSON.stringify(defaults.parametros),
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                beforeSend: function (jqXHR) {
                    myBeforeSend(jqXHR);
                },
                success: function (msg) {
                    //console.log('msg',msg)
                    if (angular.isDefined(msg) && angular.isDefined(msg.d) && angular.isDefined(msg.d.sesionExpirada)) {
                        $("#loading-msg").text('Su sesión expiró, presione F5 para actualizar la página');
                        setTimeout(function () {
                            $('#dashboard').fadeOut('fast', function () {
                                $('#loading-mask').fadeIn('fast');
                                $('#loading').show();
                            });
                        }, 1000);
                    } else {

                        if (msg.d.d != undefined)
                            mySuccess(msg.d.d);
                        else
                            mySuccess(msg.d);
                    }
                },
                error: function (error) {
                    myError(error);
                }
            });

        }

    })
})(jQuery);