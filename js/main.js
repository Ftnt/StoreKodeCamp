    const DATABASE = firebase.database()
    const STORAGE = firebase.storage().ref();

    async function  obtenerTodosPrductos(){
        let products = {}
        await DATABASE.ref('productos').get()
        .then((snapshot) => {
            if(snapshot.exists()){
                products = snapshot.val();
            }else{
                console.log("Item not found");
            }
        })
        return products
    }
    

    async function showAllProduct() {
        let allProducts = await obtenerTodosPrductos();
        console.log(allProducts)
        let listOfIds = Object.keys(allProducts);

        listOfIds.forEach((id) => {
            let product = allProducts[id];
            console.log(product)
            STORAGE.child(product.imagen).getDownloadURL().then(function(url) {
                addNewCard(product.titulo,product.descripcion,product.precio,url,id,product.categoria)
            })
        })
    }


    showAllProduct()
