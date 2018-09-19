const root = document.body;


const dog = {
	name: null,
	medications: [
		{
			name: "Rimadyl",
			dose:  0,
		},
	],
	days: [
		{
			name: "Sunday",
			timeA: "AM",
			timeB: "PM"
		},
		{
			name: "Monday",
			timeA: "AM",
			timeB: "PM"
		}
	],
};



const Pupscript = {
	view: function(vnode){
		
		if(!dog.name){
			return m("input", {
				type: "text",
				placeholder: "Enter Dog's Name",
				onkeypress: function(event) {
					if(event.keyCode == 13){
						dog.name = event.target.value;
					}
				},
			});
				
		} else {
			const formElements = [];
			for(let i = 0; i < dog.medications.length; i++){
				formElements.push(m(MedicationForm, {medication: dog.medications[i]}));
				formElements.push(m(Schedule, {selection: dog.days[i]}));
			}
				
			return [
				m("h1", dog.name),
				m("img", {
					src:"img/pills.png", 
					class: "pill-bottle", 
					alt: "graphic of pill bottle and two pills"}),
				
				formElements,
				
				
				m("div", {class: "button-box"},
				
				m("button", {
					onclick: function(event) {
						dog.medications.push({});
					}
				}, "+ " + "add " + dog.name + "'s" + " medications"),
				
				m("button", "Done"), //will go to route2
				
				//m("div", JSON.stringify(dog)) //gives up to date view of dog
				)
			]
		}		
	}
};

const MedicationForm = {
	view: function(vnode) {
		return [
			//medication name
			m("p", "Enter medication name"),
			m('input', {placeholder: "Name", value: vnode.attrs.medication.name, 
				oninput: function(event){
					vnode.attrs.medication.name = event.target.value;
				}
			}),
			m("p", "Enter the number of pills to give each time"),
			m('input', {placeholder:"0", value: vnode.attrs.medication.dose}),
		]
	}
};


/*Current Issues for Schedule:*/
/*Only displaying one day per click. Likely an issue with the loop I'm using above or in the way the object is setup. ???*/

const Schedule = {
	view: function(vnode){
		return [
		m("p", "Choose which days and times to give the medications"),
		
		//MAYBE LOOP OVER THE ARRAY TO CREATE THIS STUFF FOR EVERY DAY?
		m("div", {class: "weekdays"},
			m("p", vnode.attrs.selection.name),
			m("p", vnode.attrs.selection.timeA),
			m('input', {value: "AM", type: "checkbox",
				oninput: function(event){
					vnode.attrs.selection.timeA = event.target.value;
				}
			}),
			m("p", vnode.attrs.selection.timeB),
			m('input', {value: "PM", type: "checkbox",
				oninput: function(event){
					vnode.attrs.selection.timeB = event.target.value;
				}
			}),
		), 
		m("hr"),
		]}
}

m.mount(root, Pupscript);
