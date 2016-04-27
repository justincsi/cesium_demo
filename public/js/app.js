window.onload = onLoad;

function onLoad(){
    var viewer = new Cesium.Viewer('cesiumContainer',{
        clock: new Cesium.Clock({
            startTime: new Cesium.JulianDate.fromDate(new Date()),
            shouldAnimate: false,
            currentTime: new Cesium.JulianDate.fromDate(new Date())
          }),
    });
    viewer.dataSources.add(Cesium.CzmlDataSource.load('data/CA_stations.czml'));
    var scene = viewer.scene;
    // var cali = new Cesium.HomeButtonViewModel(scene, 2);
    // scene.toolbar.add(cali);
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var lon = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            setPin(viewer, lat, lon, 'Current Position');
            api.getData(lat, lon, 'tmpsfc', new Date(), '2016-12-31')
                .then(function(data){
                  graph.create('#chart', data);
                });

        } else {
            console.log('Point is undefined!')
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    document.querySelector('#zoom').addEventListener('click', function(){
      var rectangle = Cesium.Rectangle.fromDegrees(-124.803705, 42.255220, -114.692549, 32.502367);

      viewer.camera.flyTo({
          destination : rectangle
      });

    });
}

document.getElementById('chart').addEventListener('click', hideMap);
function hideMap(){
  document.getElementById('chart').innerHTML = '';
}

function setPin(viewer, lat, lon, description){
  viewer.entities.removeAll();
  var pinBuilder = new Cesium.PinBuilder();
  var pin = viewer.entities.add({
    name: description,
    position: Cesium.Cartesian3.fromDegrees(lon, lat),
    billboard: {
      image: pinBuilder.fromColor(Cesium.Color.RED, 25).toDataURL(),
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    }
  });
}
