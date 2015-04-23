'use strict';

define(['app'], function (app) {

    app.register.controller('repReporteUsuarioController', ['$scope', '$http', 'globalFactory', 'ajaxFactory', 'alertsFactory', 'cookiesFactory', 'dateFactory', 'reportingFactory', '$filter', function ($scope, $http, globalFactory, ajaxFactory, alertsFactory, cookiesFactory, dateFactory, reportingFactory, $filter) {

    	//---- VARIABLES PRIVADAS ----//

        //---- Scope ----//
        var ng = $scope;

        //---- Remoto ----//
        var prRemoto='repReporteUsuario.aspx/';

        //---- Ashx ----//
        var ashx={
            exportar:'Descarga/DescargaArchivo.aspx'
        };

        //---- Metodos ----//
        var metodos={
            obtenerPerfil:'ObtenerPerfil',
            obtenerPermiso:'ObtenerMenuAsociadosAlPerfil',
            obtenerEstado:'ObtenerEstadoUsuarioPorPerfil',
            obtenerDatosUsuario:'ObtenerDatosUsuario',
            obtenerReporte1:'ObtenerDatosUsuario',
            obtenerReporte2:'ObtenerDatosPerfil',
            obtenerReporte3a:'ObtenerDatosUsuarioEntreFechaAcciones',
            obtenerReporte3b:'ObtenerDatosPerfilEntreFechaAcciones',
            obtenerReporte4a:'ObtenerEstadisticaEntreAccionesEstado',
            obtenerReporte4b:'ObtenerCantidadUsuarioPorEstado',
            obtenerReporte5:'ObtenerHistoricoUsuario',
            exportar:{
                // reporte1:'ReporteRepObtenerDatosUsuario',
                // reporte2:'',
                // reporte3a:'',
                // reporte3b:'',
                // reporte4a:'',
                // reporte4b:'',
                // reporte5:''
            }
        };

        //---- Mensajes ----//
        var mensajes = APP.DATA.MENSAJES;

        //---- Constantes ----//
		var constantes = {
			idSeleccione:-1,
            acciones:{
                usuario:'U',
                perfiles:'P',
                fecha:'F',
                estado:'E'
            }
		};

        //---- Modales ----//
        
        //---- Otras ----//
        var enumFiltros={
			DATOS_USUARIO:{idFiltro:1, descripcion:'Datos de usuario'},
			DATOS_PERFIL:{idFiltro:2, descripcion:'Datos de perfil'},
			ENTRE_FECHAS:{idFiltro:3, descripcion:'Entre fechas de acciones'},
			ESTADISTICAS:{idFiltro:4, descripcion:'Estadísticas de las acciones'},
			HISTORICO_USUARIO:{idFiltro:5, descripcion:'Histórico de un usuario'}
        };

		var testPerfil={
			PERFIL_1:{idPerfil:1, descripcion:'Perfil 1'},
			PERFIL_2:{idPerfil:2, descripcion:'Perfil 2'},
			PERFIL_3:{idPerfil:3, descripcion:'Perfil 3'}
		};

		var testPermiso={
			PERMISO_1:{idMenu: 1, idPerfil:1, descripcion:'Permiso 1'},
			PERMISO_2:{idMenu: 2, idPerfil:2, descripcion:'Permiso 2'},
			PERMISO_3:{idMenu: 3, idPerfil:3, descripcion:'Permiso 3'}
		};

		var testEstado={
			ESTADO_1:{idEstado:1, descripcion:'Habilitado', alias:'H'},
			ESTADO_2:{idEstado:2, descripcion:'Deshabilitado', alias:'D'},
			ESTADO_3:{idEstado:3, descripcion:'Deshabilitado Temporalmente', alias:'T'}
		};
        
        //---- /VARIABLES PRIVADAS ----//

        //---- VARIABLES PUBLICAS ----//
        ng.mensajes = APP.DATA.MENSAJES;
        ng.mostrarPreloadGenerar=false;
        ng.listaFiltro=[];
        // ng.listaPerfil=[];
        ng.listaEstado=[];
        // ng.disabledPerfil=false;
        

        //---- Reportes ----//
        ng.reportes = {
            exportar: {
                reporte1: {
                    posicion: 'left',
                    opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
                    urlDescarga: ashx.exportar,
                    metodoPr: prRemoto+metodos.exportar.reporte1
                },
                reporte2: {
                    posicion: 'left',
                    opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
                    urlDescarga: ashx.exportar,
                    metodoPr: prRemoto+metodos.exportar.reporte2
                },
                reporte3a: {
                    posicion: 'left',
                    opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
                    urlDescarga: ashx.exportar,
                    metodoPr: prRemoto+metodos.exportar.reporte3a
                },
                reporte3b: {
                    posicion: 'left',
                    opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
                    urlDescarga: ashx.exportar,
                    metodoPr: prRemoto+metodos.exportar.reporte3b
                },
                reporte4a: {
                    posicion: 'left',
                    opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
                    urlDescarga: ashx.exportar,
                    metodoPr: prRemoto+metodos.exportar.reporte4a
                },
                reporte4b: {
                    posicion: 'left',
                    opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
                    urlDescarga: ashx.exportar,
                    metodoPr: prRemoto+metodos.exportar.reporte4b
                },
                reporte5: {
                    posicion: 'left',
                    opciones: [{archivo: globalFactory.tipoDocExportar.excel}],
                    urlDescarga: ashx.exportar,
                    metodoPr: prRemoto+metodos.exportar.reporte5
                }
            },
            imprimir: {
                plantillas: {
                    reporte1:'repReporteUsuario1.html',
                    reporte2:'repReporteUsuario2.html',
                    reporte3a:'repReporteUsuario3a.html',
                    reporte3b:'repReporteUsuario3b.html',
                    reporte4a:'repReporteUsuario4a.html',
                    reporte4b:'repReporteUsuario4b.html',
                    reporte5:'repReporteUsuario5.html',
                }
            }/*,
            descarga: {
                cuentaBase: {
                    url: 'Descarga/DescargaArchivoASHX.aspx',
                    metodo: 'liqAnaAnalizarSolicitudLiquidacion.aspx/DescargaArchivoPorASHX',
                }
            },*/
        };

        //---- /Reportes ----//

        //---- Alertas ----//
        ng.alertaReporteVacio = {
            mensaje: mensajes.NOT006,
            tipo: 'info',
            mostrar: false,
            ocultar: { auto: false, click: false, tiempo: 0 }
        };

        //---- /Alertas ----//
        
        //---- /VARIABLES PUBLICAS ----//

        //---- FUNCIONES PRIVADAS ----//

        var mostrarMensajeFlotante = function (tipo, mensaje, oculto) {
            alertsFactory.alerta({
                tipo: tipo,
                mensaje: mensaje,
                oculto: oculto
            });
        };

        var ocultarReportes=function(){
            // ng.mostrarResultados1=false;
            // ng.mostrarResultados2=false;
            // ng.mostrarResultados3a=false;
            // ng.mostrarResultados3b=false;
            // ng.mostrarResultados4a=false;
            // ng.mostrarResultados4b=false;
            // ng.mostrarResultados5=false;
            ng.listaReporte1=[];
            ng.listaReporte2=[];
            ng.listaReporte3a=[];
            ng.listaReporte3b=[];
            ng.listaReporte4a=[];
            ng.listaReporte4b=[];
            ng.listaReporte5=[];
        };

        var resetearReportes=function(){
            ng.modeloReporte1={
                cedula:null,
                nombres:null,
                apellidos:null,
                fechaActivacionInicio:new Date(),
                fechaActivacionFin:new Date(),
                motivo:null
            };
            ng.modeloReporte2={
                descripcion:null,
                motivo:null,
                fechaCreacionInicio:new Date(),
                fechaCreacionFin:new Date(),
                fechaModificacionInicio:new Date(),
                fechaModificacionFin:new Date()
            };
            ng.modeloReporte3={
                accion:constantes.acciones.usuario,
                fechaInicio:new Date(),
                fechaFin:new Date(),
            };
            ng.modeloReporte4={
                accion:constantes.acciones.fecha,
                fechaInicio:new Date(),
                fechaFin:new Date(),
                cantidadCreados:null,
                cantidadModificados:null,
                cantidadHabilitados:null,
                cantidadDeshabilitados:null,
                cantidadDeshabilitadosTemporalmente:null
            };
            ng.modeloReporte5={
                cedula:null,
                nombres:null,
                apellidos: null
               
            };
        };

        var obtenerListaFiltro = function(){
            ng.listaFiltro.push({idFiltro:constantes.idSeleccione, descripcion:mensajes.MSG002});
            ng.modeloFiltro = ng.listaFiltro[0];
            angular.forEach(enumFiltros,function(value,key){
                ng.listaFiltro.push({idFiltro:value.idFiltro, descripcion:value.descripcion});
            });
        };

        var resetearListaPerfil=function(){
            ng.listaPerfil=[];
            ng.listaPerfil.push({idPerfil:constantes.idSeleccione, descripcion:mensajes.MSG004});
            ng.modeloPerfil = ng.listaPerfil[0];
            ng.modeloReporte5.modeloPerfil = ng.listaPerfil[0];
            ng.disabledPerfil=false;
        };

        var resetearListaPermiso=function(){
            ng.listaPermiso=[];
            ng.listaPermiso.push({idMenu:constantes.idSeleccione, nombre:mensajes.MSG004, descripcion:mensajes.MSG004});
            ng.modeloPermiso = ng.listaPermiso[0];
            ng.modeloReporte5.modeloPermiso = ng.listaPermiso[0];
            ng.disabledPermiso=false;
        };

        var resetearListaEstado=function(){
            ng.listaEstado=[];
            ng.listaEstado.push({idEstado:constantes.idSeleccione, descripcion:mensajes.MSG004});
            ng.modeloEstado = ng.listaEstado[0];
            ng.modeloReporte5.modeloEstado = ng.listaEstado[0];
            ng.disabledEstado=false;
        };

        var obtenerListaPerfil = function(){
            resetearListaPerfil();
            // angular.forEach(testPerfil,function(value,key){
            //     ng.listaPerfil.push({idPerfil:value.idPerfil, descripcion:value.descripcion});
            // });
            ajaxFactory.consultar(prRemoto + metodos.obtenerPerfil, {}, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        ng.disabledPerfil=false;
                        angular.forEach(data.lista,function(value,key){
                            ng.listaPerfil.push(value);
                        });
                        ng.listaPerfil[0].descripcion = mensajes.MSG004;
                        ng.modeloPerfil = ng.listaPerfil[0];
                        ng.modeloReporte5.modeloPerfil = ng.listaPerfil[0]
                    }
                });
                }, function (error) {

                }, function () {
                    ng.disabledPerfil=true;
                    ng.listaPerfil[0].descripcion = mensajes.SYS003;
                }
            );
        };

        var obtenerListaPermiso = function(idPerfil){
            // resetearListaPermiso();
            // angular.forEach(testPermiso,function(value,key){
            // 	if(value.idPerfil===idPerfil){
            // 		ng.listaPermiso.push({idMenu:value.idMenu, descripcion:value.descripcion});
            // 	}
            // });
            var parametros={
            	idPerfil:idPerfil
            };
            ajaxFactory.consultar(prRemoto + metodos.obtenerPermiso, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        ng.disabledPermiso=false;
                        angular.forEach(data.lista,function(value,key){
                            ng.listaPermiso.push(value);
                        });
                        ng.listaPermiso[0].descripcion = mensajes.MSG004;
                        ng.modeloPermiso = ng.listaPermiso[0];
                        ng.modeloReporte5.modeloPermiso = ng.listaPermiso[0];
                    }
                });
                }, function (error) {

                }, function () {
                    ng.disabledPermiso=true;
                    ng.listaPermiso[0].descripcion = mensajes.SYS003;
                }
            );
        };

        var obtenerListaEstado = function(){
            resetearListaEstado();
            angular.forEach(testEstado,function(value,key){
                ng.listaEstado.push({idEstado:value.idEstado, descripcion:value.descripcion, alias:value.alias});
            });
            // ajaxFactory.consultar(prRemoto + metodos.obtenerEstado, {}, function (data) {
            //     ng.safeApply(function () {
            //         if (data && data.success) {
            //             ng.disabledEstado=false;
            //             angular.forEach(data.lista,function(value,key){
            //                 ng.listaEstado.push(value);
            //             });
            //             ng.listaEstado[0].descripcion = mensajes.MSG002;
            //             ng.modeloEstado = ng.listaEstado[0];
            //         }
            //     });
            //     }, function (error) {

            //     }, function () {
            //         ng.disabledEstado=true;
            //         ng.listaEstado[0].descripcion = mensajes.SYS003;
            //     }
            // );
        };

        var obtenerReporte1 = function () {

            
            ocultarReportes();
           // ng.listaReporte1 = [];
            var parametros={
                numeroCedula:ng.modeloReporte1.cedula===''?null:ng.modeloReporte1.cedula,
                nombre:ng.modeloReporte1.nombres===''?null:ng.modeloReporte1.nombres,
                apellido:ng.modeloReporte1.apellidos===''?null:ng.modeloReporte1.apellidos,
                idPerfil:ng.modeloPerfil.idPerfil===constantes.idSeleccione?null:ng.modeloPerfil.idPerfil,
                idMenu:ng.modeloPermiso.idMenu===constantes.idSeleccione?null:ng.modeloPermiso.idMenu,
                estadoUsuario:ng.modeloEstado.idEstado===constantes.idSeleccione?null:ng.modeloEstado.alias,
                fechaActivacionInicio:ng.modeloReporte1.fechaActivacionInicio===undefined?null:moment(ng.modeloReporte1.fechaActivacionInicio).format('DD/MM/YYYY'),
                fechaActivacionFin: ng.modeloReporte1.fechaActivacionFin === undefined ? null : moment(ng.modeloReporte1.fechaActivacionFin).format('DD/MM/YYYY'),
                motivoCambioUsuario: ng.modeloReporte1.motivo === undefined ? null : ng.modeloReporte1.motivo
            };

            var parametrosExportar = {
                numeroCedula: ng.modeloReporte1.cedula === '' ? null : ng.modeloReporte1.cedula,
                nombre: ng.modeloReporte1.nombres === '' ? null : ng.modeloReporte1.nombres,
                apellido: ng.modeloReporte1.apellidos === '' ? null : ng.modeloReporte1.apellidos,
                idPerfil: ng.modeloPerfil.idPerfil === constantes.idSeleccione ? null : ng.modeloPerfil.idPerfil,
                idMenu: ng.modeloPermiso.idMenu === constantes.idSeleccione ? null : ng.modeloPermiso.idMenu,
                estadoUsuario: ng.modeloEstado.idEstado === constantes.idSeleccione ? null : ng.modeloEstado.alias,
                estadoUsuarioDescripcion: ng.modeloEstado.idEstado === constantes.idSeleccione ? null : ng.modeloEstado.descripcion,
                fechaActivacionInicio: ng.modeloReporte1.fechaActivacionInicio === undefined ? null : moment(ng.modeloReporte1.fechaActivacionInicio).format('DD/MM/YYYY'),
                fechaActivacionFin: ng.modeloReporte1.fechaActivacionFin === undefined ? null : moment(ng.modeloReporte1.fechaActivacionFin).format('DD/MM/YYYY'),
                motivoCambioUsuario: ng.modeloReporte1.motivo === undefined || ng.modeloReporte1.motivo == '' ? null : ng.modeloReporte1.motivo
            };

            ng.parametrosExport = angular.copy(parametrosExportar);
            ajaxFactory.consultar(prRemoto + metodos.obtenerReporte1, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        var listaReporte1=data.lista;
                        //var arbolReporte = llenarReporte1Arbol(listaReporte1);
                        //ng.listaReporte1 = llenarReporte1(arbolReporte);
                        ng.listaReporte1 = listaReporte1;
                       
                        ng.listaTablaExiste = [];
                        ng.listaTablaExisteNombres = [];
                        ng.listaTablaExisteFecha = [];
                        ng.listaTablaFecha = [];
                        ng.listaTablaExisteEstado = [];
                        ng.listaTabla = [];
                        ng.listaTablaNombres = [];
                        ng.listaTablaEstado = [];
                        ng.listaIncremental = [];
                        repeticiones = 0;
                        repeticionesNombre = 0;
                        repeticionesFecha = 0;
                        repeticionesEstado = 0;
                        incrementoUnidad = 1;

                        angular.forEach(ng.listaReporte1, function (value, key) {
                            ng.BuscarCombinaciones(value, key);
                            ng.BuscarIncremental(value, key);
                        });
                        ng.alertaReporteVacio.mostrar=(data.lista.length<1)?true:false; 
                    }else{
                        mostrarMensajeFlotante(mensajes.ERROR, mensajes.ERR001, false);
                    }
                    ng.mostrarPreloadGenerar=false; 
                });
                }, function (error) {

                }, function () {
                    ng.mostrarPreloadGenerar=true;    
                }
            );    
        };
        

        ng.listaReporte1 = [];
        ng.listaTablaExiste = [];
        ng.listaTablaExisteNombres = [];
        ng.listaTablaExisteFecha = [];
        ng.listaTablaFecha = [];
        ng.listaTablaExisteEstado = [];
        ng.listaTabla = [];
        ng.listaTablaNombres = [];
        
        ng.listaTablaEstado = [];
        ng.listaIncremental = [];
        var repeticiones = 0;
        var repeticionesNombre = 0;
        var repeticionesFecha = 0;
        var repeticionesEstado = 0;
        var incrementoUnidad = 1;

        ng.BuscarIncremental = function (value, key) {
            var i = key + 1;
            if (ng.listaReporte1[i] != undefined) 
            {
                if (ng.listaReporte1[i].numeroCedula == value.numeroCedula)
                { ng.listaIncremental.push({ incremento: incrementoUnidad }); }
                else
                { incrementoUnidad = incrementoUnidad + 1; ng.listaIncremental.push({ incremento: incrementoUnidad }); }
            }
        };

        ng.BuscarCombinacionesLista = function (value, key) {
            for (var i = key; i < ng.listaReporte1.length; i++) {
                if (ng.listaReporte1[i].numeroCedula == value.numeroCedula) {
                    repeticiones = repeticiones + 1;
                };
            };
        };

        ng.BuscarCombinacionesListaNombre = function (value, key) {
            for (var i = key; i < ng.listaReporte1.length; i++) {
                if (ng.listaReporte1[i].nombreApellido == value.nombreApellido) {
                    repeticionesNombre = repeticionesNombre  + 1;
                };
            };
        };

        ng.BuscarCombinacionesListaFecha = function (value, key) {
            for (var i = key; i < ng.listaReporte1.length; i++) {
                if (ng.listaReporte1[i].fechaActivacion == value.fechaActivacion && ng.listaReporte1[i].numeracion==value.numeracion) {
                    repeticionesFecha = repeticionesFecha + 1;
                };
            };
        };

        ng.BuscarCombinacionesListaEstado = function (value, key) {
            for (var i = key; i < ng.listaReporte1.length; i++) {
                if (ng.listaReporte1[i].estadoUsuario == value.estadoUsuario && ng.listaReporte1[i].numeracion == value.numeracion) {
                    repeticionesEstado = repeticionesEstado + 1;
                };
            };
        };

        ng.BuscarRepetido = function (value) {
            for (var i = 0; i < ng.listaTablaExiste.length; i++) {
                if (ng.listaTablaExiste[i].numeroCedula == value.numeroCedula) {
                    ng.existeListaTablaExiste = true;
                };
            };
            for (var i = 0; i < ng.listaTablaExisteNombres.length; i++) {
                if (ng.listaTablaExisteNombres[i].nombreApellido == value.nombreApellido) {
                    ng.existeListaTablaExisteNombres = true;
                };
            };
            for (var i = 0; i < ng.listaTablaExisteFecha.length; i++) {
                if (ng.listaTablaExisteFecha[i].fechaActivacion == value.fechaActivacion && ng.listaTablaExisteFecha[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExisteFecha = true;
                };
            };
            for (var i = 0; i < ng.listaTablaExisteEstado.length; i++) {
                if (ng.listaTablaExisteEstado[i].estadoUsuario == value.estadoUsuario && ng.listaTablaExisteEstado[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExisteEstado = true;
                };
            };
        };

        ng.BuscarCombinaciones = function (value, key) {
            ng.existeListaTablaExiste = false;
            ng.existeListaTablaExisteNombres = false;
            ng.existeListaTablaExisteEstado = false;
            ng.existeListaTablaExisteFecha = false;
            ng.BuscarRepetido(value);

            if (ng.existeListaTablaExiste) {
                ng.listaTabla.push({ combinado: 1, oculto: false });
            }
            else {
                repeticiones = 0;
                ng.listaTablaExiste.push({ numeroCedula: value.numeroCedula });
                ng.BuscarCombinacionesLista(value, key);
                ng.listaTabla.push({ combinado: ((repeticiones == 0) ? 1 : repeticiones), oculto: true });
            };

            if (ng.existeListaTablaExisteNombres) {
                ng.listaTablaNombres.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesNombre = 0;
                ng.listaTablaExisteNombres.push({ nombreApellido: value.nombreApellido });
                ng.BuscarCombinacionesListaNombre(value, key);
                ng.listaTablaNombres.push({ combinado: ((repeticionesNombre == 0) ? 1 : repeticionesNombre), oculto: true });
            };

            if (ng.existeListaTablaExisteFecha) {
                ng.listaTablaFecha.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesFecha = 0;
                ng.listaTablaExisteFecha.push({ fechaActivacion: value.fechaActivacion, numeracion: value.numeracion});
                ng.BuscarCombinacionesListaFecha(value, key);
                ng.listaTablaFecha.push({ combinado: ((repeticionesFecha == 0) ? 1 : repeticionesFecha), oculto: true });
            };

            if (ng.existeListaTablaExisteEstado) {
                ng.listaTablaEstado.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesEstado = 0;
                ng.listaTablaExisteEstado.push({ estadoUsuario: value.estadoUsuario, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaEstado(value, key);
                ng.listaTablaEstado.push({ combinado: ((repeticionesEstado == 0) ? 1 : repeticionesEstado), oculto: true });
            };

        };

        var obtenerReporte2=function(){
            ocultarReportes();
            var parametros={
                idPerfil:ng.modeloPerfil.idPerfil===constantes.idSeleccione?null:ng.modeloPerfil.idPerfil,
                idMenu:ng.modeloPermiso.idMenu===constantes.idSeleccione?null:ng.modeloPermiso.idMenu,
                fechaCreacionInicio:ng.modeloReporte2.fechaCreacionInicio===undefined?null:moment(ng.modeloReporte2.fechaCreacionInicio).format('DD/MM/YYYY'),
                fechaCreacionFin:ng.modeloReporte2.fechaCreacionFin===undefined?null:moment(ng.modeloReporte2.fechaCreacionFin).format('DD/MM/YYYY'),
                fechaModificacioInicio:ng.modeloReporte2.fechaModificacionInicio===undefined?null:moment(ng.modeloReporte2.fechaModificacionInicio).format('DD/MM/YYYY'),
                fechaModificacionFin:ng.modeloReporte2.fechaModificacionFin===undefined?null:moment(ng.modeloReporte2.fechaModificacionFin).format('DD/MM/YYYY'),
                descripcion: ng.modeloReporte2.descripcion == "" || ng.modeloReporte2.descripcion == undefined ? null : ng.modeloReporte2.descripcion,
                motivoCambio: ng.modeloReporte2.motivo == undefined || ng.modeloReporte2.motivo == "" ? null : ng.modeloReporte2.motivo
            };
            //console.log('ng.modeloPerfil.idPerfil:', ng.modeloPerfil.idPerfil);
            //console.log('parametros:', parametros);
            ng.parametrosExport = angular.copy(parametros);
           // console.log(ng.parametrosExport);
            ajaxFactory.consultar(prRemoto + metodos.obtenerReporte2, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {  
                        var listaReporte2=data.lista;
                        //var arbolReporte2 = llenarReporte2Arbol(listaReporte2);
                        //ng.listaReporte2 = llenarReporte2(arbolReporte2);
                        ng.listaReporte2 = listaReporte2;
                        ng.listaTablaPerfil = [];
                        ng.listaTablaPermisos = [];
                        ng.listaTablaDescripcion = [];
                        ng.listaTablaFechaCreacion = [];
                        
                        ng.listaTablaPerfil = [];
                        ng.listaTablaPermisos = [];
                        ng.listaTablaDescripcion = [];
                        ng.listaTablaFechaCreacion = [];

                        ng.listaTablaExistePerfil = [];
                        ng.listaTablaExistePermisos = [];
                        ng.listaTablaExisteDescripcion = [];
                        ng.listaTablaExisteFechaCreacion = [];

                        repeticionesFechaCreacion = 0;
                        repeticionesPerfil = 0;
                        repeticionesPermisos = 0;
                        repeticionesDescripcion = 0;

                        incrementoUnidad = 1;
                        angular.forEach(ng.listaReporte2, function (value, key) {
                            ng.BuscarCombinacionesPerfil(value, key);
                        });
                        ng.alertaReporteVacio.mostrar = (data.lista.length < 1) ? true : false;
                    }else{
                        mostrarMensajeFlotante(mensajes.ERROR, mensajes.ERR001, false);
                    }
                    ng.mostrarPreloadGenerar=false; 
                });
                }, function (error) {

                }, function () {
                    ng.mostrarPreloadGenerar=true;    
                }
            );    
        };

        ng.existeListaTablaExistePerfil = false;
        ng.existeListaTablaExistePermisos = false;
        ng.existeListaTablaExisteDescripcion = false;
        ng.existeListaTablaExisteFechaCreacion = false;

        ng.listaTablaExistePerfil = [];
        ng.listaTablaExistePermisos = [];
        ng.listaTablaExisteDescripcion = [];
        ng.listaTablaExisteFechaCreacion = [];

        ng.listaTablaPerfil = [];
        ng.listaTablaPermisos = [];
        ng.listaTablaDescripcion = [];
        ng.listaTablaFechaCreacion = [];

        var repeticionesFechaCreacion = 0;
        var repeticionesPerfil = 0;
        var repeticionesPermisos = 0;
        var repeticionesDescripcion = 0;

        ng.BuscarCombinacionesListaPermisos = function (value, key) {
            for (var i = key; i < ng.listaReporte2.length; i++) {
                if (angular.equals(ng.listaReporte2[i].permisosAsociados, value.permisosAsociados) && ng.listaReporte2[i].numeracion == value.numeracion)
                    repeticionesPermisos = repeticionesPermisos + 1;
            };
        };

        ng.BuscarCombinacionesListaDescripcion = function (value, key) {
            for (var i = key; i < ng.listaReporte2.length; i++) {
                if (ng.listaReporte2[i].descripcionPerfil == value.descripcionPerfil && ng.listaReporte2[i].numeracion == value.numeracion)
                {
                    repeticionesDescripcion = repeticionesDescripcion + 1;
                };
            };
        };

        ng.BuscarCombinacionesListaFechaCreacion = function (value, key) {
            for (var i = key; i < ng.listaReporte2.length; i++) {
                if (ng.listaReporte2[i].fechaCreacion == value.fechaCreacion && ng.listaReporte2[i].numeracion == value.numeracion) {
                    repeticionesFechaCreacion = repeticionesFechaCreacion + 1;
                };
            };
        };

        ng.BuscarCombinacionesListaPerfil = function (value, key) {
            for (var i = key; i < ng.listaReporte2.length; i++) {
                if (ng.listaReporte2[i].nombrePerfil == value.nombrePerfil && ng.listaReporte2[i].numeracion == value.numeracion) {
                    repeticionesPerfil = repeticionesPerfil + 1;
                };
            };
        };

        ng.BuscarRepetidoPerfil = function (value) {
            //existeListaTablaExistePerfil
            for (var i = 0; i < ng.listaTablaExistePerfil.length; i++) {
                if (ng.listaTablaExistePerfil[i].nombrePerfil == value.nombrePerfil && ng.listaTablaExistePerfil[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExistePerfil = true;
                };
            };

            
            for (var i = 0; i < ng.listaTablaExistePermisos.length; i++) {
                //if (ng.listaTablaExistePermisos[i].permisosAsociados == value.permisosAsociados && ng.listaTablaExistePermisos[i].numeracion == value.numeracion)
                if (angular.equals(ng.listaTablaExistePermisos[i].permisosAsociados, value.permisosAsociados) && ng.listaTablaExistePermisos[i].numeracion == value.numeracion)
                {
                    ng.existeListaTablaExistePermisos = true;
                };
            };
            for (var i = 0; i < ng.listaTablaExisteDescripcion.length; i++) {
                if (ng.listaTablaExisteDescripcion[i].descripcionPerfil == value.descripcionPerfil && ng.listaTablaExisteDescripcion[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExisteDescripcion = true;
                };
            };
            for (var i = 0; i < ng.listaTablaExisteFechaCreacion.length; i++) {
                if (ng.listaTablaExisteFechaCreacion[i].fechaCreacion == value.fechaCreacion && ng.listaTablaExisteFechaCreacion[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExisteFechaCreacion = true;
                };
            };
        };

        ng.BuscarCombinacionesPerfil = function (value, key) {
            ng.existeListaTablaExistePerfil = false;
            ng.existeListaTablaExistePermisos = false;
            ng.existeListaTablaExisteDescripcion = false;
            ng.existeListaTablaExisteFechaCreacion = false;

            ng.BuscarRepetidoPerfil(value);

            if (ng.existeListaTablaExistePerfil) {
                ng.listaTablaPerfil.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesPerfil = 0;
                ng.listaTablaExistePerfil.push({ nombrePerfil: value.nombrePerfil, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaPerfil(value, key);
                ng.listaTablaPerfil.push({ combinado: ((repeticionesPerfil == 0) ? 1 : repeticionesPerfil), oculto: true });                
            };

            if (ng.existeListaTablaExistePermisos) {
                ng.listaTablaPermisos.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesPermisos = 0;
                ng.listaTablaExistePermisos.push({ permisosAsociados: value.permisosAsociados, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaPermisos(value, key);
                ng.listaTablaPermisos.push({ combinado: ((repeticionesPermisos == 0) ? 1 : repeticionesPermisos), oculto: true });
            };

            if (ng.existeListaTablaExisteDescripcion) {
                ng.listaTablaDescripcion.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesDescripcion = 0;
                ng.listaTablaExisteDescripcion.push({ descripcionPerfil: value.descripcionPerfil, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaDescripcion(value, key);
                ng.listaTablaDescripcion.push({ combinado: ((repeticionesDescripcion == 0) ? 1 : repeticionesDescripcion), oculto: true });
            };

            if (ng.existeListaTablaExisteFechaCreacion) {
                ng.listaTablaFechaCreacion.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesFechaCreacion = 0;
                ng.listaTablaExisteFechaCreacion.push({ fechaCreacion: value.fechaCreacion, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaFechaCreacion(value, key);
                ng.listaTablaFechaCreacion.push({ combinado: ((repeticionesFechaCreacion == 0) ? 1 : repeticionesFechaCreacion), oculto: true });
            };
        };

        var obtenerReporte3a=function(){
            ocultarReportes();
            var parametros={
                fechaAccionInicio:ng.modeloReporte3.fechaInicio===undefined?null:moment(ng.modeloReporte3.fechaInicio).format('DD/MM/YYYY'),
                fechaAccionFin:ng.modeloReporte3.fechaFin===undefined?null:moment(ng.modeloReporte3.fechaFin).format('DD/MM/YYYY')
            };
            ng.parametrosExport = angular.copy(parametros);
            ajaxFactory.consultar(prRemoto + metodos.obtenerReporte3a, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        var listaReporte3a=data.lista;
                        var arbolReporte3a = llenarReporte1Arbol(listaReporte3a);
                        ng.listaReporte3a = llenarReporte1(arbolReporte3a);
                        ng.alertaReporteVacio.mostrar=(data.lista.length<1)?true:false; 
                    }else{
                        mostrarMemostrarMensajeFlotante(mensajes.ERROR, mensajes.ERR001, false);
                    }
                    ng.mostrarPreloadGenerar=false;
                });
                }, function (error) {

                }, function () {
                    ng.mostrarPreloadGenerar=true;
                }
            );    
        };
        
        var obtenerReporte3b=function(){
            ocultarReportes();
            var parametros={
                fechaAccionInicio:ng.modeloReporte3.fechaInicio===undefined?null:moment(ng.modeloReporte3.fechaInicio).format('DD/MM/YYYY'),
                fechaAccionFin:ng.modeloReporte3.fechaFin===undefined?null:moment(ng.modeloReporte3.fechaFin).format('DD/MM/YYYY')
            };
            ng.parametrosExport = angular.copy(parametros);
            ajaxFactory.consultar(prRemoto + metodos.obtenerReporte3b, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        var listaReporte3b=data.lista;
                        var arbolReporte3b = llenarReporte2Arbol(listaReporte3b);
                        ng.listaReporte3b = llenarReporte2(arbolReporte3b);
                        ng.alertaReporteVacio.mostrar=(data.lista.length<1)?true:false;
                    }else{
                        mostrarMensajeFlotante(mensajes.ERROR, mensajes.ERR001, false);
                    }
                    ng.mostrarPreloadGenerar=false; 
                });
                }, function (error) {

                }, function () {
                    ng.mostrarPreloadGenerar=true;    
                }
            );    
        };

        var obtenerReporte4a=function(){
            ocultarReportes();
            var parametros={
                fechaAccionInicio:ng.modeloReporte4.fechaInicio===undefined?null:moment(ng.modeloReporte4.fechaInicio).format('DD/MM/YYYY'),
                fechaAccionFin:ng.modeloReporte4.fechaFin===undefined?null:moment(ng.modeloReporte4.fechaFin).format('DD/MM/YYYY')
            };
            ng.parametrosExport = angular.copy(parametros);
            ajaxFactory.consultar(prRemoto + metodos.obtenerReporte4a, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        ng.listaReporte4a.push('mostrar');
                        ng.modeloReporte4.cantidadCreados=data.cantidadUsuariosCreados;
                        ng.modeloReporte4.cantidadModificados=data.cantidadUsuariosModificados;
                        ng.modeloReporte4.cantidadHabilitados=null;
                        ng.modeloReporte4.cantidadDeshabilitados=null;
                        ng.modeloReporte4.cantidadDeshabilitadosTemporalmente=null;
                    }else{
                        mostrarMensajeFlotante(mensajes.ERROR, mensajes.ERR001, false);
                    }
                    ng.mostrarPreloadGenerar=false; 
                });
                }, function (error) {

                }, function () {
                    ng.mostrarPreloadGenerar=true;    
                }
            );    
        };

        var obtenerReporte4b=function(){
            ocultarReportes();
            var parametros={
                fechaAccionInicio:ng.modeloReporte4.fechaInicio===undefined?null:moment(ng.modeloReporte4.fechaInicio).format('DD/MM/YYYY'),
                fechaAccionFin:ng.modeloReporte4.fechaFin===undefined?null:moment(ng.modeloReporte4.fechaFin).format('DD/MM/YYYY')
            };
            ng.parametrosExport = angular.copy(parametros);
            ajaxFactory.consultar(prRemoto + metodos.obtenerReporte4b, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        ng.listaReporte4b.push('mostrar');
                        ng.modeloReporte4.cantidadCreados=null;
                        ng.modeloReporte4.cantidadModificados=null;
                        ng.modeloReporte4.cantidadHabilitados=data.cantidadUsuariosHabilitados;
                        ng.modeloReporte4.cantidadDeshabilitados=data.cantidadUsuariosDeshabilitados;
                        ng.modeloReporte4.cantidadDeshabilitadosTemporalmente=data.cantidadUsuariosDeshabilitadosTemporalmente;
                    }else{
                        mostrarMensajeFlotante(mensajes.ERROR, mensajes.ERR001, false);
                    }
                    ng.mostrarPreloadGenerar=false; 
                });
                }, function (error) {

                }, function () {
                    ng.mostrarPreloadGenerar=true;    
                }
            );    
        };


        ng.existeListaTablaExisteCedula = false;
        ng.existeListaTablaExisteNombre = false;
        //ng.existeListaTablaExistePerfil = false;
        //ng.existeListaTablaExistePermisos = false;

        ng.listaTablaExisteCedula = [];
        ng.listaTablaExisteNombre = [];
        //ng.listaTablaExistePerfil = [];
        //ng.listaTablaExistePermisos = [];

        ng.listaTablaCedula = [];
        ng.listaTablaNombre = [];
        //ng.listaTablaPerfil = [];
        //ng.listaTablaPermisos = [];

        var repeticionesCedula = 0;
        var repeticionesPerfil = 0;
        var repeticionesPermisos = 0;
        var repeticionesNombre = 0;

        ng.BuscarCombinacionesListaCedula = function (value, key) {
            for (var i = key; i < ng.listaReporte5.length; i++) {
                if (ng.listaReporte5[i].numeroCedula == value.numeroCedula && ng.listaReporte5[i].numeracion == value.numeracion) {
                    repeticionesCedula = repeticionesCedula + 1;
                };
            };
        };

        ng.BuscarCombinacionesListaPermisosHistorico = function (value, key) {
            for (var i = key; i < ng.listaReporte5.length; i++) {
                if (angular.equals(ng.listaReporte5[i].permisosAsociados, value.permisosAsociados) && ng.listaReporte5[i].numeracion == value.numeracion)
                    repeticionesPermisos = repeticionesPermisos + 1;
            };
        };

        ng.BuscarCombinacionesListaPerfilHistorico = function (value, key) {
            for (var i = key; i < ng.listaReporte5.length; i++) {
                if (ng.listaReporte5[i].perfil == value.perfil && ng.listaReporte5[i].numeracion == value.numeracion) {
                    repeticionesPerfil = repeticionesPerfil + 1;
                };
            };
        }; 

        ng.BuscarCombinacionesListaNombreHistorico = function (value, key) {
            for (var i = key; i < ng.listaReporte5.length; i++) {
                if (ng.listaReporte5[i].nombreApellido == value.nombreApellido && ng.listaReporte5[i].numeracion == value.numeracion) {
                    repeticionesNombre = repeticionesNombre + 1;
                };
            };
        };

        ng.BuscarRepetidoHistorico = function (value) {
            //existeListaTablaExistePerfil
            for (var i = 0; i < ng.listaTablaExisteCedula.length; i++) {
                if (ng.listaTablaExisteCedula[i].numeroCedula == value.numeroCedula && ng.listaTablaExisteCedula[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExisteCedula = true;
                };
            };

            for (var i = 0; i < ng.listaTablaExistePermisos.length; i++) {
                //if (ng.listaTablaExistePermisos[i].permisosAsociados == value.permisosAsociados && ng.listaTablaExistePermisos[i].numeracion == value.numeracion)
                if (angular.equals(ng.listaTablaExistePermisos[i].permisosAsociados, value.permisosAsociados) && ng.listaTablaExistePermisos[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExistePermisos = true;
                };
            };
            for (var i = 0; i < ng.listaTablaExistePerfil.length; i++) {
                if (ng.listaTablaExistePerfil[i].perfil == value.perfil && ng.listaTablaExistePerfil[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExistePerfil = true;
                };
            };
            for (var i = 0; i < ng.listaTablaExisteNombre.length; i++) {
                if (ng.listaTablaExisteNombre[i].nombreApellido == value.nombreApellido && ng.listaTablaExisteNombre[i].numeracion == value.numeracion) {
                    ng.existeListaTablaExisteNombre = true;
                };
            };
        };

        ng.BuscarCombinacionesHistorico = function (value, key)
        {
            ng.existeListaTablaExisteCedula = false;
            ng.existeListaTablaExisteNombre = false;
            ng.existeListaTablaExistePerfil = false;
            ng.existeListaTablaExistePermisos = false;

            ng.BuscarRepetidoHistorico(value);

            if (ng.existeListaTablaExisteCedula) {
                ng.listaTablaCedula.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesCedula = 0;
                ng.listaTablaExisteCedula.push({ numeroCedula: value.numeroCedula, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaCedula(value, key);
                ng.listaTablaCedula.push({ combinado: ((repeticionesCedula == 0) ? 1 : repeticionesCedula), oculto: true });
            };

            if (ng.existeListaTablaExistePermisos) {
                ng.listaTablaPermisos.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesPermisos = 0;
                ng.listaTablaExistePermisos.push({ permisosAsociados: value.permisosAsociados, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaPermisosHistorico(value, key);
                ng.listaTablaPermisos.push({ combinado: ((repeticionesPermisos == 0) ? 1 : repeticionesPermisos), oculto: true });
            };

            if (ng.existeListaTablaExistePerfil) {
                ng.listaTablaPerfil.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesPerfil = 0;
                ng.listaTablaExistePerfil.push({ perfil: value.perfil, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaPerfilHistorico(value, key);
                ng.listaTablaPerfil.push({ combinado: ((repeticionesPerfil == 0) ? 1 : repeticionesPerfil), oculto: true });
            };

            if (ng.existeListaTablaExisteNombre) {
                ng.listaTablaNombre.push({ combinado: 1, oculto: false });
            }
            else {
                repeticionesNombre = 0;
                ng.listaTablaExisteNombre.push({ nombreApellido: value.nombreApellido, numeracion: value.numeracion });
                ng.BuscarCombinacionesListaNombreHistorico(value, key);
                ng.listaTablaNombre.push({ combinado: ((repeticionesNombre == 0) ? 1 : repeticionesNombre), oculto: true });
            };
        };

        var obtenerReporte5 = function ()
        {
            ocultarReportes();
            var parametros={
                numeroCedula:ng.modeloReporte5.cedula===''?null:ng.modeloReporte5.cedula,
                nombre:ng.modeloReporte5.nombres===''?null:ng.modeloReporte5.nombres,
                apellido:ng.modeloReporte5.apellidos===''?null:ng.modeloReporte5.apellidos,
                idPerfil: ng.modeloReporte5.modeloPerfil.idPerfil === constantes.idSeleccione ? null : ng.modeloReporte5.modeloPerfil.idPerfil,
                idMenu: ng.modeloReporte5.modeloPermiso.idMenu === constantes.idSeleccione ? null : ng.modeloReporte5.modeloPermiso.idMenu,
                estadoUsuario: ng.modeloReporte5.modeloEstado.idEstado === constantes.idSeleccione ? null : ng.modeloReporte5.modeloEstado.alias,
            };
            ng.parametrosExport = angular.copy(parametros);
            console.log('parametrosExport:', ng.parametrosExport);
            ajaxFactory.consultar(prRemoto + metodos.obtenerReporte5, parametros, function (data) {
                ng.safeApply(function () {
                    if (data && data.success) {
                        var listaReporte5=data.lista;
                        //var arbolReporte5 = llenarReporte1Arbol(listaReporte5);
                        //ng.listaReporte5 = llenarReporte1(arbolReporte5);
                        ng.listaReporte5 = listaReporte5;
                      
                        ng.listaTablaExisteCedula = [];
                        ng.listaTablaExisteNombre = [];
                        ng.listaTablaExistePerfil = [];
                        ng.listaTablaExistePermisos = [];

                        ng.listaTablaCedula = [];
                        ng.listaTablaNombre = [];
                        ng.listaTablaPerfil = [];
                        ng.listaTablaPermisos = [];

                        repeticionesCedula = 0;
                        repeticionesPerfil = 0;
                        repeticionesPermisos = 0;
                        repeticionesNombre = 0;

                        angular.forEach(ng.listaReporte5, function (value, key) {
                            ng.BuscarCombinacionesHistorico(value, key);
                        });
                        ng.alertaReporteVacio.mostrar = (data.lista.length < 1) ? true : false;
                   } else {
                        mostrarMensajeFlotante(mensajes.ERROR, mensajes.ERR001, false);
                    }
                    ng.mostrarPreloadGenerar=false; 
                });
                }, function (error) {

                }, function () {
                    ng.mostrarPreloadGenerar=true;    
                }
            );    
        };

        var fnRowspan = function(lista){
            var num=0;
            if(lista !== undefined)
                num = lista.length;
            return num;
        };

        var listaDetallePerfil=function(lista,numeroCedula){
            var listaDetalle = [];
            var perfil='';
            angular.forEach(lista,function(value,key){
                if(value.numeroCedula == numeroCedula){
                    if(perfil != value.perfil){
                        perfil = value.perfil;
                        listaDetalle.push({
                            perfil:value.perfil,
                            permisosAsociados:value.permisosAsociados
                        });
                    }
                }
            });
            return listaDetalle;
        };

        var llenarReporte1Arbol = function(lista){
            var listado = [];
            var numeroCedula = '';
            var listaOrdenada = $filter('orderBy')(lista,'numeroCedula');
            angular.forEach(listaOrdenada,function(value,key){
                if(numeroCedula != value.numeroCedula){
                    numeroCedula = value.numeroCedula;
                    listado.push({
                        numeroCedula:numeroCedula,
                        nombreApellido:value.nombreApellido,
                        fechaActivacion:value.fechaActivacion,
                        estadoUsuario:value.estadoUsuario,
                        motivoCambioUsuario:value.motivoCambioUsuario,
                        perfil:listaDetallePerfil(lista,numeroCedula),
                        descripcionPerfil:value.descripcionPerfil
                    });
                }
            });
            return listado;
        };

        var llenarReporte2Arbol = function(lista){
            var listado = [];
            var perfil = '';
            // lo filtare por el id del perfil xD
            var listaOrdenada = $filter('orderBy')(lista,'perfil');
            angular.forEach(listaOrdenada,function(value,key){
                // listaOrdenada[key].motivoCambioUsuario.fechaModificacion='';
                // listaOrdenada[key].motivoCambioUsuario.motivoModificacion='';
                if(perfil != value.perfil){
                    perfil = value.perfil;
                    listado.push({
                        perfil:perfil,
                        nombrePerfil:value.nombrePerfil,
                        permisosAsociados:value.permisosAsociados,
                        descripcionPerfil:value.descripcionPerfil,
                        fechaCreacion:value.fechaCreacion,
                        motivoCambioUsuario:value.motivoCambioUsuario
                    });
                }
            });
            return listado;
        };

        var llenarReporte1 = function(lista){
            var listaReporte = [];
            var indiceU=0;
            angular.forEach(lista,function(value,key){
                var opcion = 'c';
                var indice = 1;
                indiceU++;
                listaReporte.push({
                    opcion:opcion,
                    numeroCedula:value.numeroCedula,
                    nombreApellido:value.nombreApellido,
                    perfil:value.perfil,
                    descripcionPerfil:value.descripcionPerfil,
                    fechaActivacion:value.fechaActivacion,
                    estadoUsuario:value.estadoUsuario,
                    motivoCambioUsuario:value.motivoCambioUsuario,
                    rowspan:fnRowspan(value.perfil)+2,
                    indice: indice,
                    indiceU: indiceU
                });
                angular.forEach(lista,function(valuePerfil,keyPerfil){
                    indice++;
                    opcion = 's';
                    listaReporte.push({
                        opcion:opcion,
                        perfil:valuePerfil.perfil,
                        descripcionPerfil:value.descripcionPerfil,
                        permisosAsociados:valuePerfil.permisosAsociados,
                        rowspan:'',
                        indice:indice
                    });
                });
            });
            return listaReporte;
        };

        var llenarReporte2 = function(lista){
            var listaReporte=[];
            var indice=0;
            angular.forEach(lista,function(value,key){
                var opcion = 'c';
                indice++;
                listaReporte.push({
                    opcion:opcion,
                    perfil:value.perfil,
                    nombrePerfil:value.nombrePerfil,
                    permisosAsociados:value.permisosAsociados,
                    descripcionPerfil:value.descripcionPerfil,
                    fechaCreacion:value.fechaCreacion,
                    motivoCambioUsuario:value.motivoCambioUsuario,
                    rowspan:fnRowspan(value.motivoCambioUsuario)+1,
                    indice:indice
                });
                angular.forEach(value.motivoCambioUsuario,function(valuePerfil,keyPerfil){
                    opcion = 's';
                    listaReporte.push({
                        opcion:opcion,
                        motivoCambioUsuario:valuePerfil,
                        rowspan:'',
                        indice:indice
                    });
                });
            });
            return listaReporte;
        };

        //---- /FUNCIONES PRIVADAS ----//

        //---- FUNCIONES PUBLICAS ----//

        ng.formatearFecha=function(fecha){
            if(fecha!==null)
                return moment(fecha).format('DD/MM/YYYY');
            else
                return '';
        };

		ng.cambiarPerfil=function(idPerfil){
            resetearListaPermiso();
            if(idPerfil>constantes.idSeleccione){
                obtenerListaPermiso(idPerfil);    
            }else{
                // console.log('bbb', idPerfil, ng.modeloPermiso);
                // resetearListaPermiso();
                // ng.listaPermiso=[];
                // ng.listaPermiso.push({idMenu:constantes.idSeleccione, idPerfil:constantes.idSeleccione, descripcion:mensajes.MSG004});
            }
		};

		ng.cambiarPermiso=function(idMenu){

		};

		ng.cambiarEstado=function(idEstado){

		};

        ng.cambiarAccion3=function(accion){

        };

        ng.cambiarAccion4=function(accion){

        };

        ng.clicGenerar=function(tipoReporte){
            switch(tipoReporte.idFiltro){
                case 1:
                    obtenerReporte1();
                    break;
                case 2:
                    obtenerReporte2();
                    break;
                case 3:
                    if(ng.modeloReporte3.accion===constantes.acciones.usuario){
                        obtenerReporte3a();
                    }else if(ng.modeloReporte3.accion===constantes.acciones.perfiles){
                        obtenerReporte3b();   
                    }
                    break;
                case 4:
                    if(ng.modeloReporte4.accion===constantes.acciones.fecha){
                        obtenerReporte4a();
                    }else if(ng.modeloReporte4.accion===constantes.acciones.estado){
                        obtenerReporte4b();
                    }
                    break;
                case 5:
                    obtenerReporte5();
                    break;
            }
        };

        ng.imprimirReporte1 = function(){
            var parametros = {
                cabecera:ng.modeloReporte1,
                lista: ng.listaReporte1,
                perfil: { descripcion: ng.modeloPerfil.descripcion },
                permiso: { descripcion: ng.modeloPermiso.descripcion },
                estado: { descripcion: ng.modeloEstado.descripcion },
                listaTabla:ng.listaTabla,
                listaTablaNombres:ng.listaTablaNombres,
                listaTablaFecha:ng.listaTablaFecha,
                listaTablaEstado:ng.listaTablaEstado
            };
            globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporte1, parametros);
        };

        ng.imprimirReporte2 = function(){
            var parametros = {
                cabecera:ng.modeloReporte2,
                lista: ng.listaReporte2,
                listaTablaPerfil:ng.listaTablaPerfil,
                listaTablaPermisos:ng.listaTablaPermisos,
                listaTablaDescripcion: ng.listaTablaDescripcion,
                listaTablaFechaCreacion: ng.listaTablaFechaCreacion,
                descripcionPerfil:ng.modeloPerfil.descripcion,
                descripcionMenu: ng.modeloPermiso.descripcion
            };
            globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporte2, parametros);
        };

        ng.imprimirReporte3 = function(tipo){
            var lista;
            if(tipo==='a'){
                lista=ng.listaReporte3a;
            }else if(tipo==='b'){
                lista=ng.listaReporte3b;
            }
            var parametros = {
                cabecera:ng.modeloReporte3,
                // perfil:ng.modeloPerfil,
                // permiso:ng.modeloPermiso,
                lista:lista
            };
            if(tipo==='a'){
                globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporte3a, parametros);
            }else if(tipo==='b'){
                globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporte3b, parametros);
            }
        };

        ng.imprimirReporte4a = function(){
            var parametros = {
                reporte:ng.modeloReporte4
            };
            globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporte4a, parametros);
        };

        ng.imprimirReporte4b = function(){
            var parametros = {
                reporte:ng.modeloReporte4
            };
            globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporte4b, parametros);
        };

        ng.imprimirReporte5 = function(){
            var parametros = {
                cabecera:ng.modeloReporte5,
                lista: ng.listaReporte5,
                listaTablaCedula   : ng.listaTablaCedula,
                listaTablaNombre   : ng.listaTablaNombre,
                listaTablaPerfil   : ng.listaTablaPerfil ,
                listaTablaPermisos: ng.listaTablaPermisos,
                perfil:ng.modeloReporte5.modeloPerfil.descripcion,
                permiso:ng.modeloReporte5.modeloPermiso.descripcion,
                estado:ng.modeloReporte5.modeloEstado.descripcion
            };
            globalFactory.popup(globalFactory.urlBase + ng.reportes.imprimir.plantillas.reporte5, parametros);
        };

        // ng.exportarReporte1 = function(tipoDocumento){
        //     if(tipoDocumento === globalFactory.tipoDocExportar.excel) parametrosExport.tipoDocumento = 0;
        //     // downloadFactory.forceDownloadPost(APP.DATA.CONFIG.URL_BASE + ng.reportes.exportar.reporte1.urlDescarga, parametrosExport);
        //     reportingFactory.descargar(APP.DATA.CONFIG.URL_BASE + ng.reportes.exportar.reporte1.urlDescarga, 'nombreReporte1', parametrosExport, 0);
        // };

        //---- /FUNCIONES PUBLICAS ----//

        //---- INICIAR ----//

        var init = function () {
            resetearReportes();
            obtenerListaFiltro();
            obtenerListaPerfil();
            resetearListaPermiso();
            obtenerListaEstado();
        };

        init();

        //---- /INICIAR ----//

        //---- UTILS ----//

        ng.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {
                if (fn && ( typeof (fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        //---- /UTILS ----//


    }]);

});