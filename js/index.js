import { recipes } from "../data/recipes.js";
import {
  filterRecipes,
  displayRecipes,
  buildIngredientDropdown,
  buildAppareilDropdown,
  buildUstensileDropdown,
} from "./utils.js";

let globalRecipesState = [];

const searchBar = document.getElementById("search");
const recipesList = document.querySelector("main");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  console.log("search", searchString);

  if (searchString.length < 3) return displayRecipes(recipes, recipesList);

  const filteredRecipes = filterRecipes(searchString, recipes);

  globalRecipesState = filteredRecipes;

  displayRecipes(filteredRecipes, recipesList);
  console.log("globalRecipesState", globalRecipesState);
  console.log("filteredRecipes", filteredRecipes);

  if (globalRecipesState.length === 0) {
    console.log("test fonction d'erreur");
    const newArcticle = document.createElement("article");
    const htmlString = `<p>Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`;
    newArcticle.innerHTML = htmlString;
    recipesList.appendChild(newArcticle);
  }
});

const ingredientsList = document.querySelector(".dropdown-list-ingredients");
const appareilsList = document.querySelector(".dropdown-list-appareil");
const ustensilesList = document.querySelector(".dropdown-list-ustensiles");

const dropDownEventListeners = () => {
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
  activeDropDown();
};

const oneDropdown = (target) => {
  const activeDropdown = document.querySelector(".dropdown-form-active");
  if (
    activeDropdown &&
    !activeDropdown.classList.contains(`input-${target.classList[3]}`)
  )
    activeDropDown();
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

export const activeDropDown = () => {
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
  buildIngredientDropdown(recipes, ingredientsList);
  buildAppareilDropdown(recipes, appareilsList);
  buildUstensileDropdown(recipes, ustensilesList);
};

let uniqueIngredients = [];
export function removeDuplicateIngredients(recipes) {
  const ingredientsNames = new Set();
  recipes.forEach((recipe) =>
    recipe.ingredients.forEach((element) =>
      ingredientsNames.add(element.ingredient.toLowerCase())
    )
  );

  uniqueIngredients = [...ingredientsNames];
  return [...ingredientsNames];
}

export function removeDuplicateAppareils(recipes) {
  const appareilsNames = new Set();

  recipes.forEach((recipe) => appareilsNames.add(recipe.appliance));

  return [...appareilsNames];
}

export function removeDuplicateUstensiles(recipes) {
  const ustensilesNames = new Set();

  recipes.forEach((recipe) =>
    recipe.ustensils.forEach((ustensil) => ustensilesNames.add(ustensil))
  );

  return [...ustensilesNames];
}

const appareilSearch = document.getElementById("search-appareil");
const ustensileSearch = document.getElementById("search-ustensiles");
const ingredientSearch = document.getElementById("search-ingredients");

function displayIngredientInputSearch() {
  ingredientSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    // on filtre les ingrédients par rapport à la l'input du user
    const filteredIngredients = uniqueIngredients.filter((ingredient) => {
      return ingredient.includes(searchString);
    });

    // REBUILD the DOM
    buildIngredientDropdown(recipes, ingredientsList, filteredIngredients);
  });
}

function init() {
  displayRecipes(recipes, recipesList);
  dropDownEventListeners();
  displayIngredientInputSearch();
}

init();
