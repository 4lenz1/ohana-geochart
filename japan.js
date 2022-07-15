import { Modal } from "./modal.js";

var japanList = [];
const japanModal = new Modal('japan');
fetch("japan.json")
    .then(response => response.json())
    .then((json) => {
        japanList = json;
        createSelectJapan();
    });

document.getElementById('select-japan').addEventListener('change', function () {
    // createJapanModal(this.value);



    let dataItem = japanPolygonSeries.getDataItemById(this.value);
    japanPolygonSeries.zoomToDataItem(dataItem);
    japanModal.modal(this.value);

});


function createSelectJapan() {
    // bind 
    const instance = NiceSelect.bind(document.querySelector('#select-japan'), { searchable: true });

    const select = document.querySelector('#select-japan');

    japanList.forEach(x => {
        const option = document.createElement('option');
        option.value = x.code;
        option.textContent = x.name;

        select.appendChild(option);

    });

    instance.update();

}




document.addEventListener("DOMContentLoaded", () => {
    initialJapanMap();
});

var japanPolygonSeries;

function initialJapanMap() {
    // Create root
    var japanRoot = am5.Root.new("chart-japan");

    // Set themes
    japanRoot.setThemes([
        am5themes_Animated.new(japanRoot)
    ]);

    // Create chart
    var japanChart = japanRoot.container.children.push(am5map.MapChart.new(japanRoot, {
        panX: "translateX",
        panY: "translateY",
        // maxPanOut: 1,
        // projection: am5map.geoMercator(),
        // layout: japanRoot.horizontalLayout
    }));




    // Create polygon series
    japanPolygonSeries = japanChart.series.push(
        am5map.MapPolygonSeries.new(japanRoot, {
            geoJSON: am5geodata_japanLow,
            geodataNames: am5geodata_lang_JA,
            valueField: "value",
            calculateAggregates: true
        }));


    japanPolygonSeries.mapPolygons.template.setAll({
        tooltipText: "{name}",
        toggleKey: "active",
        interactive: true
    });
    japanPolygonSeries.mapPolygons.template.states.create("hover", {
        fill: japanRoot.interfaceColors.get("primaryButtonHover")
    });

    japanPolygonSeries.mapPolygons.template.states.create("active", {
        fill: japanRoot.interfaceColors.get("primaryButtonHover")
    });


    var japanPreviousPolygon;

    japanPolygonSeries.mapPolygons.template.on("active", function (active, target) {
        if (japanPreviousPolygon && japanPreviousPolygon != target) {
            japanPreviousPolygon.set("active", false);
        }
        if (target.get("active")) {
            // createJapanModal(target.dataItem.dataContext.id);
            // const modal = new Modal('japan');
            japanModal.modal(target.dataItem.dataContext.id);
        


            japanPolygonSeries.zoomToDataItem(target.dataItem);
        }
        else {
            japanChart.goHome();
        }
        japanPreviousPolygon = target;
    });

    // Add zoom control
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
    japanChart.set("zoomControl", am5map.ZoomControl.new(japanRoot, {}));


    // Set clicking on "water" to zoom out
    japanChart.chartContainer.get("background").events.on("click", function () {
        japanChart.goHome();
    })


    // Make stuff animate on load
    japanChart.appear(1000, 100);

}


function closeJapanModal() {
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.hide();
    // document.querySelector('#modal').remove();

}
