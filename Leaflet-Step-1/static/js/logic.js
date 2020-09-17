// function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map
    var earthquakemap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });

    var map = L.map("map", {
      center: [38.63, -90.20],
      zoom: 4,
    // Add data and style to map
    });
  earthquakemap.addTo(map)
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

        function getRadius(magnitude) {
            if (magnitude === 0) {
              return 1;
            }
        
            return magnitude * 4;
          }
        function getcolor(magnitude){
            if (magnitude > 5)
            return "red"
            else if (magnitude >4)
            return "purple"
            else if (magnitude >3)
            return "orange" 
            else if (magnitude >2)
            return "blue"  
            else if (magnitude >1)
            return "green"  
            else
            return "white"    
        }
        function styleinfo (feature) {
            return {
                radius:getRadius(feature.properties.mag),
                color:"white",
                opacity: 1,
                fillOpacity: 1,
                weight: 0.3,
                fillColor: getcolor(feature.properties.mag)
            }
        }
    // Add popips and information
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng)
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("magnitude: "+ feature.properties.mag + "<br>location: " + feature.properties.place + "<br>coordinates: " + feature.geometry.coordinates[1] + ", " + feature.geometry.coordinates[0]) 
        }, 
        style:styleinfo



    }).addTo(map)
    // Add legend
    var legend = L.control({
        position: "bottomright"

    })
    legend.onAdd = function() {
        var div=L.DomUtil.create("div","info legend")
        var earthquakes = [0,1,2,3,4,5]
        var colors=["white","green","blue","orange","purple","red"]
        for (var i=0; i < earthquakes.length;i++){
            div.innerHTML+=
            "<span style='padding-left:10px;padding-right:10px;width:50px; opacity:1; background:"+colors[i]+"'>"+earthquakes[i]+"</span><br>"
        }
        console.log(div)
        return div;    
    }
    legend.addTo(map)
          })

  