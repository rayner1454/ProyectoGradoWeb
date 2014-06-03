(function(scope){ EVALUACION {

	var ID;
	var profesor;
	var estudiante;
	var materia;
	var parametro;
	var nota;
	var observaciones;

    function EVALUACION(){
		this.initialize();
	}
	

	function getID(){
		return ID;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setID(newVal){
		ID = newVal;
	}

	function getprofesor(){
		return profesor;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setprofesor(newVal){
		profesor = newVal;
	}

	function getestudiante(){
		return estudiante;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setestudiante(newVal){
		estudiante = newVal;
	}

	function getmateria(){
		return materia;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setmateria(newVal){
		materia = newVal;
	}

	function getparametro(){
		return parametro;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setparametro(newVal){
		parametro = newVal;
	}

	function getnota(){
		return nota;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setnota(newVal){
		nota = newVal;
	}

	function getobservaciones(){
		return observaciones;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setobservaciones(newVal){
		observaciones = newVal;
	}

}}(window));