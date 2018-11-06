//Mudanças no sites
//Requerir da api atraves do id, para ter imagens melhores do produto
//solicitar quantidade de produtos no Carrinho
//alerta que o produto foi adicionado ao carrinho, opção de ir ao carrinho.
//remover produtos do carrinho
//carrousel das imagens do produto
// não esta reponsivo, acrescente o humburguinho, faça o footer mudar de posição;

function getProducts(category) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${category}`;

  $.ajax({
    type: "GET",
    url,
    success: runPosts,
    error: erro,
    crossDomain: true
  })
}

function erro() {
  throw new Error('FAIL!');
}

function renderIndex() {
  return `<div class="index-container" style="background-image: url(./dist/img/happy_camel.jpg);">
            <div class="information">
              <p>Olá forasteir@!</p>
              <p>Com a ajuda de nossos itens você provavelmente sobreviverá ao deserto!</p>
              <p>Navegue pelas categorias:</p>
              <a type="button" href="/garrafas" class="button-page">Garrafas</a>
              <a type="button" href="/barracas" class="button-page">Barracas</a>
              <a type="button" href="/bussolas" class="button-page">Bússolas</a>
              <a type="button" href="/lanternas" class="button-page">Lanternas</a>
              <a type="button" href="/facas" class="button-page">Facas</a>
            </div>
        </div>`
}
var products = [];
function runPosts(data) {
  products = data.results;
  let category = data.filters[0].values[0].id;
  $("#index").empty();
  $("#index").html(
    `      <div class="list-backgound">
            <div class="list-container">
            ${products.map( product =>
              `<div id="${product.id}" data-category="product" class="product-container">
                <h3>${product.title}</h3>
                <img src="${product.thumbnail}">
                <p>R$${product.price}</p>
                <a type="button" href="/${category}/${product.id}" class="button-page">Ver Produto</a>
              </div>`
            ).join('')}
            </div>
          </div>`
  )
}
var singleProduct = [];
function showProduct (idClicked, category) {
  singleProduct = products.filter( (product) => {
    return product.id == idClicked;
  })
  renderProduct(singleProduct[0]);
}
function renderProduct(infoProduct) {
  $(".category").removeClass("on-category");
  $("#index").empty();
  $("#index").html(
    `      <div class="single-container">
            <div class="single-img">
              <img src="${infoProduct.thumbnail}">
            </div>
            <div class="single-inf">
              <h3>${infoProduct.title}</h3>
              <p>R$${infoProduct.price}</p>
              <a onclick="addCard()" class="button-page">Adicionar ao carrinho</a>
            </div>
          </div>`
  )
}
function addCard() {
  let productObj = {
    "title": singleProduct[0].title,
    "price": singleProduct[0].price,
    "img": singleProduct[0].thumbnail
  }
  let cardArray = [];
  if(localStorage.getItem('products') !== null){
    cardArray = localStorage.getItem('products');
    cardArray = JSON.parse(cardArray);
    cardArray.push(productObj);
    localStorage.setItem('products', JSON.stringify(cardArray));
  }
  else{
    cardArray.push(productObj);
    localStorage.setItem('products', JSON.stringify(cardArray));
  }
  let numberItens = cardArray.length;
  $("#numberBay").html(`${numberItens}`)
}
function getNumberCard() {
  if(localStorage.getItem('products') !== null){
    cardArray = localStorage.getItem('products');
    cardArray = JSON.parse(cardArray);
    return cardArray.length;
  } else {
    return "0";
  }
}
function rendPageCard() {
  $("#index").empty();
  if(localStorage.getItem('products') !== null){
    let cardArray = localStorage.getItem('products');
    cardArray = JSON.parse(cardArray);
    $("#index").html(
        `<div class="card-backgound">
            <div class="card-container">
              <p>Carrinho</p>
              ${cardArray.map( itens =>
                `<div class="item-container">
                  <img src="${itens.img}">
                  <p>${itens.title}</p>
                  <p>R$${itens.price}</p>
                </div>`
              ).join('')}
              <div class="card-valor">
                <p>Valor Total: R$ </p>
                <p>${cardTotal(cardArray)}</p>
              </div>
              <a class="button-page" style="margin-bottom: 10px;">Fechar Pedido</a>
            </div>
          </div>`
    );
  } else {
    $("#main").html(
      `<div class="card-backgound">
          <div class="card-container">
            <div class="item-container">
              <p>Não há nada no carrinho!</p>
            </div>
          </div>
        </div>`
    )
  }
}
function cardTotal(cardArray){
  if(cardArray == null){
    return 0;
  }else{
    let total = 0;
    cardArray.forEach( prices => {
      total += prices.price;
    })
    return total.toFixed(2);
  }
}
