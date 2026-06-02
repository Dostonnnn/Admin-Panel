"use strict";

const api = `https://fakestoreapi.com/products`;
const tbody = document.querySelector("tbody");
let products;

function getProduct(url) {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      products = data;
      showProducts(products);
    })
    .catch((error) => {
      Toastify({
        text: "Invalid username or password",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #8c092c, #600c0f)",
        },
        onClick: function () {},
      }).showToast();

      throw new Error(error);
    });
}

getProduct(api);

function showProducts(data) {
  data.forEach((element) => {
    const { description, title, category, id, image, price } = element;

    tbody.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>
          <img
            src="${image}"
            alt="${description}"
            class="table-img"
          />
        </td>
        <td>${title}</td>
        <td>${category}</td>
        <td class="table-price">${price}</td>
        <td>
          <div class="btns">
            <button onclick="viewProduct(${id})" class="btn-view">
              View
            </button>
            <button onclick="showEditModal(${id})" class="btn-edit">
              Edit
            </button>
            <button onclick="deleteProduct(${id})" class="btn-delete">
              Delete
            </button>
          </div>
        </td>
      </tr>
    `;
  });
}

const form = document.querySelector(".search-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const image = form["image"].value.trim();
  const title = form["title"].value.trim();
  const price = form["price"].value.trim();
  const category = form["category"].value.trim();
  const description = form["description"].value.trim();

  const product = {
    image: image,
    title: title,
    price: price,
    category: category,
    description: description,
  };

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((res) => res.json())
    .then((data) => {
      Toastify({
        text: "Added Successfully",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #4ade80, #4ade80)",
        },
        onClick: function () {},
      }).showToast();

      console.log(data);
    });
});

const modal = document.querySelector(".modal");

function openModal() {
  modal.classList.remove("back");
}

function closeModal() {
  modal.classList.add("back");
}

function viewProduct(id) {
  console.log(id);

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const { description, title, category, image, price, id } = data;

      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-btn">X</span>

          <div class="modal-body">
            <img src="${image}" alt="${description}" />
            <span class="modal-id">${id}</span>
            <p class="modal-title">${title}</p>
            <p class="modal-des">${description}</p>
            <p class="modal-cat">${category}</p>
            <p class="modal-price">${price}</p>
          </div>
        </div>
      `;

      openModal();

      document
        .querySelector(".close-btn")
        .addEventListener("click", closeModal);
    });
}

function deleteProduct(id) {
  fetch(`https://fakestoreapi.com/products/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Deleted product:", data);

      Toastify({
        text: "Deleted Successfully",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #4ade80, #4ade80)",
        },
        onClick: function () {},
      }).showToast();
    })
    .catch((err) => console.log(err));
}

const editModal = document.querySelector(".edit-modal");
const goBack = document.querySelector(".btn-cancel2");
const body = document.querySelector("body");
const updateBtn = document.querySelector(".btn-update");

function showEditWindow(id) {
  const editForm = document.querySelector(".edit-form");

  let imageValue = editForm["image2"];
  let titleValue = editForm["title2"];
  let priceValue = editForm["price2"];
  let categoryValue = editForm["category2"];
  let descriptionValue = editForm["description2"];

  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { description, title, category, image, price } = data;

      imageValue.value = image;
      descriptionValue.value = description;
      titleValue.value = title;
      categoryValue.value = category;
      priceValue.value = price;
    });

  updateBtn.onclick = (e) => {
    e.preventDefault();

    const productObject = {
      image: imageValue.value,
      title: titleValue.value,
      description: descriptionValue.value,
      category: categoryValue.value,
      price: priceValue.value,
    };

    fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productObject),
    })
      .then((res) => res.json())
      .then((data) => {
        closeEditModal();
        console.log(data);
        Toastify({
          text: "Updated Successfully",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #4ade80, #4ade80)",
          },
          onClick: function () {},
        }).showToast();
      });
  };
}

function showEditModal(id) {
  editModal.classList.remove("hidden");
  showEditWindow(id);
  body.style.overflow = "hidden";
}

function closeEditModal() {
  editModal.classList.add("hidden");
  body.style.overflow = "auto";
}

goBack.addEventListener("click", (e) => {
  e.preventDefault();
  closeEditModal();
});
const jewelry = document.querySelector(".jewelry");
const men = document.querySelector(".men");
const women = document.querySelector(".women");
const elect = document.querySelector(".electronic");

function showMen() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const menProducts = data.filter(
        (item) => item.category === "men's clothing",
      );
      tbody.innerHTML = "";
      showProducts(menProducts);
      console.log(menProducts);
    });
}
men.addEventListener("click", (e) => {
  e.preventDefault();
  showMen();
});

function showWomen() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const womenProducts = data.filter(
        (item) => item.category === "women's clothing",
      );
      tbody.innerHTML = "";
      showProducts(womenProducts);
      console.log(womenProducts);
    });
}
women.addEventListener("click", (e) => {
  e.preventDefault();
  showWomen();
});

function showJewelry() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const jewelryProducts = data.filter(
        (item) => item.category === "jewelery",
      );
      tbody.innerHTML = "";
      showProducts(jewelryProducts);
      console.log(jewelryProducts);
    });
}
jewelry.addEventListener("click", (e) => {
  e.preventDefault();
  showJewelry();
});

function showElect() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const ElectProducts = data.filter(
        (item) => item.category === "electronics",
      );
      tbody.innerHTML = "";
      showProducts(ElectProducts);
      console.log(ElectProducts);
    });
}
elect.addEventListener("click", (e) => {
  e.preventDefault();
  showElect();
});
