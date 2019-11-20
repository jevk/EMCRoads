
function loadChart() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    MAP_SCALE = 3 / 550 
    // Create map instance
    chart = am4core.create("chartdiv", am4maps.MapChart);
    chart.geodata = am4geodata_worldLow
    chart.projection = new am4maps.projections.Projection();
    chart.homeZoomLevel = 2.5;
    chart.homeGeoPoint = {
        latitude: 38,
        longitude: -60
    };

    // Create map polygon series
    polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
    polygonSeries.mapPolygons.template.nonScalingStroke = true;
    polygonSeries.exclude = [];

    // Add line bullets
    cities = chart.series.push(new am4maps.MapImageSeries());
    cities.mapImages.template.nonScaling = true;

    city = cities.mapImages.template.createChild(am4core.Circle);
    city.radius = 6;
    city.fill = chart.colors.getIndex(0).brighten(-0.2);
    city.strokeWidth = 2;
    city.stroke = am4core.color("#fff");


    chart.zoomControl = new am4maps.ZoomControl();

}