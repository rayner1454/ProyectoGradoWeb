
(function(scope){  class PARAMETROS_EVALUACION {

	var ID_PARAMETRO;
	var parametro_evaluacion;
	var ponderacion;
	var descripcion;
	
	function PARAMETROS_EVALUACION(){
       this.initialize();
	}

	
	function getID_PARAMETRO(){
		return ID_PARAMETRO;
	}

	function setID_PARAMETRO(newVal){
		ID_PARAMETRO = newVal;
	}

	function getparametro_evaluacion(){
		return parametro_evaluacion;
	}

	function setparametro_evaluacion(newVal){
		parametro_evaluacion = newVal;
	}

	function getponderacion(){
		return ponderacion;
	}

	function setponderacion(newVal){
		ponderacion = newVal;
	}

	function getdescripcion(){
		return descripcion;
	}

	function setdescripcion(newVal){
		descripcion = newVal;
	}

}}(window));