console.log("this is working");
var city;

function displayCurrent(city) {

    console.log(city);

    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f",
        dataType: "json",
    }).then(function (response) {
        console.log("day", response);
        $(".weather").empty();

        var weatherDiv = $("<div class='weather'>");
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")

        // pMystery = $("<p>").icon;
        weatherDiv.append(icon)

        var currentDate = moment().format("L");
        pZero = $("<p>").text("Date: " + currentDate);
        weatherDiv.append(pZero);
        
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var pOne = $("<p>").text("Temperature: " + tempF.toFixed(2) + " Farenheit");
        weatherDiv.append(pOne);

        var humidity = response.main.humidity;
        var pTwo = $("<p>").text("Humidity: " + humidity + "%");
        weatherDiv.append(pTwo);

        var windSpeed = response.wind.speed;
        var pThree = $("<p>").text("Wind speed: " + windSpeed + " MPH");
        weatherDiv.append(pThree);

        var lat = response.coord.lat;
        var lon = response.coord.lon;
        displayUV(lat, lon);

        $("#jumbo").append(weatherDiv);

    })
};

function displayUV(x, y) {
    console.log("hi");
    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + x + "&lon=" + y + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f"
    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json"
    }).then(function (response) {
        console.log(response);
        $(".uv").empty();

        var uvI = response.value;
        console.log("hi")
        console.log(uvI);

        var uvDiv = $("<div class='uv'>");

        pFour = $("<p>").text("UV Index: " + uvI);
        uvDiv.append(pFour);

        $("#jumbo").append(uvDiv);

    })
}


function displayForecast(city) {
    console.log(city);
    
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f",
        dataType: "json"
    }).then(function (response) {
        console.log("five day", response);
        $(".forecast").empty();

        for (var i = 5; i < response.list.length; i= i+8) {

                var forecastDiv = $("<div class='forecast'>");

                

                var nextDay = moment(response.list[i].dt_txt).format("L");
                console.log(nextDay);


                var tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                var pOne = $("<p>").text("Temperature: " + tempF.toFixed(2) + " Farenheit");
                forecastDiv.append(nextDay);
                forecastDiv.append(pOne);

                var humid = response.list[i].main.humidity;
                var pTwo = $("<p>").text("Humidity: " + humid + "%");
                forecastDiv.append(pTwo);


                $(".card").append(forecastDiv, response.list[i]);

            }
        // }


    })
}

//on click for history that will run the searchClick.
$("#search").on("click", function (event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();

    if (city === null) {
        return;
    }

    // push to the previousCities array
    previousCities.push(city);

    // // update previousCities in localstorage (JSON.stringify)
    localStorage.setItem("previousCities", JSON.stringify(previousCities));
    console.log(previousCities);


    var places = localStorage.getItem("previousCities");
    places = JSON.parse(places);

    printPrevious(places);

    displayCurrent(city);
    displayForecast(city);
});

// read value from localstorage and if null set to [], JSON.parse
var previousCities = localStorage.getItem("previousCities");
if (previousCities) {
    previousCities = JSON.parse(previousCities);
}
else {
    previousCities = [];
}

printPrevious(previousCities);

function printPrevious(cities) {
    if (!cities) {
        return;
    }
    $(".list-group").empty();
    for (var i = 0; i < cities.length; i++) {
        // // create a div
        var cityDiv = $("<li class='cities list-group-item'>");
        cityDiv.attr("value", cities[i])
        cityDiv.text(cities[i]);
        $(".list-group").append(cityDiv);
    }
}

$(".cities").on("click", function (event) {
    var clickedCity = $(event.target).attr('value');

    displayCurrent(clickedCity);
    displayForecast(clickedCity);
})