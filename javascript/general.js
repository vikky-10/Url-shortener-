var archive = document.getElementById("ar");
var usr = localStorage.getItem("user");
if (usr == "secrate") {
} else {
  archive.href = "Signin.html";
}
