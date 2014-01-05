Weather Application
===================
This weather application is a JavaScript library implementation of the Weather application described in the paper above,(WARNING PAPER IS IN DUTCH) by Yo-Tina Verbraecken & Koen Cornelis.

Choosing your version:
======================
There are currently two versions of this script, depending on how you like your js: as a normal js file or as a jQuery plugin.  For each version you can choose between the minified version (ending in .min.js) for production code and the normal file for those who wish to peruse or alter the code.
- version one: GetWeather.js / GetWeather.min.js
- version two: jQweather.js / jQweather.min.js

In this file we will discuss each version in full in the same order as they are mentioned above.


GetWeather.js: necessary javascript tags 
========================================
You'll need the file GetWeather.js in the folder lib.
Add the html below to the page where you want to insert the weather app, you can choose to either put it between the head tags or at the bottom before the closing body tag:

  < script src="lib/jquery-1.10.2.min.js"></script>
  < script src="lib/GetWeather.js"></script>
  < script src="http://maps.googleapis.com/maps/api/js?key=INSERTYOURKEYHERE&sensor=false"></script>
  < script type="text/javascript">$(document).ready(start);</script>
  
Note that the first script tag loads the minified jquery file, you can of course use a CDN instead.
The second script tag is the script itself.
The third script tag is to ensure the script can gather data from google maps.  You'll notice that the url for this bit: 'INSERTYOURKEYHERE'.  The idea is that you replace this with your key for the google maps api.  Obtaining one is a simple process that is expertly documented at this link: https://developers.google.com/maps/documentation/javascript/tutorial#api_key

The fourth and last script tag is a method call that will add the app to your page, providing you have added the appropriate containers for it in the html (read below).  You can of course opt to call the getLocation() once a specific event occurs rather then when the DOM finishes loading, in which case you'll need to modify the method call.

A full example is available in the /example folder.
Note that you need to get rid of the spaces after the opening braces for the code to work.

GetWeather.js. necessary HTML tags
==================================
You will need to insert the following code snippet to make it work
  < input type="button" value="Switch to other standards" id="switch">
  < div id="output">Idle...</div>
  < div id="results"></div>
  < div id="googleMap" style="width:500px;height:380px;"></div>

The first line is a button which enables users to switch between European and American standards.  For more on these read below.
The first div with ID output is mainly to give some feedback to the user as the weather app is loading.
The second div with ID results will display the weather information.
The last div with ID googleMap holds a google map centered on the location of the visitor.  

Important: notice that there's a style attribute added to the last div tag, you are free to leave it out and move the style into a css file, but do ensure that a width and height is specified for this div (as well as for the body and any containing tags).


jQweather.js: necessary js tags
===============================
You will need to insert the following code snippet either between the head tags or just before the closing body tag.
    < script src="lib/jquery-1.10.2.min.js"></script>
    < script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=false"></script>
    < script src="lib/jQweather.js"></script>

Note that the first script tag loads the minified jquery file, you can of course use a CDN instead.
The second script tag is to ensure the script can gather data from google maps.  You'll notice that the url for this bit: 'INSERTYOURKEYHERE'.  The idea is that you replace this with your key for the google maps api.  Obtaining one is a simple process that is expertly documented at this link: https://developers.google.com/maps/documentation/javascript/tutorial#api_key
The third script tag is the script itself.

Note that you will need to add a line invoking the code as well, but given the nature of the plugin you will need to make your own choices regarding what options you'd like.  Example code is available in the /example folder.


jQweather.js. necessary HTML tags
==================================
Important: the jquery plugin version doen't need you to strictly adhere to the below example code.  You are able to modify quite a lot of how the app works and where it will deposit it's output. Below you will find the html you need if you just want to copy/paste to make it work.  More details about how to modify the jquery code can be found below.

You will need to insert the following code snippet to make it work
  < input type="button" value="Switch to other standards" id="switch">
  < div id="output">Idle...</div>
  < div id="results"></div>
  < div id="googleMap" style="width:500px;height:380px;"></div>

The first line is a button which enables users to switch between European and American standards.  For more on these read below.
The first div with ID output is mainly to give some feedback to the user as the weather app is loading.
The second div with ID results will display the weather information.
The last div with ID googleMap holds a google map centered on the location of the visitor.  

Important: notice that there's a style attribute added to the last div tag, you are free to leave it out and move the style into a css file, but do ensure that a width and height is specified for this div (as well as for the body and any containing tags).


Geolocation
===========
We make the geolocation magic work via http://freegeoip.net, a public REST API which enables us to avoid having to prompt the user whether or not they want to allow your site to see their location.  Some users might find this alarming, so adding information about this in the disclaimer of your website is a good idea.  If you have a nice way of phrasing this please do share so we can add it to the project.


