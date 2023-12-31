var map;
var marker1;
var marker2;
var previousMarker;
var clickCount = 0;

function initialize() {
    var mapOptions = {
        // center: new google.maps.LatLng(39.0431,-76.9850),
        // center: new google.maps.LatLng(20.9953, 105.81955),
        center: new google.maps.LatLng(20.99655, 105.8346),
        zoom: 17,
        minZoom: 16,
        maxZoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    
    google.maps.event.addListener(map, 'click', function(event) {
        if (!marker1 || !marker1.setPosition) {
            marker1 = createStartMarker(map, event.latlng, "#" + clickCount + ":" + event.latLng);
        } else if (!marker2 || !marker2.setPosition) {
            marker2 = createDestinationMarker(map, event.latLng, "#" + clickCount + ":" + event.latLng);
        } else if ((clickCount % 2) == 0) {
            marker1.setPosition(event.latLng);
            marker1.setTitle("#" + clickCount + ":" + event.latLng)
        } else {
            marker2.setPosition(event.latLng);
            marker2.setTitle("#" + clickCount + ":" + event.latLng);
        }
        if (marker1 && marker1.getPosition) {
            document.getElementById('start-longitude').value = marker1.getPosition().lng();
            document.getElementById('start-latitude').value = marker1.getPosition().lat();
        }
        if (marker2 && marker2.getPosition) {
            document.getElementById('destination-latitude').value = marker2.getPosition().lat();
            document.getElementById('destination-longitude').value = marker2.getPosition().lng();
        }
        clickCount++;
        map.panTo(event.latLng);
    }
    );

    var allowedBounds = new google.maps.LatLngBounds(
        // new google.maps.LatLng(39.0419,-76.9866),
        // new google.maps.LatLng(39.0445, -76.9826),
        new google.maps.LatLng(20.9970,105.8321),
        new google.maps.LatLng(20.9991, 105.8326) 
        // new google.maps.LatLng(0,0),
        // new google.maps.LatLng(0, 0) 
    );
    var lastValidCenter = map.getCenter();
    
    google.maps.event.addListener(map, 'center_changed', function() {
        if (allowedBounds.contains(map.getCenter())) {
            // still within valid bounds, so save the last valid position
            lastValidCenter = map.getCenter();
            map.fitBounds(allowedBounds)
            return; 
        }
    
    // not valid anymore => return to last valid position
    map.panTo(lastValidCenter);
    });
    
    //displayMarkers(map)
}

google.maps.event.addDomListener(window, 'load', initialize);


function createStartMarker(map, latlng, title) {
    return new google.maps.Marker({
        map: map,
        position: latlng,
        title: title,
        icon: 'http://maps.google.com/mapfiles/kml/paddle/S.png'
    });
}

function createDestinationMarker(map, latlng, title) {
    return new google.maps.Marker({
        map: map,
        position: latlng,
        title: title,
        icon: 'https://img.icons8.com/doodle/48/000000/finish-flag.png'
    });
}


// function displayMarkers(map) {
//     COORDS.forEach(function(item){
//         createMarker(map, new google.maps.LatLng(item.lat,item.lng), ""+item.id);
//       });
// }

// document.getElementById('latlngform').onsubmit = function() {
//     displayRoads(map)
//     return false
// }

// $(document).on('submit', '#latlngform', function(e){
//     e.preventDefault();

//     $.ajax({
//         type: 'POST',
//         url: '/update',
//         data: {
//             allnodes:nodes,
//             alledges:edges,
//             startlatitude:$('#start-latitude').val(),
//             startlongitude:$('#start-longitude').val(),
//             destinationlatitude:$('#destination-latitude').val(),
//             destinationlongitude:$('#destination-longitude').val(),
//             csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
//         },
//         success:function(){
//             alert("Submitted");
//         }
//     });

// });


// function createPolyline(map, path) {
//     var polyline = new google.maps.Polyline({
//       path: path,
//       map: map
//     });
//   }



// function displayRoads(map) {
//     var points = new google.maps.MVCArray();
//     for (i=0; i<shortestPath.length; i++) {
//         id = shortestPath[i];
//         nodeid = parseInt(id)
//         nodes.forEach(function(item){
//             if (nodeid === item.id){
//                 points.push(new google.maps.LatLng(item.lat, item.lng))
//             }
//         }); 
//     }

//     createPolyline(map, points);
// }


