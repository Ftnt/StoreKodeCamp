const DATABASES = firebase.database()
const STORAGE = firebase.storage().ref();

const params = new URLSearchParams(window.location.search)

const productId =  params.get("id")
const productCategory =  params.get("category")


async function retreveProduct(id){
    let product = {}

    await DATABASES.ref('productos').child(id).get().then((result)=> {
        if(result.exists()){
            products = result.val();
        }else{
            console.log(`Product ${id} not found`);
        }
    })
    return products;
}

async function retreveProductCategory(categoria){
    await DATABASES.ref('productos')
    .orderByChild("categoria")
    .equalTo(categoria)
    .on('value', function(snapshot) { 
        let productos =snapshot.val()
        console.log(productos)
        let listOfIds = Object.keys(productos);
        listOfIds.forEach((id) => {
            let product = productos[id];
            STORAGE.child(product.imagen).getDownloadURL().then(function(url) {
                addNewCard(product.titulo,product.descripcion,product.precio,url,id,product.categoria)
            })
        })
    })
}

retreveProductCategory(productCategory)

async function showProduct(){
    let productImage = document.getElementById("imageProduct")
    let categoriaProduct = document.getElementById("categoriaProduct")
    let titleProduct = document.getElementById("titleProduct")
    let priceProduct = document.getElementById("priceProduct")
    let descriptionProduct = document.getElementById("descriptionProduct")

    let productData = await retreveProduct(productId)

    STORAGE.child(productData.imagen).getDownloadURL().then(function(url) {
            productImage.src = url
    })
    categoriaProduct.innerText = productData.categoria
    titleProduct.innerText = productData.titulo
    priceProduct.innerText = `S/.${productData.precio}`
    descriptionProduct.innerText = productData.descripcion

    

}

showProduct()
