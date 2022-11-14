import { recipes } from "../data/recipes.js";
import {
  displayInputSearch,
  removeDuplicateIngredients,
  filterByTags,
  globalRecipesState,
  filterDropIngredients,
  tagsArrayIngredients,
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
  // let tagCross = document.querySelectorAll(".cross");
  // tagCross.forEach((tag) => tag.addEventListener("click", removeTags));
  filterByTags();
  removeTags();
};

export function removeTags() {
  let tagCross = document.querySelectorAll(".cross");
  let tags = document.getElementsByClassName("tagCreated");
  const recipesList = document.querySelector("main");

  let tagRemove = [];

  let data = [];

  // Stocker les datas après une recherche effectuée ou un tag, ou utiliser les recettes originales
  if (globalRecipesState.length > 0) {
    data = [...globalRecipesState];
  } else {
    data = [...recipes];
  }

  console.log("databeforefilter in remove", data);

  tagCross.forEach((tag) =>
    tag.addEventListener("click", () => {
      tag.parentNode.remove();
      tag.classList.remove("tagCreated");

      for (let i = 0; i < tags.length; i++) {
        if (tags[i].dataset.type === "ingredient") {
          tagsArrayIngredients.push(tags[i].textContent.toLowerCase());
        }
        if (tags[i].dataset.type === "appareils") {
          tagsArrayAppareils.push(tags[i].textContent.toLowerCase());
        }
        if (tags[i].dataset.type === "ustensiles") {
          tagsArrayUstensiles.push(tags[i].textContent.toLowerCase());
        }
      }

      if (tagsArrayIngredients.length > 0) {
        const filtredRecipes = [];

        for (let i = 0; i < data.length; i++) {
          const recipe = data[i]; // tu auras l'objet à l'itération i
          let includeRecipe = false;
          for (let j = 0; j < tagsArrayIngredients.length; j++) {
            for (let k = 0; k < recipe.ingredients.length; k++) {
              if (
                recipe.ingredients[k].ingredient.toLowerCase() ===
                tagsArrayIngredients[j].toLowerCase()
              ) {
                includeRecipe = true;
                break;
              } else includeRecipe = false;
            }

            console.log(filtredRecipes);

            if (
              j === tagsArrayIngredients.length - 1 &&
              includeRecipe === true
            ) {
              filtredRecipes.push(recipe);
            }
          }
        }
        if (filtredRecipes.length > 0) {
          console.log("filtredRecipes", filtredRecipes);
          data = filtredRecipes;
        }
        buildDropdown(
          data,
          "ingredients",
          ingredientsList,
          filterDropIngredients
        );
      }

      console.log("tagsArrayIngredients", tagsArrayIngredients);

      console.log("tagRemove", tagRemove);
      console.log("globalRecipesState to remove", globalRecipesState);
    })
  );
}
