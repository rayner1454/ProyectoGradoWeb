(function(scope){ class MATERIAL_CLASE {

	var material_educativo;
	var clase;

	
function MATERIAL_CLASE(){
		this.initialize();
	}

	function getmaterial_educativo(){
		return material_educativo;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setmaterial_educativo(newVal){
		material_educativo = newVal;
	}

	function getclase(){
		return clase;
	}

	/**
	 * 
	 * @param newVal
	 */
	function setclase(newVal){
		clase = newVal;
	}

}
}(window));