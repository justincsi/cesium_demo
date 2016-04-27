var graph = (function(){
  'use strict';
  var paramDescriptionLookUp = {
    'tmpsfc': {
      'F': 'Temperature F',
      'C': 'Temperature C'
    }
  };
  var paramTitleLookUp = {
    'tmpsfc': "Surface Temperature"
  };
  return {
    createSingleLineGraph: createSingleLineGraph,
    create: create
  };

  function create(selector, data){
    document.querySelector(selector).innerHTML = '';
    var cfs = data.cfs;
    var cfsr = data.cfsr;
    var parameter = cfs.parameter;
    var units = cfs.units;
    var yLabel = paramDescriptionLookUp[parameter][units];
    var cfsGraphData = parseData(cfs.start_date, cfs.end_date, cfs.param_values);
    var cfsrGraphData = parseData(cfsr.start_date, cfsr.end_date, cfsr.param_values);
    MG.data_graphic({
      title: positionString(cfs.lat, cfs.lon,paramTitleLookUp[parameter]),
      target: selector,
      data: [cfsGraphData, cfsrGraphData],
      width: 600,
      height: 400,
      right: 40,
      left: 75,
      area: false,
      legend: ['CFS', 'CFSR'],
      x_label: "Dates",
      y_label: yLabel,
      aggregate_rollover: true,
      animate_on_load: true
    });
  }

  function createSingleLineGraph(selector, data){
    document.querySelector(selector).innerHTML = '';
    var parameter = data.parameter;
    var units = data.units;
    var yLabel = paramDescriptionLookUp[parameter][units];
    var graphData = parseData(data['start_date'], data['end_date'], data['param_values']);
    MG.data_graphic({
        title: "CFSR Data",
        data: graphData,
        target: selector,
        width: 600,
        height: 400,
        right: 40,
        left: 75,
        area: false,
        x_label: "Dates",
        y_label: yLabel

    });
  }


  function parseData(startDate, endDate, values){
    var dateRange = getDateRange(startDate, endDate);
    var newData = [];
    for(var i = 0; i < values.length; i+=1){
      newData.push({
        date: dateRange[i],
        value: values[i]
      });
    }
    return newData;
  }

  function formatLonString(lon){
    return lon < 0 ? {lon: (Math.abs(+lon)).toFixed(2), dir: 'W'}:{lon:(Math.abs(+lon)).toFixed(2), dir: 'E'}
  }
  function formatLatString(lat){
    return lat < 0 ? {lat: (Math.abs(+lat)).toFixed(2), dir: 'S'}:{lat:(Math.abs(+lat)).toFixed(2), dir: 'N'}
  }

  function positionString(lat, lon, prefix){
    prefix = prefix || '';
    var lonO = formatLonString(lon);
    var latO = formatLatString(lat);
    var s = prefix + ' ';
    s += latO.lat + latO.dir;
    s += ',';
    s += lonO.lon + lonO.dir;
    return s;
  }

  function getDateRange(start, end){
    start = new Date(start);
    end = new Date(end);

    var dateArray = [];
    var currentDate = new Date(start);
    while(currentDate <= end){
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate()+1)
    }
    return dateArray;
  }

})();
