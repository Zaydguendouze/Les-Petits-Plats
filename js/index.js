import { recipes } from "../data/recipes.js";
import {
  filterRecipesSearch,
  displayRecipes,
  buildDropdown,
  filterRecipes,
} from "./utils.js";
import { dropDownEventListeners, removeTag } from "./dropdowns.js";

/* Global variables --------------------------------- */
export let globalRecipesState = [];
let uniqueIngredients = [];
let uniqueAppareil = [];
let uniqueUstensils = [];
/* Global variables -------------------------------- */

const searchBar = document.getElementById("search");
const recipesList = document.querySelector("main");

export function search() {
  searchBar.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    if (searchString.length < 3) return displayRecipes(recipes, recipesList);

    const filteredRecipes = filterRecipes(searchString, recipes);

    globalRecipesState = filteredRecipes;
    console.log(filteredRecipes);

    displayRecipes(filteredRecipes, recipesList);
    filterByTags();
    buildDropdown(globalRecipesState, "ingredients", ingredientsList);
    buildDropdown(globalRecipesState, "appareils", appareilsList);
    buildDropdown(globalRecipesState, "ustensiles", ustensilesList);

    if (globalRecipesState.length === 0) {
      const newArcticle = document.createElement("article");
      const htmlString = `<p>Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`;
      newArcticle.innerHTML = htmlString;
      recipesList.appendChild(newArcticle);
    }
  });
}

const ingredientsList = document.querySelector(".dropdown-list-ingredients");
const appareilsList = document.querySelector(".dropdown-list-appareil");
const ustensilesList = document.querySelector(".dropdown-list-ustensiles");

export function removeDuplicateIngredients(recipes) {
  const ingredientsNames = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      ingredientsNames.add(recipe.ingredients[j].ingredient.toLowerCase());
    }
  }

  uniqueIngredients = [...ingredientsNames];
  return [...ingredientsNames];
}

export function removeDuplicateAppareils(recipes) {
  const appareilsNames = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.appliance.length; j++) {
      appareilsNames.add(recipe.appliance.toLowerCase());
    }
  }

  uniqueAppareil = [...appareilsNames];
  return [...appareilsNames];
}

export function removeDuplicateUstensiles(recipes) {
  const ustensilesNames = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    for (let j = 0; j < recipe.ustensils.length; j++) {
      ustensilesNames.add(recipe.ustensils[j].toLowerCase());
    }
  }

  uniqueUstensils = [...ustensilesNames];
  return [...ustensilesNames];
}

const appareilSearch = document.getElementById("search-appareil");
const ustensileSearch = document.getElementById("search-ustensiles");
const ingredientSearch = document.getElementById("search-ingredients");

export function displayInputSearch() {
  ingredientSearch.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    // Bon ici avec une value comment faire la boucle ??
    let filteredIngredients = [];
    for (let i = 0; i < uniqueIngredients.length; i++) {
      if (
        uniqueIngredients[i].toLowerCase().includes(searchString.toLowerCase())
      ) {
        filteredIngredients.push(uniqueIngredients[i].toLowerCase());
      }
    }

    buildDropdown(recipes, "ingredients", ingredientsList, filteredIngredients);
  });

  appareilSearch.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    let filteredAppareil = [];
    for (let i = 0; i < uniqueAppareil.length; i++) {
      if (
        uniqueAppareil[i].toLowerCase().includes(searchString.toLowerCase())
      ) {
        filteredAppareil.push(uniqueAppareil[i].toLowerCase());
      }
    }

    buildDropdown(recipes, "appareils", appareilsList, filteredAppareil);
  });

  ustensileSearch.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    let filteredUstensiles = [];
    for (let i = 0; i < uniqueUstensils.length; i++) {
      if (
        uniqueUstensils[i].toLowerCase().includes(searchString.toLowerCase())
      ) {
        filteredUstensiles.push(uniqueUstensils[i].toLowerCase());
      }
    }

    buildDropdown(recipes, "ustensiles", ustensilesList, filteredUstensiles);
  });
}

