var APP = APP || {};
APP.DATA = APP.DATA || {};
/*APP.DATA.MENSAJES = [
	{id:'MSG001',descripcion:'Número de cédula tiene que ser de 9 digitos'},
	{id:'MSG002',descripcion:'Tamaño máximo, 300 caracteres'},
	{id:'MSG003',descripcion:'mensaje 3'} 
];*/
APP.DATA.MENSAJES = {};
/*** MENSAJES DE SISTEMA SYS<NUM> ***/
APP.DATA.MENSAJES.SYS001 = 'Cargando, espere un momento por favor...';
APP.DATA.MENSAJES.SYS002 = 'Procesando';
APP.DATA.MENSAJES.SYS003 = 'Cargando...';
APP.DATA.MENSAJES.SYS004 = 'Ocurrió un error en la peticion. Por favor Presionar F5';

/*** MENSAJES DE ERROR ERR<NUM> ***/
APP.DATA.MENSAJES.ERR001 = 'Ocurrió un error al traer los registros.';
APP.DATA.MENSAJES.ERR002 = 'Ocurrió un error al guardar los cambios.';
APP.DATA.MENSAJES.ERR003 = 'Ocurrió un error al obtener las horas utilizadas, inténtelo de nuevo.';
APP.DATA.MENSAJES.ERR004 = 'Ocurrió un error al obtener la plantilla.';
APP.DATA.MENSAJES.ERR004 = 'Ocurrió un error al enviar el correo electrónico.';


/*** MENSAJES PARA ESTILOS ***/
APP.DATA.MENSAJES.ERROR = 'error';
APP.DATA.MENSAJES.SUCCESS = 'success';
APP.DATA.MENSAJES.WARNING = 'warning';
APP.DATA.MENSAJES.INFO = 'info';

/*** MENSAJES GENERALES ***/
APP.DATA.MENSAJES.MSG001 = 'Campos obligatorios';
APP.DATA.MENSAJES.MSG002 = '- Seleccione -';
APP.DATA.MENSAJES.MSG003 = '- Todas -';
APP.DATA.MENSAJES.MSG004 = '- Todos -';
APP.DATA.MENSAJES.MSG005 = 'No hay campañas';
APP.DATA.MENSAJES.MSG006 = 'No hay partidos políticos';
APP.DATA.MENSAJES.MSG007 = 'Resultado de la búsqueda: ';
APP.DATA.MENSAJES.MSG008 = 'Datos generales de la solicitud: ';
APP.DATA.MENSAJES.MSG009 = 'No hay analistas';
APP.DATA.MENSAJES.MSG010 = 'Liquidación de gastos';
APP.DATA.MENSAJES.MSG011 = 'Financiamiento Anticipado';
APP.DATA.MENSAJES.MSG012 = 'Ver Todo';
APP.DATA.MENSAJES.MSG013 = '-No hay observaciones-';
APP.DATA.MENSAJES.MSG014 = '-No hay tipo de liquidación-';
APP.DATA.MENSAJES.MSG015 = '-No hay medios de pago-';
APP.DATA.MENSAJES.MSG016 = '-No hay cuentas contables-';

APP.DATA.MENSAJES.MSG_ERROR_DATETIME = 'Fecha y hora de inicio son mayores a la fecha y hora fin';
APP.DATA.MENSAJES.FECHA_INICIO_MENOR_FECHA_ACTUAL = 'Formato o valor de hora incorrecto.';
APP.DATA.MENSAJES.MSG_FORMATO_INCORRECTO = 'Formato o valor de fecha incorrecto';
APP.DATA.MSG_FECHA_INICIO_MAYOR_FECHA_FIN = 'La fecha final no puede ser menor a la fecha inicial';
APP.DATA.MSG_FECHA_FIN_MENOR_FECHA_INICIO = 'La fecha final no puede ser menor a la fecha inicial';
APP.DATA.MSG_FALTA_INGRESAR_FECHA_INICIO = 'Formato o valor de fecha incorrecto';
APP.DATA.MSG_FALTA_INGRESAR_FECHA_FIN = 'Formato o valor de fecha incorrecto';
APP.DATA.MSG_FALTA_INGRESAR_HORA_INICIO = 'Formato o valor de hora incorrecto';
APP.DATA.MSG_FALTA_INGRESAR_HORA_FIN = 'Formato o valor de hora incorrecto';
APP.DATA.MSG_HORA_INICIO_MAYOR_HORA_FIN = 'La hora final no puede ser menor a la hora inicial';

