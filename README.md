Weather Application
===================
This weather application is a JavaScript library implementation of the Weather application described in the paper above, (WARNING PAPER IS IN DUTCH) by Yo-Tina Verbraecken & Koen Cornelis.

Getting Started
===============
You'll need the file GetWeather.js in the folder lib.
Add to your code the following line between the HEAD tags:

- < script src="../lib/GetWeather.js" type="text/javascript" >< /script >

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

