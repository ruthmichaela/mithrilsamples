const root = document.body;

const MED_TYPE_PILL= 0;
const MED_TYPE_LIQUID = 1;


const dog = {
	name: null,
	medications: [
		{
			name: "Rimadyl",
			strength: 250,
			type: MED_TYPE_PILL,
			dose:  1,
			schedule: [
				{
					am: true,
					mid: false,
					pm: false
				},
				{
					am: true,
					mid: false,
					pm: false,
				},
				{
					am: true,
					mid: false,
					pm: false
				},
				{
					am: true,
					mid: false,
					pm: false,
				},
				{
					am: true,
					mid: false,
					pm: false
				},
				{
					am: true,
					mid: false,
					pm: false,
				},
				{
					am: true,
					mid: false,
					pm: false
				}
			]
		},
	],
};



const Pupscript = {
	dogNameInput: null,
	
	view: function(vnode){
		var medsSidebar = []
		for(let i = 0; i < dog.medications.length; i++){
			let abbrevUnit;
			switch(dog.medications[i].type) {
				case MED_TYPE_PILL:
					abbrevUnit = "mg";
					break;
				case MED_TYPE_LIQUID:
					abbrevUnit = "mL";
					break;
			}
			
			medsSidebar.push(m("a", {
				class: "side-text",
				href: "#medication-" + i,
			}, dog.medications[i].name + " " + dog.medications[i].strength + abbrevUnit));
		}
		
		
		if(!dog.name){
			return m("div", {class: "intro-div"}, [
				m("h1", "Let's get started"),
				m("input", {
					class: "field",
					type: "text",
					placeholder: "Enter Dog's Name",
					oninput: function(event) {
						vnode.state.dogNameInput = event.target.value;
					},
					onkeypress: function(event) { //these can only manipulate data.
						if(event.keyCode == 13){
							dog.name = vnode.state.dogNameInput;
						}
					},
				}),
				
				vnode.state.dogNameInput && vnode.state.dogNameInput.length > 2 ? m("p", "Press enter when finished.") : null
				
				]);
				
		} else {
			const formElements = [];
			
			for(let i = 0; i < dog.medications.length; i++){
				formElements.push(
					m(MedicationForm, {medication: dog.medications[i], id:i})
				);
			}
			
			return [
				//parent of all
				m("div", {class: "top-container"}, [
					
					//main center
					m("div", {class: "main-container"}, [
						m("h1", "Enter medication information"),
						
						formElements,
						
						m("h2", dog.name + "'s" + " total medications: " + dog.medications.length),
						
						m("div", {class: "button-box"},
						
						m("button", {
							onclick: function(event) {
								dog.medications.push({
									name:"Medication Name",
									strength: 0,
									type: MED_TYPE_PILL,
									dose:0,
									schedule:  [
										{
											am: false,
											mid: false,
											pm: false
										},
										{
											am: false,
											mid: false,
											pm: false,
										},
										{
											am: false,
											mid: false,
											pm: false
										},
										{
											am: false,
											mid: false,
											pm: false,
										},
										{
											am: false,
											mid: false,
											pm: false
										},
										{
											am: false,
											mid: false,
											pm: false,
										},
										{
											am: false,
											mid: false,
											pm: false
										}
									]
								}, 
								);
							}
						}, "+ " + "add another medication"),
						
						m("button", "Done"), //will go to route2
					
					//("code", JSON.stringify(dog)) //gives up to date view of dog
					)
					]),
					
					//sidebar
					m("span", {class: "side-container"}, [
						m("h2", {class: "side-text-dog"}, dog.name),
						m("hr", {class: "side-hr"}),
						m("img", {
						src:"img/pills.png", 
						class: "pill-bottle", 
						alt: "graphic of pill bottle and two pills"}),
						m("h2", {class: "side-text"}, "Medications"),
						medsSidebar,
						m("p", {class: "side-text-total"}, "Total medications: " + dog.medications.length),
						m("hr", {class: "side-hr"}),
					]),
				])
			]
		}		
	}
};

const MedicationForm = {
	view: function(vnode) {
		
		const eachDay = [];
		for(let i = 0; i < vnode.attrs.medication.schedule.length; i++){
			eachDay.push(m(ScheduleDay, {
				dayOfWeek: i, 
				schedule: vnode.attrs.medication.schedule[i]
			}));
		}
		
		let doseString;
		let doseKind;
		
		switch (vnode.attrs.medication.type){
			case MED_TYPE_PILL: 
				doseString = "Number of pills per dose:";
				doseKind = "Milligram:";
				break;
			case MED_TYPE_LIQUID:
				doseString = "Amount of liquid per dose:";
				doseKind = "Milliliter:";
				break;
		}
		
		return [
			//medication name
			m("div", {id: "medication-" + vnode.attrs.id}, [
				m("h2", "Medication name:"),
				m('input', {placeholder: "Name", class: "field", value: vnode.attrs.medication.name, 
					oninput: function(event){
						vnode.attrs.medication.name = event.target.value; //this is what makes the user input get stored as data
					}
				}),
				
				m("h2", "Medication type:"),
				m("select", {
					oninput: function(event) {
						vnode.attrs.medication.type = Number(event.target.value);
					}
				}, [
					m("option", {value: MED_TYPE_LIQUID, selected: vnode.attrs.medication.type == MED_TYPE_LIQUID}, "Liquid"),
					m("option", {value: MED_TYPE_PILL, selected: vnode.attrs.medication.type == MED_TYPE_PILL}, "Pill"),
					]),
				
				m("h2", doseKind),
				m('input', {placeholder: 250, class: "field", value: vnode.attrs.medication.strength}),
				m("h2", doseString),
				m('input', {placeholder:"0", class: "field", value: vnode.attrs.medication.dose, type: "number", 
					oninput: function (event) {
						vnode.attrs.medication.dose = event.target.value;
					}
				}),
				
				m("h2", "Days and times to give medication:"),
				m("table", eachDay),
				m("hr")
			])
		]
	}
};

const DAYS_OF_WEEK_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const ScheduleDay = {
	view: function(vnode){
		
		return m("tr", [
			m("td", {class: "day-names"}, DAYS_OF_WEEK_NAMES[vnode.attrs.dayOfWeek]),
			m("input", {type: "checkbox", checked: vnode.attrs.schedule.am,
				oninput: function(event){
					vnode.attrs.schedule.am = event.target.checked;
				}
			}),
			m("td", {class: "times"},  "AM"),
			
			m("input", {type: "checkbox", checked: vnode.attrs.schedule.mid,
			oninput: function(event){
				vnode.attrs.schedule.mid = event.target.checked;	
				}
			}),
			m("td", {class: "times"}, "MID"),
			
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
