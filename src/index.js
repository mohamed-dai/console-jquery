import "./styles.css";
import getData from "./Data";

window.addEventListener("keydown", handleKeyDown);

const Data = getData();
let options = [],
  allOptions = [],
  input,
  query,
  info,
  field,
  value;

document.getElementById("app").innerHTML = `
    <div id="container">
      />
      <a id="Query" href="#"></a>
      <span id="Input"></span>
      <span id="Pipe">|</span>
      <span id="Options"></span>
    </div>
`;

function keySwitcher(key) {
  acceptKey(key);
  switch (key) {
    case "@":
      showListInfos();
      break;
    case "?":
      showListFields();
      break;
    case "=":
      showListValues();
      break;
    case "Backspace":
      doBackspace();
      break;
    case "Delete":
      doDelete();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "Enter":
      acceptItem();
      break;
    // case " ":
    // break;
    // default:
    //   filterOptions();
  }
}

function handleKeyDown(event) {
  // console.log("A key was pressed: ", event.key);
  keySwitcher(event.key);
}

function showListInfos() {
  const items = getListInfos();
  // console.log("showListInfos", items);
  options = items;
  updateOptionsUI(options);
  allOptions = items;
}

function getListInfos() {
  // console.log("Data", Data);
  return Object.keys(Data);
}

function showListFields() {
  const items = getListFields(info);
  options = items;
  updateOptionsUI(options);
  allOptions = items;
}

function getListFields(info) {
  //   console.log("getListFields", info);
  return Object.keys(Data[info]);
}

function showListValues() {
  const items = getListValues(info, field);
  options = items;
  updateOptionsUI(options);
  allOptions = items;
}
function getListValues(info, field) {
  console.log("info", info);
  return Object.keys(Data[info][field]);
}

function doBackspace() {
  const newInput = input.substring(0, input.length - 1);
  filterOptions(newInput);
  input = newInput;
  updateInputUI(input);
}

function doDelete() {}

function moveLeft() {}

function moveRight() {}

function acceptItem() {
  let currentInput = input;
  input = "";
  updateInputUI(input);

  query = query != undefined ? query + " " + currentInput : currentInput;
  updateQueryUI(query);
  options = [];

  updateOptionsUI(options);
  allOptions = [];
  if (currentInput.startsWith("@")) {
    info = currentInput.substring(1);
  } else if (currentInput.startsWith("?")) {
    field = currentInput.substring(1);
  } else if (currentInput.startsWith("=")) {
    value = currentInput.substring(1);
  }
}

function acceptKey(key) {
  if (key.length == 1) {
    const newInput = input != undefined ? input + key : key;
    const regexp = /^[a-z0-9]+$/i;
    const match = key.match(regexp);
    if (match != null) {
      filterOptions(newInput);
    }
    input = newInput;
    updateInputUI(input);
  }
}

function filterOptions(input) {
  options = allOptions.filter(function (option) {
    return (
      option.startsWith(input.substring(1)) && option != input.substring(1)
    );
  });
  updateOptionsUI(options);
}

function updateInputUI(content) {
  document.getElementById("Input").textContent = content;
}

function updateOptionsUI(items) {
  const elm = document.getElementById("Options");
  elm.replaceChildren();

  items.forEach((option) => {
    const btn = document.createElement("button");
    btn.appendChild(document.createTextNode(option));
    elm.appendChild(btn);
  });
}

function updateQueryUI(content) {
  document.getElementById("Query").textContent = content;
}
