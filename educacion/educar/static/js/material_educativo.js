(function(scope){ class MATERIAL_EDUCATIVO {

	var ID;
	var tiipo_material;
	var clase;
	var titulo;
	var material;
	var descripcion;
	
	function MATERIAL_EDUCATIVO(){
     this.initialize();
	}


	function getID(){
		return ID;
	}

	function setID(newVal){
		ID = newVal;
	}

	function gettiipo_material(){
		return tiipo_material;
	}

	function settiipo_material(newVal){
		tiipo_material = newVal;
	}

	function getclase(){
		return clase;
	}

	function setclase(newVal){
		clase = newVal;
	}

	function gettitulo(){
		return titulo;
	}

	function settitulo(newVal){
		titulo = newVal;
	}

	function getmaterial(){
		return material;
	}

	function setmaterial(newVal){
		material = newVal;
	}

	function getdescripcion(){
		return descripcion;
	}

	function setdescripcion(newVal){
		descripcion = newVal;
	}

}}(window));