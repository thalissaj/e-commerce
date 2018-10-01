page('/', index);
page('/garrafas', getGarrafas);
page('/barracas', getBarracas);
page('/bussolas', getBussolas);
page('/lanternas', getLanternas);
page('/facas', getFacas);
page('/:category/:id', product);
page('/carrinho', showCard);
page();

function index () {
  $(".category").removeClass("on-category");
  $("#index").html(renderIndex());
  $("#numberBay").html(getNumberCard());
}
async function getGarrafas() {
  let bottle = "MLB12524";
  $(".category").removeClass("on-category");
  $(".garrafas").addClass("on-category");
  await getProducts(bottle);
}
async function getBarracas() {
 let barracks = "MLB3894";
 $(".category").removeClass("on-category");
 $(".barracas").addClass("on-category");
 await getProducts(barracks);
}
async function getBussolas() {
  let compasses = "MLB9904";
  $(".category").removeClass("on-category");
  $(".bussolas").addClass("on-category");
  await getProducts(compasses);
}
async function getLanternas() {
 let lanterns = "MLB6793";
 $(".category").removeClass("on-category");
 $(".lanternas").addClass("on-category");
 await getProducts(lanterns);
}
async function getFacas() {
 let knives = "MLB199187";
 $(".category").removeClass("on-category");
 $(".facas").addClass("on-category");
 await getProducts(knives);
}
function product(cxt) {
  let clicked = cxt.params.id;
  let category = cxt.params.category;
  showProduct(clicked, category);
}
function showCard() {
  $(".category").removeClass("on-category");
  rendPageCard();
}
