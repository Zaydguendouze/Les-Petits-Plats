import { recipes } from "../data/recipes.js";
import {
  displayInputSearch,
  removeDuplicateIngredients,
  filterByTags,
  globalRecipesState,
} from "./index.js";
import { buildDropdown, displayRecipes, filterRecipes } from "./utils.js";

const ingredientsList = document.querySelector(".dropdown-list-ingredients");
const appareilsList = document.querySelector(".dropdown-list-appareil");
const ustensilesList = document.querySelector(".dropdown-list-ustensiles");

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
  let data = [];

  if (globalRecipesState.length > 0) {
    data = [...globalRecipesState];
  } else {
    data = [...recipes];
  }

  buildDropdown(data, "ingredients", ingredientsList);
  buildDropdown(data, "appareils", appareilsList);
  buildDropdown(data, "ustensiles", ustensilesList);
};

export const createTag = (e) => {
  const tags = document.querySelector(".tags");
  const tagList = e.target;
  const newLi = document.createElement("li");
  const newTag = `${tagList.innerText}<i id = "${tagList.innerText}" class="far fa-times-circle cross"></i>`;
  if (tagList.classList.contains("li-ingredients")) {
    newLi.classList.add(`tag-ingredient`, "tagCreated");
    newLi.setAttribute("data-type", "ingredient");
  } else if (tagList.classList.contains("li-appareils")) {
    newLi.classList.add(`tag-appliance`, "tagCreated");
    newLi.setAttribute("data-type", "appareils");
  } else if (tagList.classList.contains("li-ustensiles")) {
    newLi.classList.add(`tag-ustensils`, "tagCreated");
    newLi.setAttribute("data-type", "ustensiles");
  }
  newLi.innerHTML = newTag;
  tags.appendChild(newLi);
  newLi.addEventListener("click", removeTag);
  filterByTags();
  const liToRemove = document.querySelector(
    `.dropdown-list li[id='${e.target.id}']`
  );
  liToRemove.remove();
};

export const removeTag = (e) => {
  const searchBarValue = document.getElementById("search").value;
  const tag = e.target.parentNode;
  tag.remove();
  const recipesFilteredByTags = filterByTags("resetRecipesState");
  const filteredRecipesByTagsAndSearchbar = filterRecipes(
    searchBarValue,
    recipesFilteredByTags
  );

  const recipesList = document.querySelector("main");
  displayRecipes(filteredRecipesByTagsAndSearchbar, recipesList);
};
