
export class Modal {
    type = '';
    japanList = [];

    constructor(type) {
        this.type = type;
        console.log('type', type);
        fetch("japan.json")
            .then(response => response.json())
            .then((json) => {
                this.japanList = json;
            });

    }



    modal(region) {
        const checkModal = document.querySelector('#modal');
        if (checkModal) {
            // update modal title  
            const name = this.generateTitleText(region);
            document.querySelector('#modal-title').innerHTML = name.japanese;
            document.querySelector('#modal-subtitle').innerHTML = name.english;

            // update flag 
            document.querySelector('#modal-flag').src = this.generateFlagSrc(region);

            const button = document.querySelector('#nav-button');
            button.onclick = () => {
                window.location.href = this.generateButtonUrl(code);
            }
            button.innerHTML = this.generateButtonInfo(region);


            const modalEl = new bootstrap.Modal(checkModal);
            modalEl.show();
        } else {
            this.createModal(region);
        }
    }
    closeModal() {
        const modal = new bootstrap.Modal(document.getElementById('modal'));
        modal.hide();
        // document.querySelector('#modal').remove();

    }
    createModal(region) {

        const modal = document
            .createElement('div');
        modal.id = 'modal';
        modal.setAttribute('role', 'dialog');
        modal.classList = 'modal fade';
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('aria-labelledby', 'modal')

        const dialog = document.createElement('div');
        dialog.classList = 'modal-dialog modal-dialog-centered modal-lg';
        dialog.setAttribute('role', 'document');


        const content = document.createElement('div');
        content.className = 'modal-content';

        const header = document.createElement('div');
        header.classList = 'modal-header text-center row';
        header.style.backgroundColor = '#ebf7fe';

        //TODO: disable temp
        // const closeBtn = document.createElement('button');
        // closeBtn.id = 'close'
        // closeBtn.className = 'btn-close';
        // closeBtn.type = 'button';
        // closeBtn.setAttribute('data-bs-dismiss', 'modal');
        // closeBtn.setAttribute('aria-label', 'Close');
        // closeBtn.onclick = this.closeModal;

        const title = this.generateTitleEl(region, 'modal-title', 'h5');
        const subTitle = this.generateTitleEl(region, 'modal-subtitle', 'p');

        const body = document.createElement('body')
        body.className = 'modal-body';
        body.style.backgroundColor = '#ebf7fe'





        const bodyContainer = document.createElement('div');
        bodyContainer.classList = 'container text-center';
        // bodyContainer.style.background = '#ebf7fe';


        // generate flag
        const flagRow = document.createElement('div');
        flagRow.classList = 'row';
        const flag = this.generateFlagEl(region);
        flagRow.appendChild(flag)
        bodyContainer.appendChild(flagRow);



        // generate button
        const buttonRow = document.createElement('div');
        buttonRow.classList = 'row';

        const buttonCol =  document.createElement('div');
        buttonCol.classList = 'col-md-12';
        const navButton = this.generateButtonEl(region);
        buttonCol.appendChild(navButton);
        buttonRow.appendChild(buttonCol);
        bodyContainer.appendChild(buttonRow);

        //generate avatar 
        for (var i = 0; i < 7; i++) {
            const avatar = this.generateAvatar(i);
            bodyContainer.appendChild(avatar);
        }

        body.appendChild(bodyContainer);


        // const footer = document.createElement('div');
        // footer.className = 'modal-footer';
        header.appendChild(title);
        header.appendChild(subTitle);
        // header.appendChild(closeBtn);
        content.appendChild(header);
        content.appendChild(body);
        dialog.appendChild(content);
        modal.appendChild(dialog);



        document.body.appendChild(modal);

        const modalEl = new bootstrap.Modal(document.getElementById('modal'));
        modalEl.show();
    }


    generateAvatar(index) {
        const avatarTypeList = ['bottts', 'avataaars', 'identicon', 'jdenticon', 'gridy', 'croodles', 'adventurer', 'big-smile', 'personas'];
        const avatarType = Math.floor(Math.random() * (avatarTypeList.length));


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
        const seed = +new Date() * index;
        avatar.src = `https://avatars.dicebear.com/api/${avatarTypeList[avatarType]}/${seed}.svg`;

        return avatar;
    }

    generateFlagEl(code) {

        console.log('region', code);
        const flag = document.createElement('img');
        flag.id = 'modal-flag';

        flag.src = this.generateFlagSrc(code);
        flag.style.marginBottom = '10px';
        flag.style.width = '100%';
        flag.style.maxHeight = '250px';
        flag.style.objectFit = 'contain';



        return flag;
    }

    generateFlagSrc(code) {
        if (this.type === 'world') {
            return `https://flagcdn.com/${code.toLowerCase()}.svg`;
        } else {
            const areaCode = code.split('-')[1];
            return `https://hontomo.jp/images/japanmap/${+areaCode}.png`;

        }
    }

    generateButtonEl(code) {
        const navButton = document.createElement('button');
        navButton.type = 'button';
        navButton.id = 'nav-button'
        navButton.classList = 'btn btn-primary';
        navButton.style.width = '40%';
        navButton.style.borderRadius = '10px';
        navButton.style.marginTop = '5px';
        navButton.style.marginBottom = '10px'
        navButton.innerText = this.generateButtonInfo(code);
        navButton.onclick = () => {
            window.location.href = this.generateButtonUrl(code);
        }

        return navButton
    }

    generateButtonInfo(code) {
        if (this.type === 'world') {
            const intl = new Intl.DisplayNames(['ja-jp'], { type: 'region' })
            // return intl.of(code) + 'のページへ';
            return 'ふるさとーく';
        } else {
            const region = this.japanList.find(x => x.code === code);
            return 'ふるさとーく';

            // return region.name + 'のページへ';
        }
    }

    generateButtonUrl(code) {
        if (this.type === 'world') {

            console.log('code', code);
            return `https://hontomo.jp/talkJapan?areacode=22`;

        } else {
            const areaCode = code.split('-')[1];
            return `https://hontomo.jp/talkJapan?areacode=${+areaCode}`;

        }
    }



    generateTitleEl(code, id, headingSize) {
        const title = document.createElement(headingSize);
        title.classList = 'modal-title w-100';
        title.style.textAlign = 'center';
        title.id = id;
        const name = this.generateTitleText(code);
        if (headingSize === 'h5') {
            // title
            title.innerText = name.japanese;
            title.style.fontWeight = '900';
            title.style.fontSize = '28px';

        } else {
            // sub title
            title.innerText = name.english;
            // title.style.fontWeight = '900';

        }

        return title
    }


    generateTitleText(code) {
        console.log('code', code)
        if (this.type === 'world') {
            const japanese = new Intl.DisplayNames(['ja-jp'], { type: 'region' });
            const english = new Intl.DisplayNames(['en'], { type: 'region' });

            const data = {
                'japanese': japanese.of(code),
                'english': english.of(code)
            }
            return data;
        } else {
            const region = this.japanList.find(x => x.code === code);
            return { 'japanese': region.name, 'english': region.english };
        }
    }

    closeModal() {
        const modal = new bootstrap.Modal(document.getElementById('modal'));
        modal.hide();
        // document.querySelector('#modal').remove();

    }


}