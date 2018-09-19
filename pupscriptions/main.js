const root = document.body;


const dog = {
	name: null,
	medications: [
		{
			name: "Rimadyl",
			dose:  1,
			schedule: [
				{
					am: true,
					pm: false
				},
				{
					am: true,
					pm: false,
				},
				{
					am: true,
					pm: false
				},
				{
					am: true,
					pm: false,
				},
				{
					am: true,
					pm: false
				},
				{
					am: true,
					pm: false,
				},
				{
					am: true,
					pm: false
				}
			]
		},
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
				formElements.push(
					m(MedicationForm, {medication: dog.medications[i]})
				);
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
		
		const eachDay = [];
		for(let i = 0; i < vnode.attrs.medication.schedule.length; i++){
			eachDay.push(m(ScheduleDay, {dayOfWeek:i}));
		}
		
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
			
			eachDay
		]
	}
};

const DAYS_OF_WEEK_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ScheduleDay = {
	view: function(vnode){
		return m("div", [
			m("span", DAYS_OF_WEEK_NAMES[vnode.attrs.dayOfWeek]),
			m("input", {type: "checkbox", checked: true}),
			m("span", "AM"),
			m("input", {type: "checkbox", checked: true}),
			m("span", "PM")
		]);
	}	
}

m.mount(root, Pupscript);
