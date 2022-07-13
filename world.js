google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});

google.charts.setOnLoadCallback(drawRegionsMap);

function selectHandler(region) {
    createWorldModal(region.region);
}




document.addEventListener('DOMContentLoaded', () => {
    const instance = NiceSelect.bind(document.querySelector('#select-world'), { searchable: true });
})


document.getElementById('select-world').addEventListener('change', function () {
    createWorldModal(this.value);
});



function drawRegionsMap() {
    const codes = [
        ['Country'],
        // ['Germany', 'ドイツ'],
        // ['United States', 'アメリカ'],
        // ['Brazil', 'ブラジル'],
        // ['Canada', 'カナダ'],
        // ['France', 'フランス'],
        // ['RU', 'ロシア'],
        // ['JP', 'にほん'],
        // ['TW', 'TAIWAN']
        // ['Country', 'Name'],
        ['Afghanistan'],	 //	AF
        ['Åland Islands'],	 //	AX
        ['Albania'],	 //	AL
        ['Algeria'],	 //	DZ
        ['American Samoa'],	 //	AS
        ['Andorra'],	 //	AD
        ['Angola'],	 //	AO
        ['Anguilla'],	 //	AI
        ['Antarctica'],	 //	AQ
        ['Antigua and Barbuda'],	 //	AG
        ['Argentina'],	 //	AR
        ['Armenia'],	 //	AM
        ['Aruba'],	 //	AW
        ['Australia'],	 //	AU
        ['Austria'],	 //	AT
        ['Azerbaijan'],	 //	AZ
        ['Bahamas'],	 //	BS
        ['Bahrain'],	 //	BH
        ['Bangladesh'],	 //	BD
        ['Barbados'],	 //	BB
        ['Belarus'],	 //	BY
        ['Belgium'],	 //	BE
        ['Belize'],	 //	BZ
        ['Benin'],	 //	BJ
        ['Bermuda'],	 //	BM
        ['Bhutan'],	 //	BT
        ['Bolivia (Plurinational State of)'],	 //	BO
        ['Bonaire, Sint Eustatius and Saba'],	 //	BQ
        ['Bosnia and Herzegovina'],	 //	BA
        ['Botswana'],	 //	BW
        ['Bouvet Island'],	 //	BV
        ['Brazil'],	 //	BR
        ['British Indian Ocean Territory'],	 //	IO
        ['Brunei Darussalam'],	 //	BN
        ['Bulgaria'],	 //	BG
        ['Burkina Faso'],	 //	BF
        ['Burundi'],	 //	BI
        ['Cabo Verde'],	 //	CV
        ['Cambodia'],	 //	KH
        ['Cameroon'],	 //	CM
        ['Canada'],	 //	CA
        ['Cayman Islands'],	 //	KY
        ['Central African Republic'],	 //	CF
        ['Chad'],	 //	TD
        ['Chile'],	 //	CL
        ['China'],	 //	CN
        ['Christmas Island'],	 //	CX
        ['Cocos (Keeling) Islands'],	 //	CC
        ['Colombia'],	 //	CO
        ['Comoros'],	 //	KM
        ['Congo'],	 //	CG
        ['Congo (Democratic Republic of the)'],	 //	CD
        ['Cook Islands'],	 //	CK
        ['Costa Rica'],	 //	CR
        ['Côte d\'Ivoire'],	 //	CI
        ['Croatia'],	 //	HR
        ['Cuba'],	 //	CU
        ['Curaçao'],	 //	CW
        ['Cyprus'],	 //	CY
        ['Czechia'],	 //	CZ
        ['Denmark'],	 //	DK
        ['Djibouti'],	 //	DJ
        ['Dominica'],	 //	DM
        ['Dominican Republic'],	 //	DO
        ['Ecuador'],	 //	EC
        ['Egypt'],	 //	EG
        ['El Salvador'],	 //	SV
        ['Equatorial Guinea'],	 //	GQ
        ['Eritrea'],	 //	ER
        ['Estonia'],	 //	EE
        ['Ethiopia'],	 //	ET
        ['Falkland Islands (Malvinas)'],	 //	FK
        ['Faroe Islands'],	 //	FO
        ['Fiji'],	 //	FJ
        ['Finland'],	 //	FI
        ['France'],	 //	FR
        ['French Guiana'],	 //	GF
        ['French Polynesia'],	 //	PF
        ['French Southern Territories'],	 //	TF
        ['Gabon'],	 //	GA
        ['Gambia'],	 //	GM
        ['Georgia'],	 //	GE
        ['Germany'],	 //	DE
        ['Ghana'],	 //	GH
        ['Gibraltar'],	 //	GI
        ['Greece'],	 //	GR
        ['Greenland'],	 //	GL
        ['Grenada'],	 //	GD
        ['Guadeloupe'],	 //	GP
        ['Guam'],	 //	GU
        ['Guatemala'],	 //	GT
        ['Guernsey'],	 //	GG
        ['Guinea'],	 //	GN
        ['Guinea-Bissau'],	 //	GW
        ['Guyana'],	 //	GY
        ['Haiti'],	 //	HT
        ['Heard Island and McDonald Islands'],	 //	HM
        ['Holy See'],	 //	VA
        ['Honduras'],	 //	HN
        ['Hong Kong'],	 //	HK
        ['Hungary'],	 //	HU
        ['Iceland'],	 //	IS
        ['India'],	 //	IN
        ['Indonesia'],	 //	ID
        ['Iran (Islamic Republic of)'],	 //	IR
        ['Iraq'],	 //	IQ
        ['Ireland'],	 //	IE
        ['Isle of Man'],	 //	IM
        ['Israel'],	 //	IL
        ['Italy'],	 //	IT
        ['Jamaica'],	 //	JM
        ['Japan'],	 //	JP
        ['Jersey'],	 //	JE
        ['Jordan'],	 //	JO
        ['Kazakhstan'],	 //	KZ
        ['Kenya'],	 //	KE
        ['Kiribati'],	 //	KI
        ['Korea (Democratic People\'s Republic of)'],	 //	KP
        ['Korea (Republic of)'],	 //	KR
        ['Kuwait'],	 //	KW
        ['Kyrgyzstan'],	 //	KG
        ['Lao People\'s Democratic Republic'],	 //	LA
        ['Latvia'],	 //	LV
        ['Lebanon'],	 //	LB
        ['Lesotho'],	 //	LS
        ['Liberia'],	 //	LR
        ['Libya'],	 //	LY
        ['Liechtenstein'],	 //	LI
        ['Lithuania'],	 //	LT
        ['Luxembourg'],	 //	LU
        ['Macao'],	 //	MO
        ['Macedonia (the former Yugoslav Republic of)'],	 //	MK
        ['Madagascar'],	 //	MG
        ['Malawi'],	 //	MW
        ['Malaysia'],	 //	MY
        ['Maldives'],	 //	MV
        ['Mali'],	 //	ML
        ['Malta'],	 //	MT
        ['Marshall Islands'],	 //	MH
        ['Martinique'],	 //	MQ
        ['Mauritania'],	 //	MR
        ['Mauritius'],	 //	MU
        ['Mayotte'],	 //	YT
        ['Mexico'],	 //	MX
        ['Micronesia (Federated States of)'],	 //	FM
        ['Moldova (Republic of)'],	 //	MD
        ['Monaco'],	 //	MC
        ['Mongolia'],	 //	MN
        ['Montenegro'],	 //	ME
        ['Montserrat'],	 //	MS
        ['Morocco'],	 //	MA
        ['Mozambique'],	 //	MZ
        ['Myanmar'],	 //	MM
        ['Namibia'],	 //	NA
        ['Nauru'],	 //	NR
        ['Nepal'],	 //	NP
        ['Netherlands'],	 //	NL
        ['New Caledonia'],	 //	NC
        ['New Zealand'],	 //	NZ
        ['Nicaragua'],	 //	NI
        ['Niger'],	 //	NE
        ['Nigeria'],	 //	NG
        ['Niue'],	 //	NU
        ['Norfolk Island'],	 //	NF
        ['Northern Mariana Islands'],	 //	MP
        ['Norway'],	 //	NO
        ['Oman'],	 //	OM
        ['Pakistan'],	 //	PK
        ['Palau'],	 //	PW
        ['Palestine, State of'],	 //	PS
        ['Panama'],	 //	PA
        ['Papua New Guinea'],	 //	PG
        ['Paraguay'],	 //	PY
        ['Peru'],	 //	PE
        ['Philippines'],	 //	PH
        ['Pitcairn'],	 //	PN
        ['Poland'],	 //	PL
        ['Portugal'],	 //	PT
        ['Puerto Rico'],	 //	PR
        ['Qatar'],	 //	QA
        ['Réunion'],	 //	RE
        ['Romania'],	 //	RO
        ['Russia'],	 //	RU
        ['Rwanda'],	 //	RW
        ['Saint Barthélemy'],	 //	BL
        ['Saint Helena, Ascension and Tristan da Cunha'],	 //	SH
        ['Saint Kitts and Nevis'],	 //	KN
        ['Saint Lucia'],	 //	LC
        ['Saint Martin (French part)'],	 //	MF
        ['Saint Pierre and Miquelon'],	 //	PM
        ['Saint Vincent and the Grenadines'],	 //	VC
        ['Samoa'],	 //	WS
        ['San Marino'],	 //	SM
        ['Sao Tome and Principe'],	 //	ST
        ['Saudi Arabia'],	 //	SA
        ['Senegal'],	 //	SN
        ['Serbia'],	 //	RS
        ['Seychelles'],	 //	SC
        ['Sierra Leone'],	 //	SL
        ['Singapore'],	 //	SG
        ['Sint Maarten (Dutch part)'],	 //	SX
        ['Slovakia'],	 //	SK
        ['Slovenia'],	 //	SI
        ['Solomon Islands'],	 //	SB
        ['Somalia'],	 //	SO
        ['South Africa'],	 //	ZA
        ['South Georgia and the South Sandwich Islands'],	 //	GS
        ['South Sudan'],	 //	SS
        ['Spain'],	 //	ES
        ['Sri Lanka'],	 //	LK
        ['Sudan'],	 //	SD
        ['Suriname'],	 //	SR
        ['Svalbard and Jan Mayen'],	 //	SJ
        ['Swaziland'],	 //	SZ
        ['Sweden'],	 //	SE
        ['Switzerland'],	 //	CH
        ['Syrian Arab Republic'],	 //	SY
        ['Taiwan'],	 //	TW
        ['Tajikistan'],	 //	TJ
        ['Tanzania, United Republic of'],	 //	TZ
        ['Thailand'],	 //	TH
        ['Timor-Leste'],	 //	TL
        ['Togo'],	 //	TG
        ['Tokelau'],	 //	TK
        ['Tonga'],	 //	TO
        ['Trinidad and Tobago'],	 //	TT
        ['Tunisia'],	 //	TN
        ['Turkey'],	 //	TR
        ['Turkmenistan'],	 //	TM
        ['Turks and Caicos Islands'],	 //	TC
        ['Tuvalu'],	 //	TV
        ['Uganda'],	 //	UG
        ['Ukraine'],	 //	UA
        ['United Arab Emirates'],	 //	AE
        ['United Kingdom of Great Britain and Northern Ireland'],	 //	GB
        ['United States'],	 //	US
        ['United States Minor Outlying Islands'],	 //	UM
        ['Uruguay'],	 //	UY
        ['Uzbekistan'],	 //	UZ
        ['Vanuatu'],	 //	VU
        ['Venezuela (Bolivarian Republic of)'],	 //	VE
        ['Vietnam'],	 //	VN
        ['Vatican City State'], // VA
        ['Virgin Islands (British)'],	 //	VG
        ['Virgin Islands (U.S.)'],	 //	VI
        ['Wallis and Futuna'],	 //	WF
        ['Western Sahara'],	 //	EH
        ['Yemen'],	 //	YE
        ['Zambia'],	 //	ZM
        ['Zimbabwe']	 //	ZW
    ];
    const data = google.visualization.arrayToDataTable(codes);
    const options = {
        defaultColor: '#3cb371',
        backgroundColor: '#ebf7fe',
        // region: 'VA',
        // displayMode: 'markers',
        // colorAxis: {colors: ['green', 'blue']}
    };
    const chart = new google.visualization.GeoChart(document.getElementById('world-map'));

    google.visualization.events.addListener(chart, 'regionClick', selectHandler);
    chart.draw(data, options);
}




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





    const bodyContainer = document.createElement('div');
    bodyContainer.classList = 'container text-center';


    const flag = document.createElement('img');
    flag.src = `https://flagcdn.com/${region.toLowerCase()}.svg`;
    flag.style.marginBottom = '10px'
    flag.style.width = '100%'
    bodyContainer.appendChild(flag);


    const avatarTypeList = ['bottts', 'avataaars', 'identicon', 'jdenticon', 'gridy'];
    const avatarType = Math.floor(Math.random() * 4);
    for (var i = 0; i < 5; i++) {
        const avatar = document.createElement('img');
        avatar.classLis = "rounded-circle shadow-4";
        avatar.classLis = "rounded-circle";
        avatar.style.width = '50px';
        avatar.style.borderRadius = '50%';
        avatar.style.margin= '0px 5px 0px 5px';
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
    navButton.classList = 'tn btn-primary w-100';
    navButton.innerText = intl.of(region) + 'のページへ';
    bodyContainer.appendChild(navButton);

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



    document.body.querySelector('#world-map').after(modal);

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


function setDropdown() {

}