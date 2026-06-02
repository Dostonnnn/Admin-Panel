const api = "https://fakestoreapi.com/users";
const tbody2 = document.querySelector(".tbody2");
let users = [];
function getUsers(api) {
  fetch(api)
    .then((res) => res.json())
    .then((data) => {
      users = data;
      showUsers(users);
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
getUsers(api);
function showUsers(data) {
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
                    <button onclick="viewUsers(${id})" class="user-view">
                      View
                    </button>
                    <button  class="user-edit">
                      Edit
                    </button>
                    <button  onclick="deleteUsers(${id})" class="user-delete">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
    `;
  });
}

const userForm = document.querySelector(".user-form");
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = userForm["id"].value.trim();
  const username = userForm["username"].value.trim();
  const email = userForm["email"].value.trim();
  const password = userForm["password"].value.trim();

  const userObject = {
    id: id,
    username: username,
    email: email,
    password: password,
  };

  fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
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

const modal2 = document.querySelector(".user-modal");

function openModal2() {
  modal2.classList.remove("back");
}

function closeModal2() {
  modal2.classList.add("back");
}

function viewUsers(id) {
  console.log(id);

  fetch(`https://fakestoreapi.com/users/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const { id, username, email, password } = data;

      modal2.innerHTML = `
        <div class="user-modal-content">
          <span class="user-close-btn">X</span>
          <div class="user-modal-body">
            <span class="user-modal-id">ID: ${id}</span>
            <span class="user-modal-username">Username: ${username}</span>
            <span class="user-modal-email">Email: ${email}</span>
            <span class="user-modal-password">Password: ${password}</span>
          </div>
        </div>
      `;

      openModal2();

      document
        .querySelector(".user-close-btn")
        .addEventListener("click", closeModal2);
    });
}

function deleteUsers(id) {
  fetch(`https://fakestoreapi.com/users/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Deleted user:", data);

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
