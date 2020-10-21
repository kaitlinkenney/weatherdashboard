console.log("this is working");

function displayCurrent() {

    var city = $(this).attr("weatherdata")
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
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

//         var uvIndex = response.
        
//     })
// }


function searchClick() {
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        url: queryURL,
        method: "GET"});
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

        var cityDiv = $("<div class='cities'>");
    var city = $("#city-input").val().trim();
        console.log(city);

    searchClick(city);


        cityDiv.prepend(city);
    });

    displayCurrent();