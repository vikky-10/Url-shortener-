const firebaseConfig = {
  apiKey: "AIzaSyDHqK9m0MoDC8QcmN-3mke4YBS6ox3rWRo",
  authDomain: "archive-a7db1.firebaseapp.com",
  projectId: "archive-a7db1",
  storageBucket: "archive-a7db1.appspot.com",
  messagingSenderId: "616853566144",
  appId: "1:616853566144:web:c46acf9adc0d63689cb325",
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("fomData");
var arr = [];

function getAllData() {
  db.get().then((querySnapshot) => {
    var arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
      console.log(doc.id);
    });
    console.log(arr);
    AddAllItemTheTable(arr);
  });
}
function getAllData() {
  db.onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const config = { ...doc.data() };
      config["id"] = doc.id;
      arr.push(config);
    });
    // console.log(arr);

    AddAllItemTheTable(arr);
  });
}

var stdNo = 0;
var tbody = document.getElementById("tbody1");
function AddItemtoTable(input, short, id) {
  var trow = document.createElement("tr");
  trow.setAttribute("data-id", id);
  // console.log(id);
  var td1 = document.createElement("td");
  var td2 = document.createElement("td");
  var td3 = document.createElement("td");
  var td4 = document.createElement("div");
  td1.innerHTML = ++stdNo;
  td2.innerHTML = input;
  td3.innerHTML = short;
  td4.innerHTML = "❌";
  td4.style.cursor = "pointer";

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);

  tbody.appendChild(trow);
  td4.addEventListener("click", (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    // console.log(id);
    db.doc(id).delete();
  });
}

function AddAllItemTheTable(doclist) {
  stdNo = 0;
  tbody.innerHTML = " ";
  doclist.forEach((element) => {
    AddItemtoTable(element.input, element.short, element.id);
    // console.log(element.createdAt.nanoseconds);
  });
}

window.onload = getAllData;

// search functionality
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = arr.filter((character) => {
    return (
      character.input.toLowerCase().includes(searchString) ||
      character.short.toLowerCase().includes(searchString)
    );
  });
  // displayCharacters(filteredCharacters);
  // console.log(filteredCharacters);
  AddAllItemTheTable(filteredCharacters);
});
