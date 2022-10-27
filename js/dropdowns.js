import { recipes } from "../data/recipes.js";
import { buildDropdown } from "./utils.js";

const ingredientsList = document.querySelector(".dropdown-list-ingredients");
const appareilsList = document.querySelector(".dropdown-list-appareil");
const ustensilesList = document.querySelector(".dropdown-list-ustensiles");

// donner des ids aux dropdowns et au clic, ouvrir celui qui correspond à l'id

export const dropDownEventListeners = () => {
  document
    .querySelectorAll(".btn")
    .forEach((e) => e.addEventListener("click", openDropdown));
};
let dropdownForm;
let btn;
let icon;
let list;

const openDropdown = (e) => {
  const target = e.target;
  oneDropdown(target);
  dropdownSelection(target);
  activateDropDown();
};

const oneDropdown = (target) => {
  const activeDropdown = document.querySelector(".dropdown-form-active");
  if (
    activeDropdown &&
    !activeDropdown.classList.contains(`input-${target.classList[3]}`)
  )
    activateDropDown();
};

const dropdownSelection = (target) => {
  if (target.classList.contains("ingredients")) {
    dropdownForm = document.querySelector(".input-ingredients");
    btn = document.querySelector(".btn-ingredients");
    icon = document.querySelector(".i-ingredients");
    list = document.querySelector(".dropdown-list-ingredients");
  } else if (target.classList.contains("appareil")) {
    dropdownForm = document.querySelector(".input-appareil");
    btn = document.querySelector(".btn-appareil");
    icon = document.querySelector(".i-appareil");
    list = document.querySelector(".dropdown-list-appareil");
  } else if (target.classList.contains("ustensiles")) {
    dropdownForm = document.querySelector(".input-ustensiles");
    btn = document.querySelector(".btn-ustensiles");
    icon = document.querySelector(".i-ustensiles");
    list = document.querySelector(".dropdown-list-ustensiles");
  }
};

const activateDropDown = () => {
  if (dropdownForm.classList.contains("dropdown-form-active")) {
    dropdownForm.classList.remove("dropdown-form-active");
    list.classList.remove("dropdown-list-active");
    btn.classList.remove("btn-active");
    icon.style.transform = "rotate(0deg)";
  } else {
    dropdownForm.classList.add("dropdown-form-active");
    list.classList.add("dropdown-list-active");
    btn.classList.add("btn-active");
    icon.style.color = "white";
    icon.style.transform = "rotate(180deg)";
  }
  buildDropdown(recipes, "ingredients", ingredientsList);
  buildDropdown(recipes, "appareils", appareilsList);
  buildDropdown(recipes, "ustensiles", ustensilesList);
};
