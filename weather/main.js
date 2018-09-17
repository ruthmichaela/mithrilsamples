const root = document.body;

let weatherData = null;

function fetchWeatherData(location) {
	m.request({
		method: "GET",
		url: `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${encodeURIComponent(location)}%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
	}).then(function(result) {
		weatherData = result;
		fetchUnsplashData(weatherData.query.results.channel.item.condition.text);
	});
}
if(localStorage.location != undefined){
	fetchWeatherData(localStorage.location);
}


let unsplashData = null;

function fetchUnsplashData(condition){
	m.request({
		method: "GET",
		url: "https://api.unsplash.com/photos/random?client_id=6b65558965e5a13e60b1dc7733a924090f90863ca7517f82112cb4fba2d0b7c9&query=" + encodeURIComponent(condition)
	}) .then(function(result){
		unsplashData = result;
	})
}

const WeatherApp = {
	locationInput: false,
	
	view: function(vnode) {
		
		if(weatherData == null) {
			return [
				m("div", {class: "start-container"},
				m("h1", {class: "header-start"}, "Where would you like your weather from today?"),
				m("p", "Enter your zip code and press enter"),
				m("input", {
					class: "input-start",
					type: "text", 
					placeholder: "Zip Code", 
					onkeydown: function(event) {
						if (event.keyCode == 13) {
							fetchWeatherData(event.target.value);
							vnode.state.locationInput = false;
							localStorage.location = event.target.value;
						}
					}
				})
			)]
		}
		
		const forecastBlockMaker = [];
		for(let block = 0; block < 4; block++){
			const dayData = weatherData.query.results.channel.item.forecast[block + 1];
			forecastBlockMaker.push(m(ForecastBlock, {
				day: dayData.day,
				temp: dayData.high,
				condition: dayData.text
			}));
		}
		
		const forecastDate = new Date(weatherData.query.results.channel.item.pubDate);
		
		const styleObject = {};
		if(unsplashData != null) {
			styleObject['background-image'] = `url(${unsplashData.urls.regular})`;
		}
		
		return m("div", {class: "app", style: styleObject}, [
			m("header",
				[
					unsplashData ? m("a", {href: unsplashData.user.links.html}, unsplashData.user.name + " on Unsplash") : null,
					
					vnode.state.locationInput ?
						m("input", {
							type: "text", 
							placeholder: "Zip Code", 
							style: {float: "right"},
							onkeydown: function(event) {
								if (event.keyCode == 13) {
									fetchWeatherData(event.target.value);
									vnode.state.locationInput = false;
									localStorage.location = event.target.value;
								}
							}
						})
					:
						m("img", {
							src: "img/gear.png",
							width: 20, height: 20,
							style: {float: "right", opacity: 0.5, cursor: 'pointer'},
							onclick: function() {
								vnode.state.locationInput = true;
							}
						}),
				]
			),
			
			
			
			m("div", {class: "current"}, [
				m("h1", weatherData.query.results.channel.item.condition.temp + "\xB0"),
				m("h2", getDayName(forecastDate.getDay())),
				m("h3", getMonthName(forecastDate.getMonth()) + " " + forecastDate.getDate() + ", " + forecastDate.getFullYear())
			]),
		
			m("div", {class: "location"},
				m("h2", {id: "city-text"}, weatherData.query.results.channel.location.city + "," + weatherData.query.results.channel.location.region)
			),
			
			m("footer", 
				m("table", 
					m("tr", forecastBlockMaker)
				
				)
				
			)
		]);
		
	}
};

function getImageForCondition(condition) {
	switch (condition) {
		case "Rain":
			return "img/Rain.png";
		case "Sun":
			return "img/Sun.png";
		case "Cloudy":
			return "img/Cloudy.png"
		case "Partly Cloudy":
			return "img/Cloudy.png";
		case "Mostly Cloudy":
			return "img/Cloudy.png"
		case "Scattered Thunderstorms":
			return "img/Rain.png";
		case "Sunny":
			return "img/Sun.png";
		case "Mostly Sunny":
			return "img/Sun.png";
		default:
			return "img/default_broken.png";
	}
}


const ForecastBlock = {
	view: function(vnode) {
		return [
			m("td",
				m("div",[
					m("p", {class: "forecast-deg"}, vnode.attrs.temp + "\xB0"),
					m("img", {src: getImageForCondition(vnode.attrs.condition), class: "icon", alt: vnode.attrs.condition}),
					m("p", {class: "forecast-day"}, vnode.attrs.day)
				])
			)
		]
	}
}

m.mount(root, WeatherApp);
