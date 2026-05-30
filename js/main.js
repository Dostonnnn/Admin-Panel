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
    tbody.innerHTML += `<tr>
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
                    <button  onclick="viewProduct(${id})" class="btn-view">View</button>
                    <button class="btn-edit">Edit</button>
                    <button onclick="deleteProduct(${id})" class="btn-delete">Delete</button>
                  </div>
                </td>
              </tr>`;
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
    headers: { "Content-Type": "application/json" },
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

function deleteProduct(id) {
  console.log(id);
}
const modal = document.querySelector(".modal");
function openModal() {
  modal.classList.remove("back");
}

function closeModal() {
  modal.classList.add("back");
}

function viewProduct(id) {
  console.log("ishladi", id);
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