/*** MENSAJE HELPBLOCK  HEL<NUM> ***/
APP.DATA.MENSAJES.HEL001 = function(N){ return 'Ingrese los '+N+' dígitos';};//Caja de Texto que acepta dígitos y tiene longitud fija N
APP.DATA.MENSAJES.HEL002 = function(M,N){ return 'Ingrese de '+M+' a '+N+' dígitos';};//input Acepta dígitos y tiene longitud dentro de un rango,desde M hasta N
APP.DATA.MENSAJES.HEL003 = function(N){ return 'Ingrese como máximo '+N+' dígitos';};//Caja de Texto que acepta dígitos y tiene longitud máxima N
APP.DATA.MENSAJES.HEL004 = function(Y){ return 'Ingrese como máximo el valor '+Y;};//Caja de Texto que acepta dígitos y tiene valor máximo Y
APP.DATA.MENSAJES.HEL005 = function(X){ return 'Ingrese como mínimo el valor '+X;};//Caja de Texto que acepta dígitos y tiene valor mínimo X
APP.DATA.MENSAJES.HEL006 = function(X,Y){ return 'Ingrese un valor entre '+X+' y '+Y;};//Caja de Texto que acepta dígitos y tiene valor mínimo X y máximo Y
APP.DATA.MENSAJES.HEL007 = function(N){ return 'Ingrese los '+N+' caracteres';};//Caja de Texto que acepta texto y tiene longitud fija N
APP.DATA.MENSAJES.HEL008 = function(M,N){ return 'Ingrese de '+M+' a '+N+' caracteres';};//inpu Acepta texto y tiene longitud dentro de un rango,desde M hasta N
APP.DATA.MENSAJES.HEL009 = function(N){ return 'Ingrese como máximo '+N+' caracteres';};//Caja de Texto que acepta texto y tiene longitud máxima N
APP.DATA.MENSAJES.HEL010 = 'Formato de Email incorrecto';//Caja de Texto que acepta como texto una dirección de correo electrónico
APP.DATA.MENSAJES.HEL011 = 'Formato de URL incorrecto';//Caja de Texto que acepta como texto una dirección URL
APP.DATA.MENSAJES.HEL012 = 'Formato de monto incorrecto';//Caja de Texto que acepta un valor decimal para montos
APP.DATA.MENSAJES.HEL013 = 'La fecha final no puede ser menor a la fecha inicial';//Controles de fecha inicial y final
APP.DATA.MENSAJES.HEL014 = 'Formato de fecha incorrecto';//Cuando se ingrese un valor que incumpla el formato de fecha
APP.DATA.MENSAJES.HEL015 = 'Formato de hora incorrecto';//cuando se ingrese un valor que incumpla el formato de hora
APP.DATA.MENSAJES.HEL016 = function(M,N){ return 'Valor incorrecto, ingrese máximo '+M+' enteros y ' +N+' decimales. Valor máximo: 100,00';};//Caja de Texto que acepta un valor entero M y cantidad de decimales N
APP.DATA.MENSAJES.HEL017 = function(M,N){ return 'Valor incorrecto, ingrese máximo '+M+' enteros y ' +N+' decimales.';};//Caja de Texto que acepta un valor entero M y cantidad de decimales N
APP.DATA.MENSAJES.HEL018 = 'Ingrese solo dígitos.';//Caja de Texto que acepta solo digitos
APP.DATA.MENSAJES.HEL019 = 'El formato de cédula es incorrecto.';//Cedula 
APP.DATA.MENSAJES.HEL020 = 'El formato de la solicitud es incorrecto.';//solicitud
APP.DATA.MENSAJES.HEL021 = 'número de cédula inexistente.';//Cedula 
APP.DATA.MENSAJES.HEL022 = 'Formato de texto incorrecto.';//general para expresiones regulares
APP.DATA.MENSAJES.HEL023 = 'Formato de estación incorrecto.';//general para expresiones regulares

