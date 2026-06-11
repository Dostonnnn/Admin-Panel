"use strict";

const userApi = "https://fakestoreapi.com/users";
const tbody = document.querySelector(".card-tbody");

getUsers();

const display = document.querySelector(".display");

function getUsers() {
  fetch(userApi, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      renderUsers(data);
    })
    .catch((err) => {
      Toastify({
        text: "Foydalanuvchilarni yuklashda xatolik",
        duration: 3000,
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

      throw new Error(err);
    });
}

const tbody2 = document.querySelector(".card-tbody2");

function renderUsers(data) {
  tbody.innerHTML = "";

  data.forEach((user) => {
    const { id, username, email, password } = user;

    tbody.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${username}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>
          <div class="btns">
            <button onclick="getCard(${id})" class="user-view">View</button>
          </div>
        </td>
      </tr>
    `;
  });
}

function getCard(id) {
  fetch(`https://fakestoreapi.com/carts/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data) {
        Toastify({
          text: "Bu foydalanuvchida savat topilmadi!",
          duration: 3000,
          gravity: "top",
          position: "right",
          style: {
            background: "linear-gradient(to right, #eab308, #ca8a04)",
          },
        }).showToast();
        return;
      }

      tbody2.innerHTML = "";

      data.products.map((item) => {
        fetch(`https://fakestoreapi.com/products/${item.productId}`)
          .then((res) => res.json())
          .then((product) => {
            tbody2.innerHTML += `
              <tr>
                <td>${data.id}</td>
                <td>${product.description.slice(0, 50)}...</td>
                <td>${data.date}</td>
                <td>
                  <img
                    src="${product.image}"
                    alt="${product.title}"
                    width="60"
                    height="60"
                  />
                </td>
                <td>${item.quantity}</td>
                <td>
                  <div class="btns">
                    <button onclick="closeDisplay()" class="btn-cancel2">
                      Close
                    </button>
                  </div>
                </td>
              </tr>
            `;
          });
      });

      display.classList.remove("hidden");
    });
}

function closeDisplay() {
  display.classList.add("hidden");
}
