
export class Modal {
    type = '';
    japanList = [];
    constructor(type) {
        this.type = type;

        fetch("japan.json")
            .then(response => response.json())
            .then((json) => {
                this.japanList = json;
            });

    }



    modal(region) {
        const checkModal = document.querySelector('#modal');
        if (checkModal) {
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
        console.log('create modal')

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
        closeBtn.onclick = this.closeModal;

        const title = this.generateTitle(region);


        const body = document.createElement('body')
        body.className = 'modal-body';
        body.style.backgroundColor = '#ebf7fe'





        const bodyContainer = document.createElement('div');
        bodyContainer.classList = 'container text-center';
        // bodyContainer.style.background = '#ebf7fe';


        // generate flag
        const flag = this.generateFlag(region);
        bodyContainer.appendChild(flag);


        //generate avatar 
        for (var i = 0; i < 5; i++) {
            const avatar = this.generateAvatar(i);
            bodyContainer.appendChild(avatar);
        }
        // generate button
        const navButton = this.generateButton(region);
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

    generateFlag(code) {
        console.log('region',code);
        const flag = document.createElement('img');
        if (this.type === 'world') {
            flag.src = `https://flagcdn.com/${code.toLowerCase()}.svg`;
        } else {

            const region = this.japanList.find(x => x.code === code);
            flag.src = `japan_flag/Flag_of_${region.english}_Prefecture.svg`;
        }

        flag.style.marginBottom = '10px';
        flag.style.width = '100%';

        return flag;
    }

    generateButton(code) {
        const navButton = document.createElement('button');
        navButton.type = 'button';
        navButton.classList = 'btn btn-primary w-100';
        navButton.style.borderRadius = '25px';
        navButton.style.marginTop = '5px';


        if (this.type === 'world') {

            const intl = new Intl.DisplayNames(['ja-jp'], { type: 'region' })
            // TODO: only for world now
            navButton.innerText = intl.of(code) + 'のページへ';
        } else {
            const region = this.japanList.find(x => x.code === code);
            navButton.innerText = region.name + 'のページへ';;
        }
        return navButton
    }


    generateTitle(code) {
        const title = document.createElement('h5');
        title.classList = 'modal-title w-100';
        title.style.textAlign = 'center'
        title.id = 'title';

        if (this.type === 'world') {
            const intl = new Intl.DisplayNames(['ja-jp'], { type: 'region' })
            title.innerText = intl.of(code)
        } else {
            const region = this.japanList.find(x => x.code === code);

            console.log('region', region, code, this.japanList);
            title.innerText = region.name;
        }


        return title
    }

    closeModal() {
        const modal = new bootstrap.Modal(document.getElementById('modal'));
        modal.hide();
        // document.querySelector('#modal').remove();

    }


}