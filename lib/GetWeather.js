var EuropeanValues = false;

function getLocation(){
    $.getJSON("http://freegeoip.net/json/", function(location){
            getWeather(location.longitude, location.latitude)
        })
}

function getWeather(long, lat){
    console.log(long, lat);
    $("#output").text("Waiting for results...");
    
    //console.log("http://api.worldweatheronline.com/free/v1/weather.ashx?q="+lat+"%2C+"+long+"&format=xml&num_of_days=5&key=umk9aaumj5fxra4k56evbqf2");
    
    $.ajax({
        url:"http://howestproxy.appspot.com/proxer?xml=http://api.worldweatheronline.com/free/v1/weather.ashx?q="+lat+"%2C+"+long+"&format=xml&num_of_days=5&key=umk9aaumj5fxra4k56evbqf2",
        dataType: "xml",
        success: doLocation,
        error: showError
    });
}

function showError(){
    alert("Couldn't get the weather information. Please try again!");
}

function doLocation(xml){
    EuropeanValues = !EuropeanValues;
    $.getJSON("http://freegeoip.net/json/", function(location){
            $("#output").text("The results are in for "+location.city + ", " + location.region_name +", "+ location.country_name);
            //console.log(location.city + ", " + location.country_name);
        });
    
    console.log(xml);
    
    var list = $(xml).find("weather");
    var results = "";
    
    var current = $(xml).find("current_condition");
    
    results = "<p class='current'>Current temperature: ";
    
    if (EuropeanValues) {
        results += current.find("temp_C").text() + "&deg;C</p>";
    }
    else{
        results += current.find("temp_F").text() + "&deg;F</p>";
    }
    
    list.each(function (){
        
        var date = $(this).find("date").text();
        results += "<p class='weather'><a class='date'>Date: "+ date +"</a><br>";
        
        //Default °C --> Kmp
        
        if (EuropeanValues) {
            var maxTempC = $(this).find("tempMaxC").text();
            var minTempC = $(this).find("tempMinC").text();
            results += "Max. temperature: " + maxTempC + "&deg;C<br> Min. temperature: "+ minTempC + "&#176;C <br>";
        
            var windSpeedKph = $(this).find("windspeedKmph").text();
            results += "Windspeed Kph: "+windSpeedKph;
        }
        else{
            var maxTempF = $(this).find("tempMaxF").text();
            var minTempF = $(this).find("tempMinF").text();
            results +="Max. temperature: "+maxTempF+"&deg;F <br>Min. temperature: "+minTempF+"&deg;F<br>";
            
            var windSpeedMph = $(this).find("windspeedMiles").text();
            results += "Windspeed Mph: "+windSpeedMph;
        }
        
        var weatherIcon = $(this).find("weatherIconUrl").text();
        results += "<br><img src='" +weatherIcon+"'></p>";
    })
    
    switch($(list).find("weathercode")){
        case(116):            
            $("body").addClass("sunny");
            break;
        case(119):            
            $("body").addClass("clouds");
            break;
        case(112): 
            $("body").addClass("verycloudy");
            break;
        case(226):            
            $("body").addClass("rainy");
            break;
        default:
            $("body").addClass("clouds");
            break;
    }
    
    //if weather is cloudy show cloudy background, if sunny show sunny background.
    //code 116 --> sunny
    //119 --> cloudy
    //112 --> Lots of clouds
    //266 --> rainy
    
    //$("table").hide();
    //$("#getLocation").hide();
    $("#googleMap").show();
    $("#results").html(results);
}