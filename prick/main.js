const root = document.body;

const PLANT_IMAGES = [
	"img/pot.png",
	"img/dirt.png",
	"img/cactus.png",
	"img/blooms.png",
	"img/pricks.png"
];

const Planter = {
	clickCount: 0,
	
	view: function(vnode){
		
		return m("img", {
			src: PLANT_IMAGES[vnode.state.clickCount],
			onclick: function() {
				if(vnode.state.clickCount == 5){
					return;
				}
				
				vnode.state.clickCount = vnode.state.clickCount+1;
			}
		});
	}
}

const Garden = {
	rows: 2,
	columns: 2,
	
	view: function(vnode){
		
		const rowsOfPlants = [];
		for(let row = 0; row < vnode.state.rows; row++) {
			const columnPlants = [];
			for(let column = 0; column < vnode.state.columns; column++){
				columnPlants.push(m(Planter));
			}
			
			rowsOfPlants.push(m('div', {class: "plant-rows"}, columnPlants));
		}
		
		return [
			m("div", {class: "top"}, 
				m("h1", "Click to Prick"),
				m("p", "select your plant count, rows then columns"),
				m("input", {type: "number", value: vnode.state.rows, min: 1, oninput: function(event) {
					vnode.state.rows = event.target.value;
				}}),
				
				m("input", {type: "number", value: vnode.state.columns, min: 1, oninput: function(event) {
					vnode.state.columns = event.target.value;
				}})
			),	
				
				m("div", {class: "garden-box"}, rowsOfPlants)
			
		]
	}
}

m.mount(root, Garden)
