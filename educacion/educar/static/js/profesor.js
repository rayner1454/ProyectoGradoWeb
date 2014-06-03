(function(scope){ class PROFESOR {

	var CI;
	var nombres;
	var apellidos;
	var nombre_usuario;
	var password;
	var correo_electronico;
	var celular;
	var foto;
	var sexo;
	var nacionalidad;
	

	function PROFESOR(){
       this.initialize();
	}

	function getCI(){
		return CI;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setCI(newVal){
		CI = newVal;
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

	function setapellidos(newVal){
		apellidos = newVal;
	}

	function getnombre_usuario(){
		return nombre_usuario;
	}

	function setnombre_usuario(newVal){
		nombre_usuario = newVal;
	}

	function getpassword(){
		return password;
	}

	function setpassword(newVal){
		password = newVal;
	}

	function getcorreo_electronico(){
		return correo_electronico;
	}

	function setcorreo_electronico(newVal){
		correo_electronico = newVal;
	}

	function getcelular(){
		return celular;
	}

	function setcelular(newVal){
		celular = newVal;
	}

	function getfoto(){
		return foto;
	}

	function setfoto(newVal){
		foto = newVal;
	}

	function getsexo(){
		return sexo;
	}

	function setsexo(newVal){
		sexo = newVal;
	}

	function getnacionalidad(){
		return nacionalidad;
	}

	function setnacionalidad(newVal){
		nacionalidad = newVal;
	}

}}(window));