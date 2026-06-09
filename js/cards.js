"use strict";

const api = "https://fakestoreapi.com/carts";
const userApi = "https://fakestoreapi.com/users";

const tbody = document.querySelector(".card-tbody");
const tbody2 = document.querySelector(".card-tbody2");
const addForm = document.querySelectorAll(".card-form")[0];

let editId;

getUsers();
const editForm = document.querySelectorAll(".card-form")[1];
const display = document.querySelector(".display");
const modal = document.querySelector(".card-modal");
const editModal = document.querySelector(".card-edit");
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
            <button onclick="editCard(${id})" class="user-edit">Edit</button>
            <button onclick="deleteCard(${id})" class="user-delete">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });
}

function getCard(id) {
  fetch(`${api}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      tbody2.innerHTML = "";

      data.products.forEach((p) => {
        tbody2.innerHTML += `
          <tr>
            <td>${data.id}</td>
            <td>${data.userId}</td>
            <td>${data.date}</td>
            <td>${p.productId}</td>
            <td>${p.quantity}</td>
            <td>
              <div class="btns">
                <button onclick="editCard(${data.id})" class="btn-edit">Edit</button>
                <button onclick="deleteCard(${data.id})" class="btn-delete">Delete</button>
                <button onclick="closeDisplay()" class="btn-cancel2">Close</button>
              </div>
            </td>
          </tr>
        `;
      });

      display.classList.remove("hidden");
    });
}

modal.innerHTML = `
  <span class="card-can">X</span>
`;

function editCard(id) {
  editId = id;

  fetch(`${api}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      document.querySelector("[name='userId2']").value = data.userId;
      document.querySelector("[name='date2']").value = data.date.split("T")[0];
      document.querySelector("[name='productId2']").value =
        data.products[0].productId;
      document.querySelector("[name='quantity2']").value =
        data.products[0].quantity;
      modal.classList.remove("hidden");
      editModal.classList.remove("hidden");
    });
}

function deleteCard(id) {
  fetch(`${api}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Deleted:", data);

      Toastify({
        text: "Deleted Successfully",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #ef4444, #ef4444)",
        },
        onClick: function () {},
      }).showToast();
    })
    .catch((err) => console.log(err));
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = addForm["userId"].value;
  const date = addForm["date"].value;
  const productId = addForm["productId"].value;
  const quantity = addForm["quantity"].value;

  const cartObject = {
    userId: Number(userId),
    date: date,
    products: [
      {
        productId: Number(productId),
        quantity: Number(quantity),
      },
    ],
  };

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartObject),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Added:", data);

      Toastify({
        text: "Added Successfully",
        duration: 3000,
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

      addForm.reset();
    });
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userId = editForm["userId2"].value;
  const date = editForm["date2"].value;
  const productId = editForm["productId2"].value;
  const quantity = editForm["quantity2"].value;

  const cartObject = {
    userId: Number(userId),
    date: date,
    products: [
      {
        productId: Number(productId),
        quantity: Number(quantity),
      },
    ],
  };

  fetch(`${api}/${editId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartObject),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Updated:", data);

      Toastify({
        text: "Updated Successfully",
        duration: 3000,
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

      closeEditModal();
    });
});

function closeEditModal() {
  modal.classList.add("hidden");
  editModal.classList.add("hidden");
}

function closeDisplay() {
  display.classList.add("hidden");
}

document.querySelector(".card-can").addEventListener("click", (e) => {
  e.preventDefault();
  closeEditModal();
});

document.querySelector(".card-cancel").addEventListener("click", (e) => {
  e.preventDefault();
  closeDisplay();
});
