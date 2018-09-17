const root = document.body;

let dogsName;

//blueprint for the dog only, not the meds.
const Pupscript = {
	view: function(vnode){
		
		return [
			m("input", {
				id: "dog-name",
				type: "text",
				placeholder: "Enter Dog's Name",
				onkeypress: function(event) {
					if(event.keyCode == 13){
						dogsName = event.target.value;
						console.log(dogsName);
					}
				}
			}),
			
			m("h1", dogsName),
		]	
	}
}
 

 
 m.mount (root, Pupscript);