/*** MENSAJE DE NOTIFICACION ***/
APP.DATA.MENSAJES.NOT001 = 'El ítem se ha creado correctamente.';//Mensaje de confirmación al crear un ítem de un catálogo
APP.DATA.MENSAJES.NOT002 = 'El ítem se ha modificado correctamente.';//Mensaje de confirmación al modificar un ítem de un catálogo
APP.DATA.MENSAJES.NOT003 = 'El ítem se ha eliminado correctamente.';//Mensaje de confirmación al eliminar un ítem de un catálogo
APP.DATA.MENSAJES.NOT004 = 'Se guardaron los cambios correctamente.';//Mensaje de confirmación al realizar una acción que implique actualizar registros
APP.DATA.MENSAJES.NOT005 = 'El mensaje de correo ha sido enviado.';//Mensaje de confirmación al enviar un correo
APP.DATA.MENSAJES.NOT006 = 'No se encontraron coincidencias.';//Mensaje luego de un filtro y no se encuentran resultados para mostrar en una grilla
APP.DATA.MENSAJES.NOT007 = 'No se encontraron registros.';// Mensaje de advertencia sin filtro previo, no existe información a mostrar en una grilla
APP.DATA.MENSAJES.NOT008 = 'Se envió exitosamente el correo al analista y al administrador funcional.';// Envio de correo al analista y administrador funcional
APP.DATA.MENSAJES.NOT009 = "No se ha encontrado ningún registro de solicitud con los datos proporcionados.";

/*** MENSAJE DE CRITERIOS ***/
APP.DATA.MENSAJES.CRI001 = 'Ya existe un criterio normativo con igual código.';
APP.DATA.MENSAJES.CRI002 = 'Ya existe un criterio normativo con igual descripción.';
APP.DATA.MENSAJES.CRI003 = 'Ya existe una entidad bancaria con igual nombre.';
APP.DATA.MENSAJES.CRI004 = 'Ya existe un rechazo de plano con igual código.';
APP.DATA.MENSAJES.CRI005 = 'Ya existe un rechazo de plano con igual descripción.';
APP.DATA.MENSAJES.CRI006 = 'Ya existe una razón para eliminar plantilla con igual código.';
APP.DATA.MENSAJES.CRI007 = 'Ya existe una razón para eliminar plantilla con igual descripción.';

/*** NOMBRES DE BOTONES "BTN<nombre>" ***/
APP.DATA.MENSAJES.BTNENVIAR = 'Enviar';
APP.DATA.MENSAJES.BTNACEPTAR = 'Aceptar';
APP.DATA.MENSAJES.BTNBUSCAR = 'Buscar';
APP.DATA.MENSAJES.BTNMODIFICAR = 'Modificar';
APP.DATA.MENSAJES.BTNAGREGAR = 'Agregar';
APP.DATA.MENSAJES.BTNELIMINAR = 'Eliminar';
APP.DATA.MENSAJES.BTNCANCELAR = 'Cancelar';
APP.DATA.MENSAJES.BTNNUEVO = 'Nuevo';
APP.DATA.MENSAJES.BTNCERRAR = 'Cerrar';
APP.DATA.MENSAJES.BTNCONFIRMAR = 'Confirmar';
APP.DATA.MENSAJES.BTNGUARDARCAMBIOS = 'Guardar Cambios';
APP.DATA.MENSAJES.BTNNUEVASOLICITUD = 'Nueva solicitud';