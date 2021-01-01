console.log('js active')

const menu = [
    { id: 1, category: 'makanan', name: 'Pecel Lele', price: '15000', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Pecel_Hariadhi.JPG'},
    { id: 2, category: 'makanan',  name: 'Rawon Setan', price: '24000', img: 'https://cdn0-production-images-kly.akamaized.net/WsWE2pk4g34XoCSKNLA3cS_7HSE=/640x480/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1281223/original/030607000_1467613172-rawon-setan.jpg'},
    { id: 3, category: 'makanan',  name: 'Tahu Gimbal', price: '19000', img: 'https://www.goodnewsfromindonesia.id/uploads/post/large-tahu-226939bfb98c5860ba18700abd378921.jpg'},
    { id: 4, category: 'makanan',  name: 'Kare Madura', price: '30000', img: 'https://img-global.cpcdn.com/recipes/05aa84b8736fde12/751x532cq70/kare-ayam-foto-resep-utama.jpg'},
    { id: 5, category: 'makanan',  name: 'Soto Lamongan', price: '19000', img: 'https://awsimages.detik.net.id/community/media/visual/2019/09/13/bfb173c3-1e98-4cbf-9337-a7504399be26_11.jpeg?w=700&q=90'},
    { id: 6, category: 'makanan',  name: 'Sate Ponorogo', price: '49000', img: 'https://i2.wp.com/resepkoki.id/wp-content/uploads/2017/10/Resep-Sate-Ponorogo.jpg?fit=1613%2C1290&ssl=1'},
    { id: 7, category: 'makanan',  name: 'Seblak', price: '29000', img: 'https://sweetrip.id/wp-content/uploads/2020/07/seblak_mewek_101711564_185155819492859_7157164616268631717_n.jpg'},
    { id: 8, category: 'makanan',  name: 'Spicy Wings', price: '39000', img: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/2/9/0/NY0908H_pats-spicy-peach-hot-wings_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371597361681.jpeg'},
    { id: 9, category: 'minuman',  name: 'Es Teh', price: '20000', img: 'https://faktualnews.co/images/2018/12/Es-teh-1280x720.jpg' },
    { id: 10, category: 'minuman', name: 'Es Jeruk', price: '23000', img: 'https://cf.shopee.co.id/file/e3b7dac7f42a159e8077d1ea88d6e01c' },
    { id: 11, category: 'minuman', name: 'Jus Mangga', price: '28000', img: 'https://s0.bukalapak.com/uploads/content_attachment/0bfe2ac083a1f0bed65e87b5/w-744/foto_ending_jus_mangga.jpg' },
    { id: 12, category: 'minuman', name: 'Jus Melon', price: '27000', img: 'https://photo.jpnn.com/arsip/normal/2019/03/28/jus-melon-foto-thecookbookpk.jpg' }
]

let cart = {
    items: [],
    totalPrice: 0
}

function loadPOSApp(){
        let menuList = '';
        menuList += '<h3 class="mx-4 mt-3">Menu</h3>'
        menuList += '<div class="d-flex flex-wrap">'
        menu.forEach((menu, index)=>{
            menuList += `
            <div class="card m-4 shadow">
                <div class="img-card">
                <img src="${menu.img}" class="card-img-top" alt="...">
                </div>
                <div class="card-body p-1">
                    <h5 class="card-title">${menu.name}</h5>
                    <p class="card-text m-0 p-0">Rp. ${numeral(menu.price).format('0,0')}</p>
                    <a href="javascript:void(0)" onclick="addCart(${index})" class="btn btn-warning rounded shadow-sm"><i class="fas fa-shopping-cart"></i></a>
                </div>
            </div>
            `
        })
        menuList += '</div>'
    
        $('#list-menus').html(menuList)
        $('#list-menus').hide()
        $('#list-menus').fadeIn(100)
        loadCartList()
}

function loadCartList(){
    let cartList = '';
    cartList = `<h3 class="mx-4 mt-3 text-center">Cart</h3>`
    if(cart.items.length === 0){
        cartList += `
            <div class="cart-empty mt-5 m-auto">
                <img src="https://images.thefepi.com/file/empty-cart.png" alt="Cart Empty">
            </div>
        `
    }
    cartList += '<div class="d-flex flex-wrap">'
    cart.items.forEach((menu, index) => {
        cartList += `
        <div class="card-cart d-flex my-2 mx-2 bg-white shadow-sm rounded">
            <div class="cart-img-container">
                <img class="rounded" src="${menu.img}" alt="...">
            </div>
            <div class="detail-cart mx-2">
                <h5 class="m-0 p-0 mb-1">${menu.name}</h5>
                <div class="btn-controll d-flex">
                <a href="javascript:void(0)" onclick="reduceQty(${index})" class="btn-minus d-flex justify-content-around align-items-center"><i class="fas fa-minus"></i></a>
                <div class="btn-show d-flex justify-content-around align-items-center">${menu.qty}</div>
                <a href="javascript:void(0)" onclick="addQty(${index})" class="btn-plus d-flex justify-content-around align-items-center"><i class="fas fa-plus"></i></a>
                </div>
            </div>
            <div class="price-control justify-content-end align-self-end">Rp. ${numeral(menu.total).format('0,0')}</div>
        </div>
        `
    })
    cartList += '</div>'
    if(cart.totalPrice !== 0){
        cartList += '<hr>'
        cartList += `
        <div class="pricing d-flex">
            <div class="col px-2 d-flex justify-content-end"><h5>Total Bayar :</h5></div>
            <div class="col px-3 d-flex justify-content-end"><h5>Rp.${numeral(cart.totalPrice).format('0,0')}</h5></div>
        </div>
        <button type="button" class="btn btn-warning d-block my-2" onclick="toggle()">Checkout</button>
        <button type="button" onclick="emptyCart()" class="btn btn-danger d-block">Empty Cart</button>
      `
    }

    $('#list-cart').html(cartList);
    $('#list-cart').hide();
    $('#list-cart').fadeIn(100);
}

function addCart(index){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const cartItem = menu[index]
    const isCart = cart.items.find(a=>{
        return a.id === cartItem.id
    })
    if(!isCart){
        cart.items.push({
            ...cartItem,
            qty: 1,
            total: cartItem.price
        })
        Toast.fire({
            icon: 'success',
            title: `Yey ${cartItem.name} berhasil ditambahkan &#128525`
        })
        getPrice();
        loadCartList();
    } else {
        cart.items = cart.items.filter(a=>{
            return a.id !== cartItem.id
        })
        getPrice();
        loadCartList();
    }
}

function addQty(a){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const dataQty = cart.items[a]
    const isCart = cart.items.find(a=>{
        return a.id === dataQty.id
    })
    isCart.qty++
    isCart.total = isCart.qty*isCart.price
    Toast.fire({
        icon: 'success',
        title: `Yey ${dataQty.name} menjadi ${isCart.qty} &#128525`
    })
    getPrice();
    loadCartList();
}

function reduceQty(a){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    const dataQty = cart.items[a]
    const isCart = cart.items.find(a=>{
        return a.id === dataQty.id
    })
    if(isCart.qty > 1){
        isCart.qty--
        isCart.total = isCart.qty * isCart.price
        Toast.fire({
            icon: 'success',
            title: `Yach ${dataQty.name} tinggal ${isCart.qty} &#128532`
        })
        getPrice();
        loadCartList();
    } else {
        cart.items = cart.items.filter(a => {
            return a.id !== dataQty.id
        })
        Toast.fire({
            icon: 'success',
            title: `Yach ${dataQty.name} terhapus dari cart &#128532`
        })
        getPrice();
        loadCartList();
    }
}

function getPrice(){
    cart.totalPrice = cart.items.reduce((a, b) => a + b.qty * b.price, 0)
}

function emptyCart(){
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    cart.items = []
    cart.totalPrice = 0
    Toast.fire({
        icon: 'success',
        title: `&#128532 Hmmm.. cart mu kosong`
    })
    loadCartList();
}

function loadSummary(){
    console.log(cart.items)
    let listSum = ''
    cart.items.forEach((menus, index)=>{
        listSum += `
            <div class="row">
                    <div class="col"><div class="total mx-2">${menus.name} ${menus.qty}x</div></div>
                    <div class="col d-flex justify-content-end"><div class="total mx-2">Rp. ${numeral(menus.total).format('0,0')}</div></div>
            </div>
        `
    })

    $('#sumCart').html(listSum);
    $('#sumCart').hide();
    $('#sumCart').fadeIn(100);
}


function loadPricings(){
    let pricings = `
        <div class="col d-flex justify-content-end"><div class="title mx-2">Total Bayar :</div></div>
        <div class="col d-flex justify-content-end"><div class="pricing mx-2">Rp.${numeral(cart.totalPrice).format('0,0')}</div></div>
    `
    $('#pricings').html(pricings);
    $('#pricings').hide();
    $('#pricings').fadeIn(100);
}
// dropdown

function dropDown(){
    document.getElementById('dropDown').classList.toggle('show')
}

window.onclick = (event)=>{
    if (!event.target.matches('.dropbtn')){
        const dropDownMenu = document.getElementsByClassName('dropdown-content')
        for(let i = 0; i < dropDownMenu.length; i++){
            const showDropDown = dropDownMenu[i]
            if(showDropDown.classList.contains('show')){
                showDropDown.classList.remove('show')
            }
        }
    }
}

function toggle(){
    loadSummary()
    loadPricings()
    document.getElementById('blur').classList.toggle('active')
    document.getElementById('modal').classList.toggle('active')
}