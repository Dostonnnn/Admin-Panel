"use strict";
const api = `https://fakestoreapi.com/users`;
const tbody2 = document.querySelector(".tbody2");
const userForm = document.querySelector(".user-form");
const editModal = document.querySelector(".user-edit-modal");
const goBack = document.querySelector(".user-btn-cancel2");
const updateBtn = document.querySelector(".user-btn-update2");
const body = document.querySelector("body");

let users = [];

function getUsers(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      users = data;
      showUsers(users);
    })
    .catch((error) => {
      Toastify({
        text: "Error loading users",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right, #8c092c, #600c0f)",
        },
      }).showToast();

      throw new Error(error);
    });
}

getUsers(api);

function showUsers(data) {
  tbody2.innerHTML = "";

  data.forEach((element) => {
    const { id, username, email, password } = element;

    tbody2.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${username}</td>
        <td>${email}</td>
        <td>${password}</td>
        <td>
          <div class="btns">
            <button onclick="viewUsers(${id})" class="user-view">View</button>
            <button onclick="showEditModal(${id})" class="user-edit">Edit</button>
            <button onclick="deleteUsers(${id})" class="user-delete">Delete</button>
          </div>
        </td>
      </tr>
    `;
  });
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const userObject = {
    id: userForm["id"].value,
    username: userForm["username"].value,
    email: userForm["email"].value,
    password: userForm["password"].value,
  };

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  }).then(() => {
    Toastify({
      text: "User Added",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #4ade80, #4ade80)",
      },
    }).showToast();
  });
});

function viewUsers(id) {
  fetch(`https://fakestoreapi.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { id, username, email, password } = data;

      const modal = document.querySelector(".user-modal");

      modal.innerHTML = `
        <div class="user-modal-content">
          <span class="user-close-btn">X</span>
          <div class="user-modal-body">
            <p class="user-modal-id">ID: ${id}</p>
            <p class="user-modal-username">Username: ${username}</p>
            <p class="user-modal-email">Email: ${email}</p>
            <p class="user-modal-password">Password: ${password}</p>
          </div>
        </div>
      `;

      modal.classList.remove("back");

      document
        .querySelector(".user-close-btn")
        .addEventListener("click", () => {
          modal.classList.add("back");
        });
    });
}

function deleteUsers(id) {
  fetch(`https://fakestoreapi.com/users/${id}`, {
    method: "DELETE",
  }).then(() => {
    Toastify({
      text: "User Deleted",
      duration: 3000,
      style: {
        background: "linear-gradient(to right, #4ade80, #4ade80)",
      },
    }).showToast();
  });
}

function showEditModal(id) {
  editModal.classList.remove("hidden");
  showEditWindow(id);
  body.style.overflow = "hidden";
}

function showEditWindow(id) {
  const form = document.querySelector(".user-edit-form");

  let idValue = form["id2"];
  let usernameValue = form["username2"];
  let emailValue = form["email2"];
  let passwordValue = form["password2"];

  fetch(`https://fakestoreapi.com/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const { id, username, email, password } = data;

      idValue.value = id;
      usernameValue.value = username;
      emailValue.value = email;
      passwordValue.value = password;
    });

  updateBtn.onclick = (e) => {
    e.preventDefault();

    const updatedUser = {
      id: idValue.value,
      username: usernameValue.value,
      email: emailValue.value,
      password: passwordValue.value,
    };

    fetch(`https://fakestoreapi.com/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then(() => {
        closeEditModal();

        Toastify({
          text: "Updated Successfully",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #4ade80, #4ade80)",
          },
        }).showToast();
      });
  };
}

function closeEditModal() {
  editModal.classList.add("hidden");
  body.style.overflow = "auto";
}

goBack.addEventListener("click", (e) => {
  e.preventDefault();
  closeEditModal();
});
