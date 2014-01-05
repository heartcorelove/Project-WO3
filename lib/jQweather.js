(function($){
    $.weather = function(opts){
        var options = $.extend({}, $.fn.weather.defaults, opts);
        if(opts.timeFormat === false) options.noTimeChange = true;
        
        if(options.changeFormat){
            options.clickHandler(options);
        }
        
        
        options.getLocation(options);          
    };
    
    jQuery.fn.weather = function(opts){//ensures that the weather method can be called upon a jQuery object if the user so desires
        return this.each(function(){
            var options = $.extend({mapdiv: $(this).attr('id')}, opts);
            $.weather(options);
        });
    };
    
    $.fn.weather.defaults = {//provide default options to be used in the weather function unless overridden by the user
        button: 'switch',
        changeFormat: true,
        clickHandler: function(options){
                            $('#' + options.mapdiv).hide();
                            $('#' + options.button).click(function (){
                                if(options.europeanValues){
                                    options.europeanValues = false;
                                    if(!options.noTimeChange){
                                       options.timeFormat = false;                    
                                    }
                                } else {
                                    options.europeanValues = true;
                                    if(!options.noTimeChange){
                                        options.timeFormat = true;
                                    }
                                }
                                options.getLocation(options); 
                            });
                      },
        europeanValues: true,
        getLocation: function(options){
                            $.getJSON(options.locationProvider, function(location){
                                options.handleLocation(options, location);
                            });
                     },
        getWeather: function(xml, options){
                        var EuropeanValues = options.europeanValues;
                        $.getJSON("http://freegeoip.net/json/", function(location){
                                $("#output").text("The results are in for "+location.city + ", " + location.region_name +", "+ location.country_name);
                            });

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
                            if (options.timeFormat){
                                var dates = date.split('-');
                                results += "<p class='weather'><a class='date'>Date: " + dates[2] + "-" + dates[1] + "-" + dates[0] + "</a><br>";
                            } else results += "<p class='weather'><a class='date'>Date: "+ date +"</a><br>";

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
                        })//end .each iteration

                        switch ($(list).find("weathercode")){
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

                        $("#" + options.mapdiv).show();
                        $("#" + options.resultdiv).html(results);
                    },
        getXML: function (long, lat, options){
            $("#output").text("Waiting for results...");
            $.ajax({
                url:"http://howestproxy.appspot.com/proxer?xml=http://api.worldweatheronline.com/free/v1/weather.ashx?q="+lat+"%2C+"+long+"&format=xml&num_of_days=5&key=umk9aaumj5fxra4k56evbqf2",
                dataType: "xml",
                success: function(data){options.getWeather(data, options);},
                error: options.showError
            });
        },
        handleLocation: function(options, location){ // gets the users location, uses the results to get the weather forecast and outputs the results
                        var mapProp, map, marker;
                        options.getXML(location.longitude, location.latitude, options);
                        if (options.setMap){
                            mapProp = $.extend({center: new google.maps.LatLng(location.latitude, location.longitude)}, options.mapVariables);
                            map=new google.maps.Map(document.getElementById(options.mapdiv),mapProp);

                            if(options.setMarker){
                                marker=new google.maps.Marker({
                                    position: new google.maps.LatLng(location.latitude, location.longitude)
                                });

                                marker.setMap(map);
                            }

                            $(document).ajaxComplete(function(e){
                                  google.maps.event.trigger(map, 'resize');
                                  map.setCenter(marker.getPosition());
                            });   
                        }
                   },
        locationProvider: 'http://freegeoip.net/json/',
        mapdiv: 'googleMap',
        mapVariables: {
                        zoom:10
                    },
        noTimeChange: false,
        resultdiv: 'results',
        setMap: true,
        setMarker: true,
        showError: function(){
                        alert("Couldn't get the weather information. Please try again!");
                    },
        timeFormat: true
    };//end defaults object
})(jQuery);

