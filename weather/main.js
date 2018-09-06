const root = document.body;

const WeatherApp = {
	view: function(vnode) {
		
		const forecastBlockMaker = [];
		for(let block = 0; block < 4; block++){
			forecastBlockMaker.push(m(ForecastBlock));
		}
		
		return [
			m("header",
				m("a", {href: "https://unsplash.com/@helenwilliams?utm_source=your_app_name&utm_medium=referral"}, "Helen Williams on Unsplash")
			),
			
			m("div", {class: "current"}, [
				m("h1", "72\xB0"),
				m("h2", "Tuesday"),
				m("h3", "September 22, 2018")
			]),
		
			m("div", {class: "location"},
				m("h2", {id: "city-text"}, "Roanoke, VA")
			),
			
			m("footer", 
				m("table", 
					m("tr", forecastBlockMaker)
				
				)
				
			)
			
		]
		
	}
};

const ForecastBlock = {
	view: function(vnode) {
		return [
			m("td",
				m("div", {class: "forecast-group"},[
					m("p", {class: "forecast-deg"}, "87\xB0"),
					m("img", {src: "img/rain.png", class: "icon", alt: "weather icon"}),
					m("p", {class: "forecast-day"}, "Tuesday")
				])
			)
		]
	}
}

m.mount(root, WeatherApp);