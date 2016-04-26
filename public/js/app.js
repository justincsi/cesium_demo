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
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(movement) {
        var cartesian = viewer.camera.pickEllipsoid(movement.position, scene.globe.ellipsoid);
        if (cartesian) {
            var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            var lon = Cesium.Math.toDegrees(cartographic.longitude);
            var lat = Cesium.Math.toDegrees(cartographic.latitude);
            console.log(lat, lon)
            api.update(lat, lon, 'wndmag', new Date(), '2016-12-31');
        } else {
            console.log('Point is undefined!')
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}






// // Create a typical CzmlDataSource.
// var dataSource1 = new Cesium.CzmlDataSource();
// dataSource1.load('../../SampleData/simple.czml');
//
// // Add a checkbox at the top.
// document.getElementById('toolbar').innerHTML =
//     '<label><input type="checkbox" id="showCheckbox" /> Show CZML</label>';
//
// var checkbox = document.getElementById('showCheckbox');
// checkbox.addEventListener('change', function() {
//     // Checkbox state changed.
//     if (checkbox.checked) {
//         // Show if not shown.
//         if (!viewer.dataSources.contains(dataSource1)) {
//             viewer.dataSources.add(dataSource1);
//         }
//     } else {
//         // Hide if currently shown.
//         if (viewer.dataSources.contains(dataSource1)) {
//             viewer.dataSources.remove(dataSource1);
//         }
//     }
// }, false);
