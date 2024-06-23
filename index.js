//punya mas Gefri
function render(array) {
  let render = document.getElementById("render");
  render.innerHTML = "";

  for (let x = 0; x < array.length; x++) {
    render.innerHTML += `<div class="card">
          <div class="card h-100">
              <img 
              src="${array[x].image}"/>
              <div class="card-body">
                  <h5 class="card-title">${array[x].namaProduk}</h5>
                  <p class="card-text">${array[x].deskripsiProduk}</p>
              </div>
              <div class="card-footer">
                  <small class="text-body-secondary">Last updated 3 mins ago</small>
              </div>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add To Cart
        </button>
          </div>
      </div>`;
  }
}

render(listBelanjaan);

//js mas revi
let themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

document.addEventListener("DOMContentLoaded", function () {
  var myCarousel = document.getElementById("carouselExampleSlidesOnly");
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 2000,
  });
});

let navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// JS Mba sofia
//click kartu untuk click btn
const mainImg = document.getElementById("main-img");
const smallImg = document.getElementsByClassName("small-img");
const description = document.getElementById("description");
const cards = document.querySelectorAll(".card");
const descName = document.getElementById("product-name");
const descProduct = document.querySelector(".desc-details p");
const harga = document.querySelector("#price");

// pake forEach
cards.forEach((card) => {
  const cardBtn = card.querySelector(".btn");
  const cardTitle = card.querySelector(".card-title");

  //dom selector untuk btn di dlm class card
  card.addEventListener("click", () => {
    cardBtn.click();
    descName.innerText = cardTitle.innerText;
    //ganti gambar dan desc sesuai dengan yg di klik
    for (let i = 0; i < listBelanjaan.length; i++) {
      let {
        namaProduk,
        details,
        image,
        image1,
        image2,
        image3,
        image4,
        hargaProduk,
      } = listBelanjaan[i];
      if (namaProduk === cardTitle.innerText) {
        mainImg.src = image;
        smallImg[0].src = image1;
        smallImg[1].src = image2;
        smallImg[2].src = image3;
        smallImg[3].src = image4;
        descProduct.innerText = details;
        harga.innerText = `Rp. ${hargaProduk}`;
        break;
      }
    }
  });
});

//gonta ganti gambar
for (let i = 0; i < 4; i++) {
  smallImg[i].addEventListener("click", () => {
    mainImg.src = smallImg[i].src;
  });
}

// nambah belanjaan
const addButton = document.querySelector(".add-to-cart");
const cart = document.querySelector("#table-cart");
const sumPrice = document.querySelector(".sum-price");
const sumAll = document.querySelector(".sum-checkout");
//hitung total belanjaan
let totalBelanja = 0;

addButton.addEventListener("click", () => {
  // bikin row baru
  const newCartRow = document.createElement("tr");
  newCartRow.classList.add("items");
  cart.appendChild(newCartRow);

  const xMark = `<i class="fa-regular fa-circle-xmark"></i>`;
  const mainImgSrc = mainImg.src;

  const newImg = document.createElement("img");
  const productName = document.querySelector("#product-name").innerText;
  const priceString = document.querySelector("#price").innerText;
  let price = "";

  for (let i = 4; i < priceString.length; i++) {
    if (priceString[i] === ".") {
      continue;
    } else if (priceString[i] === ",") {
      break;
    } else {
      price += priceString[i];
    }
  }

  let numPrice = Number(price);
  const quantity = document.querySelector("#qty").value;
  let totalPrice = numPrice * quantity;

  const subTotal = `Rp. ${totalPrice},00`;
  totalBelanja += numPrice * quantity;

  let totalCheckOut = `Rp. ${totalBelanja},00`;
  sumPrice.innerText = totalCheckOut;
  sumAll.innerText = totalCheckOut;

  const array = [
    xMark,
    mainImgSrc,
    productName,
    priceString,
    quantity,
    subTotal,
  ];

  for (let i = 0; i < 6; i++) {
    const newItems = document.createElement("td");
    newCartRow.appendChild(newItems);

    if (i === 0) {
      newItems.classList.add("remove");
      newItems.addEventListener("click", () => {
        //kurangi total belanjaan
        totalBelanja -= numPrice * quantity;
        let totalCheckOut2 = `Rp. ${totalBelanja},00`;
        sumPrice.innerText = totalCheckOut2;
        sumAll.innerText = totalCheckOut2;
        newCartRow.remove();

        if (totalBelanja === 0) {
          sumPrice.innerText = "-";
          sumAll.innerText = "-";
        }
      });
    }

    if (i === 1) {
      const imageItem = document.createElement("img");
      imageItem.src = array[1];
      newItems.appendChild(imageItem);
    } else {
      newItems.innerHTML = array[i];
    }
  }
});

// JS Mba sofia END
//
function search() {
  let buttonSubmit = document.getElementById("searchText").value;
  console.log(buttonSubmit);

  let newArray = [];

  for (let x = 0; x < listBelanjaan.length; x++) {
    let name = listBelanjaan[x].namaProduk;

    if (name.toLowerCase().includes(buttonSubmit.toLowerCase())) {
      newArray.push(listBelanjaan[x]);
    }
  }

  render(newArray);
}

function reset() {
  render(listBelanjaan);
}
