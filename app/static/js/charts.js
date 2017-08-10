function makeGraphs(m, y) {
    d3.json("/api/trips/" + y + '/' + m, function (records) {
        var timeFormat = d3.time.format("%Y-%m-%dT%H:%M:%S");

        records.forEach(function(d) {
            d["time"] = timeFormat.parse(d["time"]);
            d["time"].setMinutes(0);
            d["time"].setSeconds(0);
            d["longitude"] = +d["longitude"];
            d["latitude"] = +d["latitude"];
        });

        var ndx = crossfilter(records);
        var hourDim = ndx.dimension(function(d) { return d["time"]; });
        var allDim = ndx.dimension(function(d) {return d;});

        var numRecordsByDate = hourDim.group(); //.reduceCount(function(d) { return d['id']; });
        var all = ndx.groupAll();
        var minDate = hourDim.bottom(1)[0]["time"];
        var maxDate = hourDim.top(1)[0]["time"];

        var numberRecordsND = dc.numberDisplay("#number-records-nd");
        var timeChart = dc.barChart("#time-chart");

        numberRecordsND
            .formatNumber(d3.format("d"))
            .valueAccessor(function(d){return d; })
            .group(all);

        timeChart
            .height(295)
            .margins({top: 10, right: 50, bottom: 20, left: 50})
            .dimension(hourDim)
            .group(numRecordsByDate)
            .x(d3.time.scale().domain([minDate, maxDate]))
            .elasticY(true)
            .xUnits(d3.time.hours)
            .yAxis().ticks(4);
        var map = L.map('heat-map').setView([38.902572, -77.038486], 10);
        var drawMap = function(){
            var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);
            addressPoints = allDim.top(Infinity).map(function (p) { return [p['latitude'], p['longitude']]; });
            var heat = L.heatLayer(addressPoints).addTo(map);
        }
        drawMap();

        timeChart.on("filtered", function (chart, filter) {
            map.eachLayer(function (layer) {
                map.removeLayer(layer)
            });
            drawMap();
        });

        dc.renderAll();
    });
}

makeGraphs(12, 2016);