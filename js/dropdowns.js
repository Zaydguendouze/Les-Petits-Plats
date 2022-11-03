import { recipes } from "../data/recipes.js";
import {
  displayInputSearch,
  removeDuplicateIngredients,
  uniqueIngredients,
  filterByTags,
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
  buildDropdown(recipes, "ingredients", ingredientsList);
  buildDropdown(recipes, "appareils", appareilsList);
  buildDropdown(recipes, "ustensiles", ustensilesList);
};

export const createTags = (e) => {
  const tags = document.querySelector(".tags");
  const tagList = e.target;
  // console.log("target", e.target);
  const tag = document.createElement("li");
  const newHtml = `${tagList.innerText}<i id = "${tagList.innerText}" class="far fa-times-circle cross"></i>`;
  // console.log("newHtml", newHtml);
  if (tagList.classList.contains("li-ingredients")) {
    tag.classList.add(`tag-ingredient`, "tagCreated");
    tag.setAttribute("data-type", "ingredient");
  } else if (tagList.classList.contains("li-appareils")) {
    tag.classList.add(`tag-appliance`, "tagCreated");
    tag.setAttribute("data-type", "appareils");
  } else if (tagList.classList.contains("li-ustensiles")) {
    tag.classList.add(`tag-ustensils`, "tagCreated");
    tag.setAttribute("data-type", "ustensiles");
  }
  tag.innerHTML = newHtml;
  tags.appendChild(tag);
  removeTags();
  filterByTags();
};

// const addNewTag = ()

const removeTags = () => {
  let tagCross = document.querySelectorAll(".cross");
  let tags = document.querySelectorAll(".tag");
  const recipesList = document.querySelector("main");

  tagCross.forEach((tag) =>
    tag.addEventListener("click", () => tag.parentNode.remove())
  );
  console.log("tags", tags);
};

// const filterByTags = () => {
//   let tags = document.getElementsByClassName("tagCreated");
//   const inputSearch = document.getElementById("search");
//   // console.log(inputSearch);

//   let tagsArray = [];
//   // tagsArray.push(inputSearch.value);

//   for (let i = 0; i < tags.length; i++) {
//     if (tags[i].dataset.type === "ingredient") {
//       tagsArray.push(tags[i].textContent);
//       displayInputSearch(tags[i].textContent.toLowerCase());
//     }
//   }
//   console.log("tagsArray", tagsArray);
//   console.log("inputSearch.value", inputSearch.value);

//   const originalRecipes = recipes.filter((recipe) => {
//     if (
//       recipe.name.toLowerCase().includes(inputSearch.value) ||
//       recipe.description.toLowerCase().includes(inputSearch.value) ||
//       recipe.ingredients.filter((ingredient) =>
//         ingredient.ingredient.toLowerCase().includes(inputSearch.value)
//       )
//     )
//       return recipe;
//     displayRecipes(originalRecipes, recipesList);
//   });
//   console.log(originalRecipes);
//   displayRecipes(originalRecipes, recipesList);
// };

// const filterByTags = () => {
//   let tags = document.getElementsByClassName("tagCreated");
//   const inputSearch = document.getElementById("search");

//   let tagsArray = [];
//   tagsArray.push(inputSearch.value);

//   for (let i = 0; i < tags.length; i++) {
//     if (tags[i].dataset.type === "ingredient") {
//       tagsArray.push(tags[i].textContent);
//       displayInputSearch(tags[i].textContent.toLowerCase());
//     }
//   }
//   console.log(tagsArray);

//   const state = globalRecipesState.filter((element) => {
//     console.log(globalRecipesState);
//     if (
//       element.name.toLowerCase().includes(inputSearch.value) ||
//       element.description.toLowerCase().includes(inputSearch.value) ||
//       element.ingredients.filter(
//         (ingredient) =>
//           ingredient.ingredient.toLowerCase().includes(inputSearch.value)
//             .length >= 1
//       )
//     )
//       return element;
//   });
//   // console.log(element);
//   displayRecipes(state, tagsArray);
// };
