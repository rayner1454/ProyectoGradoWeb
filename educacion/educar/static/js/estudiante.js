(function(scope){
 class ESTUDIANTE {

	var COD_RUDE;
	var nombres;
	var apellidos;
	var nombre_usuario;
	var password;
	var avatar;
	var fecha_nacimiento;
	var telefono;
	var sexo;
	var nacionalidad;
	

	function ESTUDIANTE(){
		this.initialize();
	}

	function getCOD_RUDE(){
		return COD_RUDE;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setCOD_RUDE(newVal){
		COD_RUDE = newVal;
	}

	function getnombres(){
		return nombres;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setnombres(newVal){
		nombres = newVal;
	}

	function getapellidos(){
		return apellidos;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setapellidos(newVal){
		apellidos = newVal;
	}

	function getnombre_usuario(){
		return nombre_usuario;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setnombre_usuario(newVal){
		nombre_usuario = newVal;
	}

	function getpassword(){
		return password;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setpassword(newVal){
		password = newVal;
	}

	function getavatar(){
		return avatar;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setavatar(newVal){
		avatar = newVal;
	}

	function getfecha_nacimiento(){
		return fecha_nacimiento;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setfecha_nacimiento(newVal){
		fecha_nacimiento = newVal;
	}

	function  gettelefono(){
		return telefono;
	}

	/**
	 * 
	 * @param newVal
	 */
	function settelefono(newVal){
		telefono = newVal;
	}

	function getsexo(){
		return sexo;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setsexo(newVal){
		sexo = newVal;
	}

	function getnacionalidad(){
		return nacionalidad;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setnacionalidad(newVal){
		nacionalidad = newVal;
	}

}(window));

