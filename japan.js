google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});

google.charts.setOnLoadCallback(drawJapanRegionsMap);

var japanList = [];

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
function selectJapanHandler(region) {
    createJapanModal(region.region);
}

function drawJapanRegionsMap() {
    const codes = [
        ["都道縣府"],
        ["愛知"],
        ["秋田"],
        ["青森"],
        ["千葉"],
        ["愛媛"],
        ["福井"],
        ["福岡"],
        ["福島"],
        ["岐阜"],
        ["群馬"],
        ["広島"],
        ["北海道"],
        ["兵庫"],
        ["茨城"],
        ["石川"],
        ["岩手"],
        ["香川"],
        ["鹿児島"],
        ["神奈川"],
        ["高知"],
        ["熊本"],
        ["京都"],
        ["三重"],
        ["宮城"],
        ["宮崎"],
        ["長野"],
        ["長崎"],
        ["奈良"],
        ["新潟"],
        ["大分"],
        ["岡山"],
        ["沖縄"],
        ["大阪"],
        ["佐賀"],
        ["埼玉"],
        ["滋賀"],
        ["島根"],
        ["静岡"],
        ["栃木"],
        ["徳島"],
        ["東京"],
        ["鳥取"],
        ["富山"],
        ["和歌山"],
        ["山形"],
        ["山口"],
        ["山梨"],
    ];
    const data = google.visualization.arrayToDataTable(codes);
    const options = {
        defaultColor: '#3cb371',
        region: 'JP',
        backgroundColor: '#ebf7fe',
        // displayMode: 'markers',
        resolution: 'provinces',
    };
    const chart = new google.visualization.GeoChart(document.getElementById('japan-map'));

    google.visualization.events.addListener(chart, 'regionClick', selectJapanHandler);
    chart.draw(data, options);
}

function createJapanModal(code) {

    console.log(code);


    // console.log(japanList);


    const intl = japanList.find(x => x.code === code);


    const checkModal = document.querySelector('#modal');
    if (checkModal) {
        checkModal.remove();
    }
    const modal = document
        .createElement('div');
    modal.id = 'modal';
    modal.setAttribute('role', 'dialog');
    modal.classList = 'modal fade rounded-20';
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-labelledby', 'modal')

    const dialog = document.createElement('div');
    dialog.classList = 'modal-dialog modal-dialog-centered';
    dialog.setAttribute('role', 'document');


    const content = document.createElement('div');
    content.className = 'modal-content rounded-25';

    const header = document.createElement('div');
    header.classList = 'modal-header text-center';

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
    title.innerText = intl.name;


    const body = document.createElement('body')
    body.className = 'modal-body';


    const bodyContainer = document.createElement('div');
    bodyContainer.classList = 'container text-center';



    const flag = document.createElement('img');
    flag.src = `japan_flag/Flag_of_${intl.english}_Prefecture.svg`;
    flag.style.width = '100%';
    flag.style.marginBottom = '10px'
    bodyContainer.appendChild(flag);


    const avatarTypeList = ['bottts', 'avataaars', 'identicon', 'jdenticon', 'gridy'];
    const avatarType = Math.floor(Math.random() * 4);
    for (var i = 0; i < 5; i++) {
        const avatar = document.createElement('img');
        avatar.classLis = "rounded-circle shadow-4";
        avatar.style.width = '50px';
        avatar.setAttribute('alt', 'Avatar');
        const seed = +new Date() * i;
        avatar.src = `https://avatars.dicebear.com/api/${avatarTypeList[avatarType]}/${seed}.svg`
        bodyContainer.appendChild(avatar);
    }

    const navButton = document.createElement('button');
    navButton.type = 'button';
    navButton.style.borderRadius = '15px';
    navButton.classList = ' btn-primary w-100';
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



    document.body.querySelector('#japan-map').after(modal);

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

