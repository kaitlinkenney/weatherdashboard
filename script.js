console.log("this is working");
var city;

function displayCurrent(city) {


    console.log(city);
    
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json"
    }).then(function (response) {
        console.log(response);

        var weatherDiv = $("<div class='weather'>");

        // var currentDate = moment().format("L");
        // weatherDiv.append(currentDate);

        var iconUrl = response.weather[0].icon;
        // var iconImage = $("<img>");
        // iconImage.attr("src", iconUrl);
        weatherDiv.append(iconUrl);

        var temp = response.main.temp;
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var pOne = $("<p>").text("Temperature: " + tempF.toFixed(2) + " Farenheit");
        weatherDiv.append(pOne);

        var humidity = response.main.humidity;
        var pTwo = $("<p>").text("Humidity: " + humidity + "%");
        weatherDiv.append(pTwo);

        var windSpeed = response.wind.speed;
        var pThree = $("<p>").text("Wind speed: " + windSpeed + " MPH");
        weatherDiv.append(pThree);

        $("#jumbo").append(weatherDiv);
        var lat = reponse.coord.lat;
        var lon = response.coord.lon;
        
        displayUV(lat, lon);
    
    })
};

// function displayUV (lat, lon){
//     var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         dataType: "json"
//     }).then(function (response) {
//         console.log(response);

//         var uvDiv = $("<div class='uv'>");
//         var pFour = $("<p>").text("UV Index: " + );
//         uvDiv.append(pFour);
        
//         $("#jumbo").append(uvDiv);
//     })
// }


function displayForecast(city) {
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json"
    }).then(function (response) {
        console.log(response);

        var forecastDiv = $("<div class='forecast'>");

        var date = response.date


    })
    // function searchWorks(){
    //     //create history of search
    //     if (previousCities.indexof(city) === -1){
    //         previousCities.push(city);
    //         var storedCities= localStorage.setItem("previousCities", JSON.stringify(previousCities));
    //         console.log(storedCities);
    //     }

    // }
}

var previousCities;



//on click for history that will run the searchClick.
    $("#search").on("click", function (event) {
        event.preventDefault();

        city = $("#city-input").val().trim();
        var cityDiv = $("<div class='cities'>");
        console.log(city);

    displayForecast(city);


        cityDiv.prepend(city);

        displayCurrent(city);
    });