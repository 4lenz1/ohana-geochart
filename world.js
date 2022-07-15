import { Modal } from "./modal.js";

document.addEventListener('DOMContentLoaded', () => {
    const instance = NiceSelect.bind(document.querySelector('#select-world'), { searchable: true });
})

const worldModal = new Modal('world');
document.getElementById('select-world').addEventListener('change', function () {


    worldModal.modal();

    let dataItem = polygonSeries.getDataItemById(this.value);
    polygonSeries.zoomToDataItem(dataItem);
});










document.addEventListener("DOMContentLoaded", () => {
    initialWorldMap();
});

var polygonSeries;


function initialWorldMap() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chart-world");


    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
        am5themes_Animated.new(root)
    ]);


    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
    var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator()
    }));


    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
    }));

    polygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        toggleKey: "active",
        interactive: true
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
        fill: root.interfaceColors.get("primaryButtonHover")
    });

    polygonSeries.mapPolygons.template.states.create("active", {
        fill: root.interfaceColors.get("primaryButtonHover")
    });

    var previousPolygon;

    polygonSeries.mapPolygons.template.on("active", function (active, target) {
        if (previousPolygon && previousPolygon != target) {
            previousPolygon.set("active", false);
        }
        if (target.get("active")) {
            polygonSeries.zoomToDataItem(target.dataItem);
            worldModal.modal(target.dataItem.dataContext.id);
        }
        else {
            chart.goHome();
        }
        previousPolygon = target;
    });


    // Add zoom control
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));


    // Set clicking on "water" to zoom out
    chart.chartContainer.get("background").events.on("click", function () {
        chart.goHome();
    })


    // Make stuff animate on load
    chart.appear(1000, 100);
}