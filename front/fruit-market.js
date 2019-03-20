console.log('loaded')
fetch('/getfruits').then(res=>{
  return res.json()
}).then(data =>{
  console.log(data)
  data.forEach(fruit=>{
    displayFruit(fruit)
  })
})

const displayFruit = (fruit) =>{
  let fruitDiv = document.createElement('div')
  let fruitPic = document.createElement('img')
  let fruitName = document.createElement('p')
  let fruitPrice = document.createElement('span')
  let fruitQuantity = document.createElement('input')
  let fruitButton = document.createElement('button')
  fruitPic.src = 'fruitetlegumes.jpg'
  fruitPic.alt = fruitName.innerText = fruit.fruit
  fruitPrice.innerText = ' '+fruit.prix + '€'
  fruitQuantity.type = 'number'
  fruitQuantity.value = 1
  fruitButton.innerText = 'ajouter au panier'
  fruitName.appendChild(fruitPrice)
  fruitDiv.appendChild(fruitPic)
  fruitDiv.appendChild(fruitName)
  fruitDiv.appendChild(fruitQuantity)
  fruitDiv.appendChild(fruitButton)
  if(fruit.promo){
    let infoPromo = document.createElement('p')
    infoPromo.innerText = fruit.promo
    fruitDiv.appendChild(infoPromo)
    let promo = fruit.promo.split(' pour ')
    .map(i=>{
      return parseInt(i)
    })
    fruitDiv.dataset.promo = promo
  }
  fruitDiv.dataset.prix = fruit.prix
  fruitDiv.dataset.fruit = fruit.fruit
  fruitDiv.classList.add('fruit')
  document.querySelector('.market-place').appendChild(fruitDiv)
  fruitButton.addEventListener('click', e=>{
    ajouteAuPanier(fruitDiv)
  })
}

const ajouteAuPanier = (fruitBox)=>{
  let total = document.querySelector('.total span')
  let fruitLine = document.createElement('li');
  let fruitDetails = document.createElement('p');
  let fruitQuantity = fruitBox.querySelector('input').value
  
  if(fruitBox.dataset.promo !== undefined){
    console.log(fruitBox.dataset.promo)
    let promoRatio = fruitBox.dataset.promo.split(',')
    let ratio, preRatio
    if(fruitQuantity%promoRatio[0] === 0){
      ratio = fruitQuantity/promoRatio[0]
      console.log(ratio)
    }else{
      preRatio = fruitQuantity%promoRatio[0]
      ratio = (fruitQuantity - preRatio)/promoRatio[0]
    }
    fruitDetails.innerText = `x${fruitQuantity} ${fruitBox.dataset.fruit}${fruitQuantity > 1 ? 's' : ''}, ${((fruitQuantity-ratio)*fruitBox.dataset.prix).toFixed(2)}€ supprimer`
    fruitDetails.dataset.sousTotal = ((fruitQuantity-ratio)*fruitBox.dataset.prix).toFixed(2) 
  }else{
    fruitDetails.innerText = `x${fruitQuantity} ${fruitBox.dataset.fruit}${fruitQuantity > 1 ? 's' : ''}, ${(fruitQuantity*fruitBox.dataset.prix).toFixed(2)}€ supprimer`
    fruitDetails.dataset.sousTotal = (fruitQuantity*fruitBox.dataset.prix).toFixed(2)
  }
  fruitLine.appendChild(fruitDetails)
  document.querySelector('.dans-le-panier').appendChild(fruitLine)
  total.innerText = `${(parseFloat(total.innerText) + parseFloat(fruitDetails.dataset.sousTotal)).toFixed(2)} €` 
  fruitDetails.addEventListener('click', ()=>{
    enleveDuPanier(fruitLine)
  })
}

const enleveDuPanier = (element)=>{
  let prixDeLaSelection = element.querySelector('p').dataset.sousTotal
  let total = document.querySelector('.total span')
  total.innerText = `${(parseFloat(total.innerText) - parseFloat(prixDeLaSelection)).toFixed(2)} €` 
  element.remove()
}