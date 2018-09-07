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

fetchWeatherData("New York");

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
	view: function(vnode) {
		
		if(weatherData == null) {
			return m("p", "Loading...");
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
				unsplashData ? m("a", {href: unsplashData.user.links.html}, unsplashData.user.name + " on Unsplash") : null,
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
	if(condition == "rain") {
		return "img/rain.png";
	} else {
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
