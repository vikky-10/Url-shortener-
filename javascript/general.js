var archive = document.getElementById("ar");
var usr = localStorage.getItem("user");
if (usr == "secrate") {
} else {
  archive.href = "Signin.html";
}

// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
