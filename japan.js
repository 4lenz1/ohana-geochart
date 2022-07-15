

fetch("japan.json")
    .then(response => response.json())
    .then((json) => {
        japanList = json;
        createSelectJapan();
    });

document.getElementById('select-japan').addEventListener('change', function () {
    createJapanModal(this.value);
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

function createJapanModal(code) {

    console.log('code ', code);



    const intl = japanList.find(x => x.code === code);


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
    closeBtn.onclick = closeJapanModal;

    const title = document.createElement('h5');
    title.classList = 'modal-title w-100';
    title.style.textAlign = 'center'
    title.id = 'title';
    title.innerText = intl.name;


    const body = document.createElement('body')
    body.className = 'modal-body';
    body.style.backgroundColor = '#ebf7fe'


    const bodyContainer = document.createElement('div');
    bodyContainer.classList = 'container text-center';



    const flag = document.createElement('img');
    flag.src = `japan_flag/Flag_of_${intl.english}_Prefecture.svg`;
    flag.style.width = '100%';
    flag.style.marginBottom = '10px'
    bodyContainer.appendChild(flag);


    const avatarTypeList = ['bottts', 'avataaars', 'identicon', 'jdenticon', 'gridy', 'croodles', 'adventurer', 'big-smile', 'personas'];
    const avatarType = Math.floor(Math.random() * (avatarTypeList.length));

    for (var i = 0; i < 5; i++) {
        const avatar = document.createElement('img');
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
    navButton.style.marginTop = '5px';
    navButton.style.borderRadius = '25px';
    navButton.classList = 'btn btn-primary w-100';
    navButton.innerText = intl.name + 'のページへ';
    bodyContainer.appendChild(navButton);

    body.appendChild(bodyContainer);



    header.appendChild(title);
    header.appendChild(closeBtn);
    content.appendChild(header);
    // content.appendChild(footer);
    content.appendChild(body);
    dialog.appendChild(content);
    modal.appendChild(dialog);



    document.body.querySelector('#chart-japan').after(modal);

    const modalEl = new bootstrap.Modal(document.getElementById('modal'));
    modalEl.show();
    // modal.style.display = 'block';
    // modal.classList.add('show');
}




function closeJapanModal() {
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    modal.hide();
    // document.querySelector('#modal').remove();

}








document.addEventListener("DOMContentLoaded", () => {
    initialJapanMap();
});



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
    var japanPolygonSeries = japanChart.series.push(
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
            createJapanModal(target.dataItem.dataContext.id);
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