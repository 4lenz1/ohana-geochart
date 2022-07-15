


document.addEventListener('DOMContentLoaded', () => {
    const instance = NiceSelect.bind(document.querySelector('#select-world'), { searchable: true });
})


document.getElementById('select-world').addEventListener('change', function () {
    createWorldModal(this.value);

    let dataItem = polygonSeries.getDataItemById(this.value);
    polygonSeries.zoomToDataItem(dataItem);
});




function createWorldModal(region) {

    const intl = new Intl.DisplayNames(['ja-jp'], { type: 'region' })


    const checkModal = document.querySelector('#modal');
    if (checkModal) {
        checkModal.remove();
    }
    const modal = document
        .createElement('div');
    modal.id = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.classList = 'modal fade';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-labelledby', 'modal')

    const dialog = document.createElement('div');
    dialog.classList = 'modal-dialog modal-dialog-centered';
    dialog.setAttribute('role', 'document');


    const content = document.createElement('div');
    content.className = 'modal-content';

    const header = document.createElement('div');
    header.classList = 'modal-header text-center';
    header.style.backgroundColor = '#ebf7fe';

    const closeBtn = document.createElement('button');
    closeBtn.id = 'close'
    closeBtn.className = 'btn-close';
    closeBtn.type = 'button';
    closeBtn.setAttribute('data-bs-dismiss', 'modal');
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.onclick = closeModal;

    const title = document.createElement('h5');
    title.classList = 'modal-title w-100';
    title.style.textAlign = 'center'
    title.id = 'title';
    title.innerText = intl.of(region);


    const body = document.createElement('body')
    body.className = 'modal-body';
    body.style.backgroundColor = '#ebf7fe'





    const bodyContainer = document.createElement('div');
    bodyContainer.classList = 'container text-center';
    // bodyContainer.style.background = '#ebf7fe';

    const flag = document.createElement('img');
    flag.src = `https://flagcdn.com/${region.toLowerCase()}.svg`;
    flag.style.marginBottom = '10px'
    flag.style.width = '100%'
    bodyContainer.appendChild(flag);


    const avatarTypeList = ['bottts', 'avataaars', 'identicon', 'jdenticon', 'gridy', 'croodles', 'adventurer', 'big-smile', 'personas'];
    const avatarType = Math.floor(Math.random() * (avatarTypeList.length));
    for (var i = 0; i < 5; i++) {
        const avatar = document.createElement('img');
        avatar.classLis = "rounded-circle shadow-4";
        avatar.classLis = "rounded-circle";
        avatar.style.width = '50px';
        avatar.style.borderRadius = '50%';
        avatar.style.margin = '0px 5px 0px 5px';
        avatar.style.borderStyle = 'solid';
        avatar.style.borderColor = '#B2C8DF'
        avatar.style.borderWidth = '2px';
        avatar.setAttribute('alt', 'Avatar');
        const seed = +new Date() * i;
        avatar.src = `https://avatars.dicebear.com/api/${avatarTypeList[avatarType]}/${seed}.svg`
        bodyContainer.appendChild(avatar);
    }





    const navButton = document.createElement('button');
    navButton.type = 'button';
    navButton.classList = 'btn btn-primary w-100';
    navButton.style.borderRadius = '25px';
    navButton.innerText = intl.of(region) + 'のページへ';
    bodyContainer.appendChild(navButton);
    navButton.style.marginTop = '5px';

    body.appendChild(bodyContainer);


    // const footer = document.createElement('div');
    // footer.className = 'modal-footer';

    header.appendChild(title);
    header.appendChild(closeBtn);
    content.appendChild(header);
    // content.appendChild(footer);
    content.appendChild(body);
    dialog.appendChild(content);
    modal.appendChild(dialog);



    document.body.querySelector('#chart-world').after(modal);

    const modalEl = new bootstrap.Modal(document.getElementById('modal'));
    modalEl.show();
    // modal.style.display = 'block';
    // modal.classList.add('show');
}




function closeModal() {
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.hide();
    // document.querySelector('#modal').remove();

}








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
            createWorldModal(target.dataItem.dataContext.id);
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