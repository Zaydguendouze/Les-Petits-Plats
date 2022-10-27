import { recipes } from "../data/recipes.js";
import { filterRecipes, displayRecipes, buildDropdown } from "./utils.js";
import { dropDownEventListeners } from "./dropdowns.js";

/* Global variables --------------------------------- */
let globalRecipesState = [];
let uniqueIngredients = [];
let uniqueAppareil = [];
let uniqueUstensils = [];
/* Global variables -------------------------------- */

const searchBar = document.getElementById("search");
const recipesList = document.querySelector("main");

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  if (searchString.length < 3) return displayRecipes(recipes, recipesList);

  const filteredRecipes = filterRecipes(searchString, recipes);

  globalRecipesState = filteredRecipes;

  displayRecipes(filteredRecipes, recipesList);

  if (globalRecipesState.length === 0) {
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

  recipes.forEach((recipe) =>
    appareilsNames.add(recipe.appliance.toLowerCase())
  );

  uniqueAppareil = [...appareilsNames];
  return [...appareilsNames];
}

export function removeDuplicateUstensiles(recipes) {
  const ustensilesNames = new Set();

  recipes.forEach((recipe) =>
    recipe.ustensils.forEach((ustensil) =>
      ustensilesNames.add(ustensil.toLowerCase())
    )
  );

  uniqueUstensils = [...ustensilesNames];
  return [...ustensilesNames];
}

const appareilSearch = document.getElementById("search-appareil");
const ustensileSearch = document.getElementById("search-ustensiles");
const ingredientSearch = document.getElementById("search-ingredients");

function displayInputSearch() {
  ingredientSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredIngredients = uniqueIngredients.filter((ingredient) => {
      return ingredient.includes(searchString);
    });

    buildDropdown(recipes, "ingredients", ingredientsList, filteredIngredients);
  });

  appareilSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredAppareil = uniqueAppareil.filter((appliance) => {
      return appliance.includes(searchString);
    });

    buildDropdown(recipes, "appareils", appareilsList, filteredAppareil);
  });

  ustensileSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredUstensiles = uniqueUstensils.filter((ustensils) => {
      return ustensils.includes(searchString);
    });

    buildDropdown(recipes, "ustensiles", ustensilesList, filteredUstensiles);
  });
}

function init() {
  displayRecipes(recipes, recipesList);
  dropDownEventListeners();
  displayInputSearch();
}

init();
