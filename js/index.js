import { recipes } from "../data/recipes.js";
import {
  filterRecipes,
  displayRecipes,
  buildIngredientDropdown,
  buildAppareilDropdown,
  buildUstensileDropdown,
} from "./utils.js";

let globalRecipesState = [];
let ingredientsTags = [];

const searchBar = document.getElementById("search");
const recipesList = document.querySelector("main");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  if (searchString.length < 0) return displayRecipes(recipes, recipesList);

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

const btnIngredients = document.querySelector(".btn-ingredients");
const btnAppareils = document.querySelector(".btn-appareil");
const btnUstensiles = document.querySelector(".btn-ustensiles");

btnIngredients.addEventListener("click", openDropdownIngredients);
btnAppareils.addEventListener("click", openDropdownAppareils);
btnUstensiles.addEventListener("click", openDropdownUstensiles);

export function removeDuplicateIngredients(recipes) {
  const ingredientsNames = new Set();

  recipes.forEach((recipe) =>
    recipe.ingredients.forEach((element) =>
      ingredientsNames.add(element.ingredient)
    )
  );

  console.log(ingredientsNames);

  return [...ingredientsNames];
}

export function removeDuplicateAppareils(recipes) {
  const appareilsNames = new Set();

  recipes.forEach((recipe) => appareilsNames.add(recipe.appliance));

  console.log(appareilsNames);

  return [...appareilsNames];
}

export function removeDuplicateUstensiles(recipes) {
  const ustensilesNames = new Set();

  recipes.forEach((recipe) =>
    recipe.ustensils.forEach((ustensil) => ustensilesNames.add(ustensil))
  );

  console.log(ustensilesNames);

  return [...ustensilesNames];
}

const inputIngredients = document.querySelector(".input-ingredients");
const listIngredients = document.querySelector(".dropdown-list-ingredients");
const iconIngredients = document.querySelector(".i-ingredients");

const inputAppareils = document.querySelector(".input-appareil");
const listAppareils = document.querySelector(".dropdown-list-appareil");
const iconAppareils = document.querySelector(".i-appareil");

const inputUstensiles = document.querySelector(".input-ustensiles");
const listUstensiles = document.querySelector(".dropdown-list-ustensiles");
const iconUstensiles = document.querySelector(".i-ustensiles");

function openDropdownIngredients() {
  if (inputIngredients.classList.contains("dropdown-form-active")) {
    inputIngredients.classList.remove("dropdown-form-active");
    listIngredients.classList.remove("dropdown-list-active");
    btnIngredients.classList.remove("btn-active");
    iconIngredients.style.transform = "rotate(0deg)";
  } else {
    inputIngredients.classList.add("dropdown-form-active");
    listIngredients.classList.add("dropdown-list-active");
    btnIngredients.classList.add("btn-active");
    iconIngredients.style.color = "white";
    iconIngredients.style.transform = "rotate(180deg)";
  }
  buildIngredientDropdown(recipes, ingredientsList);
}

function openDropdownAppareils() {
  if (inputAppareils.classList.contains("dropdown-form-active")) {
    inputAppareils.classList.remove("dropdown-form-active");
    listAppareils.classList.remove("dropdown-list-active");
    btnAppareils.classList.remove("btn-active");
    iconAppareils.style.transform = "rotate(0deg)";
  } else {
    inputAppareils.classList.add("dropdown-form-active");
    listAppareils.classList.add("dropdown-list-active");
    btnAppareils.classList.add("btn-active");
    iconAppareils.style.color = "white";
    iconAppareils.style.transform = "rotate(180deg)";
  }
  buildAppareilDropdown(recipes, appareilsList);
}

function openDropdownUstensiles() {
  if (inputUstensiles.classList.contains("dropdown-form-active")) {
    inputUstensiles.classList.remove("dropdown-form-active");
    listUstensiles.classList.remove("dropdown-list-active");
    btnUstensiles.classList.remove("btn-active");
    iconUstensiles.style.transform = "rotate(0deg)";
  } else {
    inputUstensiles.classList.add("dropdown-form-active");
    listUstensiles.classList.add("dropdown-list-active");
    btnUstensiles.classList.add("btn-active");
    iconUstensiles.style.color = "white";
    iconUstensiles.style.transform = "rotate(180deg)";
  }
  buildUstensileDropdown(recipes, ustensilesList);
}

// inputIngredients.addEventListener("keyup", (e) => {
//   const searchString = e.target.value.toLowerCase();

//   if (searchString.length < 0)
//     return filterIngredients(recipes, ingredientsList);

//   const ingredientsTags = filterIngredients(searchString, recipes);

//   console.log("test", ingredientsTags);
// });

function init() {
  displayRecipes(recipes, recipesList);
}

init();
