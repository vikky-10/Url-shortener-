// "use strict";

// firebase

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
// Reference of firestore
var firestore = firebase.firestore();

//Variable to access collection
const db = firestore.collection("fomData");

//Variables
const inputLink = document.querySelector(".user__link");
const inputLabel = document.querySelector(".user__link-label");
const submitButton = document.querySelector(".submit__btn");
const containerOutput = document.querySelector(".link__output-boxes");

class URLShortener {
  #API_URL = "https://api.shrtco.de/v2/shorten?url=";
  #flag = 0;

  constructor() {
    // console.log(this);//URLShortener
    submitButton.addEventListener("click", this.getShortenUrl.bind(this));
    // console.log(this.getShortenUrl.bind(this));
    containerOutput.addEventListener("click", this.copyText.bind(this));
  }

  getShortenUrl(e) {
    e.preventDefault();

    const inputURL = inputLink.value;
    if (inputURL === "") {
      inputLink.classList.add("invalid-input");
      inputLabel.classList.add("invalid-msg");
      this.#flag = 1;
    }

    if (inputURL !== "") {
      if (this.#flag === 1) {
        inputLink.classList.remove("invalid-input");
        inputLabel.classList.remove("invalid-msg");
        this.#flag = 0;
      }

      inputLink.value = "";
      // const shortenURL = this.callAPI(inputLink);
      this.callAPI(inputURL);
      // this.renderOutput(inputLink, shortenURL);
    }
  }

  callAPI(inputURL) {
    const request = fetch(`${this.#API_URL + inputURL}`);
    request
      .then((response) => response.json())
      .then((data) => this.renderOutput(inputURL, data.result.full_short_link));
  }

  renderOutput(inputLink, shortenUrl) {
    const html = `<div class="link__output-box data-box--1">
        <p class="input__link">${inputLink}</p>
        <p class="output__link">${shortenUrl}</p>
        <button class="btn--rect btn data-btn--1 copy-btn">Copy</button>
      </div>`;
    db.doc()
      .set({
        input: inputLink,
        short: shortenUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        console.log("Data saved");
      })
      .catch((error) => {
        console.log(error);
      });

    containerOutput.insertAdjacentHTML("afterbegin", html);
  }

  copyText(e) {
    if (!e.target.classList.contains("copy-btn")) return;

    const text = e.target
      .closest(".link__output-box")
      .querySelector(".output__link").innerText;

    const inputElement = document.createElement("input");
    inputElement.setAttribute("value", text);
    document.body.appendChild(inputElement);
    inputElement.select();
    document.execCommand("copy");
    inputElement.parentNode.removeChild(inputElement);

    e.target.innerHTML = "Copied!";
    e.target.style.backgroundColor = "hsl(257, 27%, 26%)";
  }
}

const app = new URLShortener();
