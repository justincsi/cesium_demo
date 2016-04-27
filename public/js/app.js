window.onload = onLoad;

function onLoad(){
    var viewer = new Cesium.Viewer('cesiumContainer',{
        clock: new Cesium.Clock({
            startTime: new Cesium.JulianDate.fromDate(new Date()),
            shouldAnimate: false,
            currentTime: new Cesium.JulianDate.fromDate(new Date())
          }),
        // terrainProvider : new Cesium.CesiumTerrainProvider({
        //   url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
        //   }),
      // mapProjection : new Cesium.WebMercatorProjection(),
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
    // begin camera zoom

    // var rectangle = Cesium.Rectangle.fromDegrees(-124.803705, 42.255220, -114.692549, 32.502367);
    //
    // viewer.camera.flyTo({
    //     destination : rectangle
    // });

    // Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;
    // Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    // end camera zoom


}

document.getElementById('chart').addEventListener('click', hideMap);
function hideMap(){
  document.getElementById('chart').innerHTML = '';
}
