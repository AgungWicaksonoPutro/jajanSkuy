window.onload = () => {
    const defaultLiffId = "1655536452-40OE6Vzz";
    initializeLiffOrDie(defaultLiffId );

}

function initializeLiffOrDie(LiffId){
    if(!LiffId){
        const appError = `
            <div class="container-fluid">
                <div class="error">
                    <i class="fas fa-bug"></i>
                    <h3>JajanSkuy Error Guys, Maaf ya ... Developernya Capek Update!</h3>
                </div>
            </div>
        `
        document.body.innerHTML = appError
    }
    initializeLiff(LiffId);
}

function initializeLiff(liffId){
    liff
        .init({
            liffId: liffId
        })
        .then(()=>{
            initializeApp()
        })
        .catch((err)=>{
            const appError = `
                <div class="container-fluid">
                    <div class="error">
                        <i class="fas fa-bug"></i>
                        <h3>${err}</h3>
                    </div>
                </div>
                `
            document.body.innerHTML = appError
        })
}

function initializeApp(){
    if (liff.isLoggedIn()){
        window.onload = Swal.fire({
            title: 'Menyiapkan Data',
            width: 'auto',
            timer: 1500,
            didOpen: () => {
                Swal.showLoading();
            }
        })
        .then(() => {
            getprofileInfo();
            controlUser();
            loadPOSApp();
        })
    } else {
        const userLogin = `
                    <div class="error-validasi shadow">
                        <button onclick="login()" type="button" class="btn btn-success mb-2 mt-1">Log in</button>
                        <p>Untuk menggunakan JajanSkuy Silahkan Login Terlebih Dahulu Ya!</p>
                    </div>
                `
        document.body.innerHTML = userLogin
    }
}

function login(){
    if (!liff.isLoggedIn()){
        liff.login();
    }
}

function getprofileInfo() {
    liff.getProfile()
        .then((res) => {
            console.log(res.pictureUrl)
            localStorage.setItem('name', res.displayName);
            localStorage.setItem('id', res.userId);
            if(res.pictureUrl === '' && res.displayName === ''){
                const setImg = `
                    <div id="setImg" class="btn-custom img-container me-1">
                        <img onclick="dropDown();" class="dropbtn" src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png" alt="">
                    </div>
                    <div>Anonymous</div>
                `
                $('.nav-item').html(setImg)
            } else if(res.pictureUrl === ''){
                const setImg = `
                    <div id="setImg" class="btn-custom img-container me-1">
                        <img onclick="dropDown();" class="dropbtn" src="https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png" alt="">
                    </div>
                    <div>${res.displayName}</div>
                `
                $('.nav-item').html(setImg)
            } else if (res.displayName === '' ){
                const setImg = `
                    <div id="setImg" class="btn-custom img-container me-1">
                        <img onclick="dropDown();" class="dropbtn" src="${res.pictureUrl}" alt="">
                    </div>
                    <div>Anonymous</div>
                `
                $('.nav-item').html(setImg)
            } else {
                const setImg = `
                    <div id="setImg" class="btn-custom img-container me-1">
                        <img onclick="dropDown();" class="dropbtn" src="${res.pictureUrl}" alt="">
                    </div>
                    <div>${res.displayName}</div>
                `
                $('.nav-item').html(setImg)
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

function controlUser(){
    if(!liff.isInClient()){
        document.getElementById('close-window').classList.add('hidden')
        document.getElementById('send-message').classList.add('hidden')
    } else {
        document.getElementById('logout').classList.add('hidden')
    }
}

function openLiffWindow(){
    liff.openWindow({
        url: 'https://jajanskuyapps.herokuapp.com/',
        external: true
    })
}

function closeApp(){
    liff.closeWindow()
}

function logout(){
    if (liff.isLoggedIn()) {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure Log Out?',
            showCancelButton: true,
            confirmButtonText: `Yes, Log Out!`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('name')
                localStorage.removeItem('id')
                liff.logout()
                Swal.fire('Thanks for visiting', 'success')
            }
        }).then((result)=>{
            window.location.reload();
        })
    }
}

function buy(){
    Swal.fire({
        icon: 'success',
        title: 'Mohon Ditunggu Pesanannmu Segera Diantar',
        showConfirmButton: false,
        timer: 1500
    }).then((res)=>{
        let name = localStorage.getItem('name')
        let cartItem = ''
        cartItem += `Pesananmu:`
        cart.items.forEach(a => {
            cartItem += `
            ${a.name} ${a.qty}x = Rp.${a.total}
            `
        })
        cartItem += `Total yang harus kamu bayar Rp.${cart.totalPrice} \n`
        cartItem += `Terimakasih kak ${name} sudah jajan di JajanSkuy`
        if (liff.isInClient()){
            liff.sendMessages([{
                'type': 'text',
                'text': `${cartItem}`
            }]).then(function () {
                toggle()
            }).catch(function (error) {
                window.alert('Error sending message: ' + error);
            });
        } else {
            toggle()
        }
    })
}

function handleMessage(){
    let name = localStorage.getItem('name')
    let cartItem = ''
    cartItem += `Hai kak ${name} klik buy untuk jajan di JajanSkuy \n`
    cartItem += `Pesananmu:`
    cart.items.forEach(a=>{
        cartItem += `
        ${a.name} ${a.qty}x = Rp.${a.total}
        `
    })
    liff.sendMessages([{
        'type': 'text',
        'text': `${cartItem}`
    }]).then(function () {
        Swal.fire({
            icon: 'success',
            title: 'Pesan Terkirim',
            showConfirmButton: false,
            timer: 1500
        })
    }).catch(function (error) {
        window.alert('Error sending message: ' + error);
    });
}