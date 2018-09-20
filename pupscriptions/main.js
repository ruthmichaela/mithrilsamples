const root = document.body;

//this is where the data is stored.
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
			return m("div", {class: "intro-div"}, [
				m("h1", "Let's get started"),
				m("input", {
				class: "field",
				type: "text",
				placeholder: "Enter Dog's Name",
				onkeypress: function(event) {
					if(event.keyCode == 13){
						dog.name = event.target.value;
					}
				},
				})
				
				]);
				
		} else {
			const formElements = [];
			console.log('I am the pupscript component. I can see dog.', dog);
			for(let i = 0; i < dog.medications.length; i++){
				formElements.push(
					m(MedicationForm, {medication: dog.medications[i]})
				);
			}
				
			return m("div", {class: "main-container"}, [
				m("h1", "Enter " + dog.name + "'s" + " medication information"),
				
				formElements,
				
				m("h2", dog.name + "'s" + " total medications: " + dog.medications.length),
				
				m("div", {class: "button-box"},
				
				m("button", {
					onclick: function(event) {
						dog.medications.push({
							name:"Medication Name",
							dose:0,
							schedule:  [
								{
									am: false,
									pm: false
								},
								{
									am: false,
									pm: false,
								},
								{
									am: false,
									pm: false
								},
								{
									am: false,
									pm: false,
								},
								{
									am: false,
									pm: false
								},
								{
									am: false,
									pm: false,
								},
								{
									am: false,
									pm: false
								}
							]
						});
					}
				}, "+ " + "add another medication"),
				
				m("button", "Done"), //will go to route2
				
				//m("code", JSON.stringify(dog)) //gives up to date view of dog
				)
			])
		}		
	}
};

const MedicationForm = {
	view: function(vnode) {
		
		//console.log('I am the medication form component. i can see this:', vnode.attrs);
		const eachDay = [];
		for(let i = 0; i < vnode.attrs.medication.schedule.length; i++){
			eachDay.push(m(ScheduleDay, {
				dayOfWeek: i, 
				schedule: vnode.attrs.medication.schedule[i]
			}));
		}
		
		return [
			//medication name
			m("img", {
					src:"img/pills.png", 
					class: "pill-bottle", 
					alt: "graphic of pill bottle and two pills"}),
			m("h2", "Medication name:"),
			m('input', {placeholder: "Name", class: "field", value: vnode.attrs.medication.name, 
				oninput: function(event){
					vnode.attrs.medication.name = event.target.value; //this is what makes the user input get stored as data
				}
			}),
			m("h2", "Number of pills per dose:"),
			m('input', {placeholder:"0", class: "field", value: vnode.attrs.medication.dose,
				oninput: function (event) {
					vnode.attrs.medication.dose = event.target.value;
				}
			}),
			m("h2", "Days and times to give medication:"),
			m("table", eachDay),
			m("hr")
			
		]
	}
};

const DAYS_OF_WEEK_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ScheduleDay = {
	view: function(vnode){
		console.log('I am the schedule day component. I can see this:', vnode.attrs);
		return m("tr", [
			m("td", {class: "day-names"}, DAYS_OF_WEEK_NAMES[vnode.attrs.dayOfWeek]),
			m("input", {type: "checkbox", checked: vnode.attrs.schedule.am,
				oninput: function(event){
					vnode.attrs.schedule.am = event.target.checked;
				}
			}),
			m("td", {class: "times"},  "AM"),
			m("input", {type: "checkbox", checked: vnode.attrs.schedule.pm,
				oninput: function(event){
					vnode.attrs.schedule.pm = event.target.checked;
					
				}
			}),
			m("td", {class: "times"}, "PM")
			
		]);
	}	
}

m.mount(root, Pupscript);