The weather in a nutshell
=========================
The application uses a link (http://freegeoip.net/json/) which returns JSON code with details of the visitor's current location, such as Longitude & latitude, your city, your country and more. All we need for this application to work is the longitude and latitude of your current position.
The coordinates we get from the JSON request will be used in an Ajax call to http://weatheronline.com where we will obtain the weather forecast for the visitor's location. 
To use this we also need a proxy to circumvent cross site sharing policy.  We use this proxy: http://howestproxy.appspot.com/proxer?xml=
After xml= we insert the url and query string.

From this point on there's two possibilities:
- Error: a pop-up message is shown saying the app was unable to get the weather forecast and to try again.  The odds of an error are very, very low.
- Success: we navigate the xml file to extract the data we need and add it to your site.

You will get a representation in either American or European format.  American shows the temperature in Fahrenheit and the measures in the english system.  European will show the temperature in Celsius and the measures in the metric system.  Dates will be formatted as yyy-mm-ddd in the American format and as dd--mm--yyyy in the European format.
The standard is Celsius, but you can adjust this as desired.

To make the html file a little less blank and just a smidge more fancy, depending on the current weather the background will change: from normal weather to sunny, cloudy or very cloudy. The pictures for this background can be found in the /style folder.


Showing the location on Google Maps
===================================
The app by default will display a map with the location of the visitor on google maps.  A marker will be shown displaying where the visitor can be found on the map.  This may not be entirely accurate but in most cases it won't be to far off the mark.

It is possible to tweak the code (or set options for the jQuery plugin) to alter the display of the map.  A nice tutorial can be found at one of the two following links:
- https://developers.google.com/maps/documentation/javascript/tutorial?hl=nl
- http://www.w3schools.com/googleAPI/

Important: the GetWeather.js will not work unless you insert a key to the google api as detailed in the getting started section.  The jQuery plugin will only show a map if the key is available and may not work if you don't provide it but leave the showmap setting on.  


Customizing GetWeather.js
=========================
When it comes to customization you will have to go into the code.  However, the code has been subdivided into a number of functions that make it easy and instinctive to replace what you want.  A quick overview:
- start(): the intialisation function which also binds the click handler.
- getLocation(): retrieves the location and passes it on to the usegooglemaps function and the getweather function.
- useGoogleMaps(long, lat): displays the google map and centers it on the location of the visitor.
- getWeather(long, lat): gets the XML with the weather forecast.
- showError(): if getWeather fails, this function gets invoked.
- doLocation(xml): if getWeather succeeds, this functions processes and displays the result.


Customizing jQweather.js
========================
You have 3 options to customize the experience of the plugin:
1. pass an object literal with your overrides for the default options (see below when i discuss the default options)
2. use the chainable .weather() method rather then the $.weather() method which does not chain.  Using the chainable method means you can specify on which DOM-element(s) you want to portray the weather forecast in without passing in an object literal as an option.  You still have that option if there are other things you wish to customize.
3. alter the default object by directly overriding a default setting (either in script or in the plugin itself after downloading).  The various properties of the default object are as follows (in alphabetical order):
 - button: default = 'switch'.  This property is the ID Of the button to change the format with.
 - changeFormat: default = true.  This boolean value indicates whether or not you want to have a button to change the format with.
 - clickHandler: The function used to bind a function (and the content of that function) to the click event for the button object.
 - europeanValues: default = true.  Boolean indicating whether or not the european formatting should be used.
 - getLocation: function getting the json-literal with the location of the current site visitor.
 - getWeather: function processing the xml and outputting it as a weather forecast to the html.
 - getXML: function to get the xml that represents the forecast (with a lot more data then that which is shown in the app)
 - handleLocation: function which outputs the map into the html and passes the location on to the getXML function.
 - locationProvider: the url we use for geolocation.  Default = 'http://freegeoip.net/json/'.
 - mapdiv: default = 'googleMap'.  The ID of the html-container for the google map.
 - mapVariables: an object literal containing all variables for the google map.  By default only contains 'zoom: 10'.
 - noTimeChange: default = false.  Boolean indicating whether the time-format should change when the other values change from American to European and back.
 - resultdiv: default = 'results'.  ID of the container where the forecast will be shown.
 - setMap: default = true.  Boolean indicating whether a map oughta be shown or not.
 - setMarker: default = true.  Boolean indicating whether the map should contain a marker or not.
 - showError: function that gets called when getXML fails.  The default is an alert you might want to override.  Even if it nearly never gets called.
 - timeFormat: default = true.  Boolean that is the counterpart of europeanValues and which indicates whether the time should be in American or European format.  The default of true indicates European format.
 
