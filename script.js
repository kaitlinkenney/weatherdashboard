console.log("this is working");

function displayWeatherInfo() {

    var city = $(this).attr("")
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=fd9e64d7b57ef3d61cfb920579f1e31f";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);

        var weatherDiv = $("<div class='weather'>");



    
    })
}


$("#search").on("click", function(event){
    event.preventDefault();

    var city = ("#city-input").val().trim();
});