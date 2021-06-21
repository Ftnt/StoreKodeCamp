    const DATABASE = firebase.database();
    const STORAGE = firebase.storage().ref();

        function tableProduct(titulo,precio,categoria,tienda,url,nameImg,id){
            let bodyTable = document.getElementById("tblBodyProduct")
            let tr = document.createElement("tr")
            let thTitulo = document.createElement("td")
            let thPrecio = document.createElement("td")
            let thCategoria = document.createElement("td")
            let thTienda = document.createElement("td")
            let thFoto = document.createElement("td")
            let refFoto = document.createElement("a")
            let imgFoto = document.createElement("img")
            let thRemove = document.createElement("td")
            let btnRemove = document.createElement("button")

            tr.classList.add("text-center","align-middle")
            imgFoto.classList.add("w-25")
            thFoto.classList.add("text-center","w-25")
            btnRemove.classList.add("btn","btn-danger","btn-sm")
            btnRemove.classList.add("btn-delete") 

            tr.appendChild(thTitulo)
            tr.appendChild(thPrecio)
            tr.appendChild(thCategoria)
            tr.appendChild(thTienda)
            tr.appendChild(thFoto)
            thFoto.appendChild(refFoto)
            refFoto.appendChild(imgFoto)
            tr.appendChild(thRemove)
            thRemove.appendChild(btnRemove)


            thTitulo.innerText = titulo
            thPrecio.innerText = precio
            thCategoria.innerText = categoria
            thTienda.innerText = tienda
            btnRemove.innerHTML = "Borrar"

            btnRemove.addEventListener("click", () => {
                DATABASE.ref('productos').child(id).remove();
                document.getElementById("tblBodyProduct").innerHTML = "";
                showAllProduct()
            });
            
            btnRemove.id = id
            imgFoto.src =url
            refFoto.setAttribute("data-lightbox",nameImg) 
            refFoto.setAttribute("data-title",nameImg) 
            refFoto.href = url
            

            bodyTable.appendChild(tr);
        }

        function finalPrice(data1,data2){
                let precio = document.getElementById(data1).value
                let descuento = document.getElementById(data2).value
                let resta = precio-descuento;
                if(resta>0){
                    return resta
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops... Algo salio mal',
                        text: 'El monto no puede ser negativo o ingresaste caracteres invalidos, intenta otra vez, aqui estare...',
                    })
                    return "No válido"
                }
        }

        let precioFinal = document.getElementById("calcular");
        precioFinal.addEventListener("click", () => {
            document.getElementById("precioFinal")
            .value = finalPrice("precio","descuento")
        });
        

        async function  obtenerTodosPrductos(){
            let products = {}
            let registroProducto = await DATABASE.ref('productos').get()
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
            let listOfIds = Object.keys(allProducts);
    
            listOfIds.forEach((id) => {
                let product = allProducts[id];
                STORAGE.child(product.imagen)
                .getDownloadURL()
                .then(function(url) {
                    tableProduct(product.titulo,product.precio,product.categoria,product.tienda,url,product.imagen,id)
                })
            })
        }

        showAllProduct()

        // Obtenemos el la data del formulario de Ingreso del Producto
        function getProductData(productoForm){
                const titulo = productoForm['titulo'].value
                const precio = productoForm['precio'].value
                const descuento = productoForm['descuento'].value
                const categoria = productoForm['categoria'].value
                const tienda = productoForm['tienda'].value
                const descripcion = productoForm['descripcion'].value
                const imagen = productoForm['imgProducto'].files[0]
                return {titulo,precio,descuento,categoria,tienda,descripcion,imagen}
        }

        // Funcion para enviar data a Firebase
        async function addProduct(titulo,precio,descuento,categoria,tienda,descripcion,imagen){
            const metadata = {
                type : imagen.type
            }
            const nameImg = `${Date.now()} - ${imagen.name}`
            await STORAGE.child(nameImg).put(imagen,metadata);

            let registroProducto = await DATABASE.ref('productos').push();
            registroProducto.set({
                titulo : titulo,
                precio : precio,
                descripcion : descripcion,
                fecha_ingreso : Date.now(),
                imagen : nameImg,
                categoria  : categoria,
                tienda : tienda,
                descuento : descuento
            }).then(() => {
                Swal.fire(
                    'Guardado!',
                    'Se guardo correctamente!',
                    'success'),
                document.getElementById("tblBodyProduct").innerHTML = "";
                showAllProduct() 
            })
        }

        let productoForm = document.getElementById("form-producto")
            productoForm.addEventListener("submit",(e) =>{
                e.preventDefault()
                let product = getProductData(productoForm);         
                addProduct(product.titulo,product.precio,product.descuento,product.categoria,product.tienda,product.descripcion,product.imagen)
                document.getElementById("form-producto").reset();
            })

        

        