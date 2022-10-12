import { recipes } from "../data/recipes.js";
import {
  filterRecipes,
  displayRecipes,
  buildIngredientDropdown,
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

const inputIngredients = document.querySelector("input-ingredients");
const ingredientsList = document.querySelector(".dropdown-list-ingredients");

const btnIngredients = document.querySelector(".btn-ingredients");

btnIngredients.addEventListener("click", openDropdownIngredients);

function openDropdownIngredients() {
  if (ingredientsList.style.display === "none") {
    ingredientsList.style.display = "block";
    ingredientsList.style.width = "410px";
  } else {
    ingredientsList.style.display = "none";
  }
  buildIngredientDropdown(recipes, ingredientsList);
}

export function removeDuplicateIngredients(recipes) {
  const ingredientsNames = new Set();

  recipes.forEach((recipe) =>
    recipe.ingredients.forEach((element) =>
      ingredientsNames.add(element.ingredient.toLowerCase())
    )
  );

  return [...ingredientsNames];

  // if ([...ingredientsNames] > 10)
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
  // ingredientDropdown(recipes, ingredientsList);
}

init();
