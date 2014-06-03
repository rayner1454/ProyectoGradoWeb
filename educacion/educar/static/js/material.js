(function(scope){ class MATERIAL {

	var ID;
	var tipo_material;
	var descripcion;
	

	function MATERIAL(){
       this.initialize();
	}

	function getID(){
		return ID;
	}

	function setID(newVal){
		ID = newVal;
	}

	function gettipo_material(){
		return tipo_material;
	}

	function settipo_material(newVal){
		tipo_material = newVal;
	}

	function getdescripcion(){
		return descripcion;
	}

	function setdescripcion(newVal){
		descripcion = newVal;
	}

	
}}(window));