Weather Application
===================
This weather application is a JavaScript library implementation of the Weather application described in the paper above, (WARNING PAPER IS IN DUTCH) by Yo-Tina Verbraecken & Koen Cornelis.

Getting Started
===============
You'll need the file GetWeather.js in the folder lib.
Add to your code the following line between the HEAD tags:

- < script src="../lib/GetWeather.js" type="text/javascript" >< /script >
- < script type="text/javascript" >
     getLocation();
  < /script >

Just remove the spaces for it to work.

If you'll open this in your browsers standard the values of the weather app are in European values (°C & Kmph). You can always switch to American standards (°F & Mph) during the application.

Get weather
===========
To get the weather for your current location the application uses a link (http://freegeoip.net/json/) which returns JSON code with details of your current location, such as Longitude & latitude, your city, your country and more. All we need for this application to work is the longitude and latitude of your current position.

These coordinates we get from the JSON request will be send through using a Ajax call to weatheronline.com
To use this we also need a proxy that will helps us get the xml file we need. We use this proxy: http://howestproxy.appspot.com/proxer?xml=
After xml= comes the url you're sending a request to.

If the file can't be pulled into our application an error will be show, saying to try again. (Might just take too much time, by trying again you'll know if it'll work or not. 99% of time you'll get back an xml file!).

If it's a succes to retrieve a proper XML file you'll be heading into the next function which will do the most work, getting the information you need.
The first thing it does is giving EuropeanValues the value true.
After that a list get pulled of all the weather objects in the xml file.

Than for each object in the list certain items will be pulled out of the list and be putted in the html (main) file.
Depending on weither the EuropeanValues is True or False Degrees in Celsius or Fahrenheit will be pulled out of the list and added to the html file.

To make the html file a little less blank but a bit more fancy depending on the current weather code (which can be found in the xml file) the background will change, from normal weather to sunny, cloudy or very cloudy. The pictures for this background can be found under the folder "style".

Show location on Google Maps
============================
A complete toturial on how to use Google Maps can be found through here: http://www.w3schools.com/googleAPI/
A global introduction on how placing a map with the right value is below.

The first thing you'll have to do to make it work is adding one line of code between the HEAD tags.
- < script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=false" >< /script>

again remove the spaces to make it work.

All we used a map where we declared where the center (the users location) is, what type the map should be (Roadmap in our application) and how big the zoom is (10 in the example).

You can declare this by using the following code:
- var mapProp = {
                center:new google.maps.LatLng(lat,long),
                zoom:10,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };

again longitude and latitude is being received by the JSON file from above!

The main line of code we use to show the map is the following:
- var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);


HTML File basic needs
=====================
All you need to put in the BODY tags of the HTML file are the following to make it work.
- < input type="button" value="Switch to other standards" id="switch">
- < div id="output">Idle...< /div>
- < div id="results">< /div>
- < div id="googleMap" style="width:500px;height:380px;">< /div>

Just remind to remove the spaces to make it work
The button is so you can change standards. If you only want the European standards you can leave this out.
The first div with ID output is mainly to inform the user how far the application is with gathering the information.
The second div with ID results is to put in all the weather application code that gets generated.
The last div with ID googleMap is just to give the GoogleMaps application somewhere to put it.
