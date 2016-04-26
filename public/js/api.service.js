var api = (function(){
  var data;
  return {
    update: update,
    getData: getData
  }

  function getData(){
    return data;
  }
  function update(lat, lon, param, start, end, units, aggregator){
      units = units || 'english';
      aggregator = aggregator || 'mean';
      return axios.get('/cfsr/daily', {
                        params: {
                          lat: lat,
                          lon: lon,
                          parameter: param,
                          start_date: getDateString(new Date(start)),
                          end_date: getDateString(new Date(end)),
                          units: units,
                          aggregator: aggregator
                        }
                      })
                      .then(function(response){
                        data = response.data;
                      })
                      .catch(function(err){
                        console.error(err);
                      })
  }

  function getDateString(date){
    var year = date.getFullYear();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var dateString = month + '/';
        dateString += day + '/';
        dateString += year;
    return dateString;
  }
})();