// strategy : filterAfterTagRemoved
export const filterByTags = (strategy) => {
  if (strategy === "filterAfterTagRemoved") {
    globalRecipesState = [];
    console.log("globalRecipesState empty", globalRecipesState);
  }

  let tags = document.getElementsByClassName("tagCreated");

  let tagsArrayIngredients = [];
  let tagsArrayAppareils = [];
  let tagsArrayUstensiles = [];

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
  let data = [];

  // Stocker les datas après une recherche effectuée ou un tag, ou utiliser les recettes originales
  if (globalRecipesState.length > 0) {
    data = [...globalRecipesState];
  } else {
    data = [...recipes];
  }

  console.log("databeforefilter", data);

  // START build filter without using array functions: map, filter.........
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
        if (!includeRecipe) break;

        if (j === tagsArrayIngredients.length - 1 && includeRecipe === true) {
          filtredRecipes.push(recipe);
        }
      }
    }
    if (filtredRecipes.length > 0) {
      console.log("filtredRecipes", filtredRecipes);
      data = filtredRecipes;
      buildDropdown(data, "ingredients", ingredientsList);
      buildDropdown(data, "appareils", appareilsList);
      buildDropdown(data, "ustensiles", ustensilesList);
    }
  } else {
    buildDropdown(data, "ingredients", ingredientsList);
    buildDropdown(data, "appareils", appareilsList);
    buildDropdown(data, "ustensiles", ustensilesList);
  }
  // END build filter without using array functions: map, filter.........
  // -------------------------------------------------------------------------

  if (tagsArrayAppareils.length > 0) {
    const filtredRecipes = [];

    for (let i = 0; i < data.length; i++) {
      const recipe = data[i];
      let includeRecipe = false;
      for (let j = 0; j < tagsArrayAppareils.length; j++) {
        for (let k = 0; k < recipe.appliance.length; k++) {
          console.log(recipe.appliance.toLowerCase());
          if (
            recipe.appliance.toLowerCase() ===
            tagsArrayAppareils[j].toLowerCase()
          ) {
            includeRecipe = true;
            break;
          } else includeRecipe = false;
        }
        if (!includeRecipe) break;

        if (j === tagsArrayAppareils.length - 1 && includeRecipe === true) {
          filtredRecipes.push(recipe);
        }
      }
    }
    if (filtredRecipes.length > 0) {
      console.log("filtredRecipes", filtredRecipes);
      data = filtredRecipes;
      buildDropdown(data, "ingredients", ingredientsList);
      buildDropdown(data, "appareils", appareilsList);
      buildDropdown(data, "ustensiles", ustensilesList);
    }
  } else {
    buildDropdown(data, "ingredients", ingredientsList);
    buildDropdown(data, "appareils", appareilsList);
    buildDropdown(data, "ustensiles", ustensilesList);
  }

  if (tagsArrayUstensiles.length > 0) {
    const filtredRecipes = [];

    for (let i = 0; i < data.length; i++) {
      const recipe = data[i];
      let includeRecipe = false;
      for (let j = 0; j < tagsArrayUstensiles.length; j++) {
        for (let k = 0; k < recipe.ustensils.length; k++) {
          console.log(recipe.ustensils[k].toLowerCase());
          if (
            recipe.ustensils[k].toLowerCase() ===
            tagsArrayUstensiles[j].toLowerCase()
          ) {
            includeRecipe = true;
            break;
          } else includeRecipe = false;
        }
        if (!includeRecipe) break;

        if (j === tagsArrayUstensiles.length - 1 && includeRecipe === true) {
          filtredRecipes.push(recipe);
        }
      }
    }
    if (filtredRecipes.length > 0) {
      console.log("filtredRecipes", filtredRecipes);
      data = filtredRecipes;
      buildDropdown(data, "ingredients", ingredientsList);
      buildDropdown(data, "appareils", appareilsList);
      buildDropdown(data, "ustensiles", ustensilesList);
    }
  } else {
    buildDropdown(data, "ingredients", ingredientsList);
    buildDropdown(data, "appareils", appareilsList);
    buildDropdown(data, "ustensiles", ustensilesList);
  }

  console.log("tagsArrayIngredients in filterbytags", tagsArrayIngredients);

  globalRecipesState = data;
  console.log("globalRecipesState", globalRecipesState);
  displayRecipes(globalRecipesState, recipesList);
};

function init() {
  search();
  displayRecipes(recipes, recipesList);
  dropDownEventListeners();
  displayInputSearch();
}

init();
