const API = "https://fakestoreapi.com/auth/login";
const form = document.querySelector(".form");
const submit = document.querySelector(".submit");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.querySelector(".username").value.trim();
  const parol = document.querySelector(".password").value.trim();
  if (!username || !parol) {
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
  } else {
    const userInfo = { username: username, password: parol };
    fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.token) {
          const { token } = data;
          localStorage.setItem("token", token);
          window.location.href = "../main.html";
        }
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
});
