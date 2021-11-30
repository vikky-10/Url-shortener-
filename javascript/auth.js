// Registration-----

$("#bt").click(function (e) {
  e.preventDefault();
  var regno = $("#regno").val();
  var pin = $("#pin").val();
  localStorage.setItem("registrationNo", regno);
  localStorage.setItem("password", pin);
  $("#regno").val("");
  $("#pin").val("");
  $(".modal").modal("show");
});

// $("#cls").click(function (e) {
//   $(".modal").modal("hide");
// });

// login----------------------------------------------------------------

$("#login").click(function (e) {
  e.preventDefault();
  var Reg = $("#Regno").val();
  var Pass = $("#Pin").val();

  // localstorage value
  var lcreg = localStorage.getItem("registrationNo");
  var lcpin = localStorage.getItem("password");

  if (Reg === lcreg && Pass === lcpin) {
    // Window.location.replace("Archive.html");
    localStorage.setItem("user", "secrate");

    $(location).attr("href", "Archive.html");
  } else {
    $(".modal").modal("show");
  }
});

// modal close button---------------------------------

$("#cls").click(function () {
  $(".modal").modal("hide");
});

$("#cls1").click(function () {
  $(".modal").modal("hide");
});

$("#cls2").click(function () {
  $(".modal").modal("hide");
});

$("#cls3").click(function () {
  $(".modal").modal("hide");
});

// logout ------------------------
var isuser = localStorage.getItem("user");

// if (isuser) {
// } else {
//   $(location).attr("href", "Singin.html");
// }

$("#logout").click(function () {
  localStorage.setItem("user", "logout");
  $(location).attr("href", "Singin.html");
});
