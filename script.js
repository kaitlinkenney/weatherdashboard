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

        var temp = response.main.temp;
        var pOne = $("<p>").text("Temperature: " + temp);
        weatherDiv.append(pOne);

        var humidity = response.main.humidity;
        var pTwo = $("<p>").text("Humidity: " + humidity);
        weatherDiv.append(pTwo);

        var windSpeed = response.wind.speed;
        var pThree = $("<p>").text("Wind speed: " + windSpeed);
        weatherDiv.append(pThree);

        $("#jumbo").append(weatherDiv);
        var lat = reponse.coord.lat;
        var long = response.coord.lon;
        displayUV(lat, long);
    
    })
};

// function displayUV (){
//     var queryURL = http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid=fd9e64d7b57ef3d61cfb920579f1e31f"

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);

//         var uvDiv = ($"<div class='uv'>");

//         var uvIndex = response.coord
        
//     })
// }


function displayForecast(city) {
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        url: queryURL,
        method: "GET",
        dataType: "json"
    });
    // }).then(function (response) {
    //     $("#cities").text(city);
    // });
    function searchWorks(){
        //create history of search
        if (previousCities.indexof(city) === -1){
            previousCities.push(city);
            var storedCities= localStorage.setItem("previousCities", JSON.stringify(previousCities));
            console.log(storedCities);
        }

    }
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