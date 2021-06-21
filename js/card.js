function addNewCard(title,description,price,imgUrl,id,category){
    let mainContainer = document.getElementById("main-container");
    let colums = document.createElement("div")
    let card = document.createElement("div")
    let image = document.createElement("img")
    let buttonMore = document.createElement("div")
    let buttonSpan = document.createElement("span")
    let buttonLink = document.createElement("a")
    let cardBody = document.createElement("div")
    let cardBodyTitle = document.createElement("h5")
    let cardBodyText = document.createElement("span")
    let cardFooter = document.createElement("div")
    let cardFooterPrice = document.createElement("span")
    
    colums.classList.add("col")
    card.classList.add("card","h-100","shadow-sm", "pb-2")
    image.classList.add("w-75","m-auto","card-img-top")
    buttonMore.classList.add("category")
    buttonLink.classList.add("link-secondary","text-white","text-decoration-none")
    cardBody.classList.add("card-body")
    cardBodyTitle.classList.add("card-title")
    cardBodyText.classList.add("d-block","card-text")
    cardFooter.classList.add("card-footer","bg-transparent")
    cardFooterPrice.classList.add("d-block","card-text")
    
    colums.appendChild(card )
    card.appendChild(image)
    card.appendChild(buttonMore)
    buttonMore.appendChild(buttonSpan)
    buttonSpan.appendChild(buttonLink)
    buttonLink.href = `./product_details.html?id=${id}&category=${category}`
    buttonLink.innerText ="+ Detalle"
    card.appendChild(cardBody)
    cardBody.appendChild(cardBodyTitle)
    cardBody.appendChild(cardBodyText)
    card.appendChild(cardFooter)
    cardFooter.appendChild(cardFooterPrice)
    
    cardBodyTitle.innerText = title
    cardFooterPrice.innerText = `Precio: `+price
    cardBodyText.innerText = description
    
    image.src = imgUrl
    
    mainContainer.appendChild(colums)
}