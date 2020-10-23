console.log("this is working");
var city;

function displayCurrent(city) {

    console.log(city);

   //var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        type: "GET",
        url:  "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f",
        dataType: "json",
    }).then(function (response) {
        console.log(response);
        $(".weather").empty();

        var weatherDiv = $("<div class='weather'>");

        var currentDate = moment().format("L");
        pZero = $("<p>").text("Date: " + currentDate);
        weatherDiv.append(pZero);
        // $("#weather_image").attr("src", response.list[0].weather[0].icon+".png");
        // var iconUrl = response.list[0].weather[0].icon;
        // var iconImage = $("<img>");
        // iconImage.attr("src", "http://openweathermap.org/img/w/");
        // iconImage.append(iconUrl);


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

    })
};

var lat;
var lon;

// function displayUV(lat, lon) {
//     var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f"

//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         dataType: "json"
//     }).then(function (response) {
//         console.log(response);

//         lat = reponse.coord.lat;
//         lon = response.coord.lon;

//         var uvDiv = $("<div class='uv'>");

//         var pFour = $("<p>").text("UV Index: " + "value");
//         uvDiv.append(pFour);

//         $("#jumbo").append(uvDiv);

//         displayUV(lat, lon);


//     })
// }

function displayForecast(city) {
    console.log(city);
    //var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";
    $.ajax({
        type: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f",
        dataType: "json"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i]["dt_txt"].indexOf("15:00:00") !== -1) {

                var forecastDiv = $("<div class='forecast'>");

                var tempF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                var pOne = $("<p>").text("Temperature: " + tempF.toFixed(2) + " Farenheit");
                forecastDiv.append(pOne);

                var humid = response.list[i].main.humidity;
                var pTwo = $("<p>").text("Humidity: " + humid + "%");
                forecastDiv.append(pTwo);

                // $("#one").append(forecastDiv);
                // $("#two").append(forecastDiv);
                // $("#three").append(forecastDiv);
                // $("#four").append(forecastDiv);
                $(".card").append(forecastDiv, response.list[i]);


            }
        }


    })
}


// read value from localstorage and if null set to [], JSON.parse
var previousCities = [];

// function renderCities(){
//     $("#cityList").empty();

//     for (var i = 0; i < previousCities.length; i++);
//     var a = $("<button>")
//     a.addClass("city-row");
//     a.attr("data-name", previousCities[i]);
//     a.text(previousCities[i]);
//     $("#cityList").append(a);
// }

//on click for history that will run the searchClick.
$("#search").on("click", function (event) {
    event.preventDefault();

    var city = $("#city-input").val().trim();


// push to the previousCities array
    previousCities.push(city);




    // // update previousCities in localstorage (JSON.stringify)
    localStorage.setItem("previousCities", JSON.stringify(previousCities));

    // // create a div
    var cityDiv = $("<div class='cities'>");
    // // add the city to the div
    cityDiv.append(city);
    // // preprend that div to your cityList in DOM
    cityDiv.prepend(previousCities);

    // var all_previousCities = JSON.parse(localStorage.getItem("all_previousCities"));

    
    //         var storedCities= localStorage.setItem("previousCities", JSON.stringify(previousCities));
    //         console.log(storedCities);
    //     }
    //     var all_previousCities = JSON.parse(localStorage.getItem("all_previousCities"));
        
    //     cityDiv.prepend(previousCities);

    // }
    // searchWorks();

    displayCurrent(city);
    // displayUV(lat, lon);
    displayForecast(city);
});
