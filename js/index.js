import { recipes } from "../data/recipes.js";
import { filterRecipes, displayRecipes, buildDropdown } from "./utils.js";
import { dropDownEventListeners } from "./dropdowns.js";

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

let uniqueAppareil = [];
export function removeDuplicateAppareils(recipes) {
  const appareilsNames = new Set();

  recipes.forEach((recipe) => appareilsNames.add(recipe.appliance));

  uniqueAppareil = [...appareilsNames];
  return [...appareilsNames];
}

let uniqueUstensils = [];
export function removeDuplicateUstensiles(recipes) {
  const ustensilesNames = new Set();

  recipes.forEach((recipe) =>
    recipe.ustensils.forEach((ustensil) => ustensilesNames.add(ustensil))
  );

  uniqueUstensils = [...ustensilesNames];
  return [...ustensilesNames];
}

const appareilSearch = document.getElementById("search-appareil");
const ustensileSearch = document.getElementById("search-ustensiles");
const ingredientSearch = document.getElementById("search-ingredients");

function displayInputSearch() {
  ingredientSearch.addEventListener("keyup", (e) => {
    let type = "ingredients";
    const searchString = e.target.value.toLowerCase();

    const filteredIngredients = uniqueIngredients.filter((ingredient) => {
      return ingredient.includes(searchString);
    });

    console.log(filteredIngredients);

    buildDropdown(recipes, type, ingredientsList, filteredIngredients);
  });

  appareilSearch.addEventListener("keyup", (e) => {
    let type = "appareils";
    const searchString = e.target.value.toLowerCase();

    const filteredAppareil = uniqueAppareil.filter((appliance) => {
      return appliance.includes(searchString);
    });

    console.log(filteredAppareil);
    buildDropdown(recipes, type, appareilsList, filteredAppareil);
  });

  ustensileSearch.addEventListener("keyup", (e) => {
    let type = "ustensiles";
    const searchString = e.target.value.toLowerCase();

    const filteredUstensiles = uniqueUstensils.filter((ustensils) => {
      return ustensils.includes(searchString);
    });

    console.log(filteredUstensiles);
    buildDropdown(recipes, type, ustensilesList, filteredUstensiles);
  });
}

function init() {
  displayRecipes(recipes, recipesList);
  dropDownEventListeners();
  displayInputSearch();
}

init();
