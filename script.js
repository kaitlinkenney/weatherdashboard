console.log("this is working");

function displayWeatherInfo() {

    var city = $(this).attr("weatherdata")
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var weatherDiv = $("<div class='weather'>");
        
        var temp = reponse.temp;
        var pOne = $("<p>").text("Temperature: " + temp);
        weatherDiv.append(pOne);

        var humidity = response.humidity;
        var pTwo = $("<p>").text("Humidity: " + humidity);
        weatherDiv.append(pTwo);

        var windSpeed = response.wind.speed;
        var pThree = $("<p>").text("Wind speed: " + windSpeed);
        weatherDiv.append(pThree);

        var uvIndex = response.

    });
}


$("#search").on("click", function(event){
    event.preventDefault();

    var cityDiv = $("<div class='cities'>");
    var city = ("#city-input").val().trim();

    cityDiv.prepend(city);
});