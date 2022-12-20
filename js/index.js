import { recipes } from "../data/recipes.js";
import { displayRecipes, buildDropdown, filterRecipes } from "./utils.js";
import { dropDownEventListeners, removeTag } from "./dropdowns.js";

/* Global variables --------------------------------- */
export let globalRecipesState = [];
let uniqueIngredients = [];
let uniqueAppareil = [];
let uniqueUstensils = [];
let updateValue = [];
/* Global variables -------------------------------- */

const searchBar = document.getElementById("search");
const recipesList = document.querySelector("main");

export function search() {
  searchBar.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    if (searchString.length < 3) {
      displayRecipes(recipes, recipesList);
      filterByTags("resetRecipesState");
      buildDropdown(globalRecipesState, "ingredients", ingredientsList);
      buildDropdown(globalRecipesState, "appareils", appareilsList);
      return buildDropdown(globalRecipesState, "ustensiles", ustensilesList);
    }

    const filteredRecipes = filterRecipes(searchString, recipes);

    globalRecipesState = filteredRecipes;
    console.log(globalRecipesState);

    displayRecipes(filteredRecipes, recipesList);
    filterByTags();
    buildDropdown(globalRecipesState, "ingredients", ingredientsList);
    buildDropdown(globalRecipesState, "appareils", appareilsList);
    buildDropdown(globalRecipesState, "ustensiles", ustensilesList);

    if (filteredRecipes.length === 0) {
      const newArcticle = document.createElement("article");
      const htmlString = `<p>Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.</p>`;
      newArcticle.innerHTML = htmlString;
      recipesList?.replaceChildren(newArcticle);
    }
  });
}

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

export function displayInputSearch() {
  ingredientSearch.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredIngredients = uniqueIngredients.filter((ingredient) => {
      return ingredient.includes(searchString);
    });

    buildDropdown(recipes, "ingredients", ingredientsList, filteredIngredients);
  });

  appareilSearch.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredAppareil = uniqueAppareil.filter((appliance) => {
      return appliance.includes(searchString);
    });

    buildDropdown(recipes, "appareils", appareilsList, filteredAppareil);
  });

  ustensileSearch.addEventListener("input", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredUstensiles = uniqueUstensils.filter((ustensils) => {
      return ustensils.includes(searchString);
    });

    buildDropdown(recipes, "ustensiles", ustensilesList, filteredUstensiles);
  });
}

// strategy : filterAfterTagRemoved
export const filterByTags = (strategy) => {
  if (strategy === "resetRecipesState") {
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

  if (tagsArrayIngredients.length > 0) {
    data = data.filter((recipe) => {
      const tempRecipe = tagsArrayIngredients.every((ingredient) => {
        return recipe.ingredients.some(
          (element) =>
            element.ingredient.toLowerCase() === ingredient.toLowerCase()
        );
      });
      if (tempRecipe) return recipe;
    });
    buildDropdown(data, "ingredients", ingredientsList);
  } else {
    buildDropdown(data, "ingredients", ingredientsList);
  }

  if (tagsArrayAppareils.length > 0) {
    data = data.filter((recipe) => {
      const tempRecipe = tagsArrayAppareils.every((appareil) => {
        return recipe.appliance.toLowerCase() === appareil.toLowerCase();
      });
      if (tempRecipe) return recipe;
    });
    buildDropdown(data, "appareils", appareilsList);
  } else {
    buildDropdown(data, "appareils", appareilsList);
  }

  if (tagsArrayUstensiles.length > 0) {
    data = data.filter((recipe) => {
      const tempRecipe = tagsArrayUstensiles.every((ustensile) => {
        return recipe.ustensils.some(
          (element) => element.toLowerCase() === ustensile.toLowerCase()
        );
      });
      if (tempRecipe) return recipe;
    });
    buildDropdown(data, "ustensiles", ustensilesList);
  } else {
    buildDropdown(data, "ustensiles", ustensilesList);
  }

  // console.log("tagsArrayIngredients in filterbytags", tagsArrayIngredients);

  globalRecipesState = data;
  console.log("globalRecipesState", globalRecipesState);
  displayRecipes(globalRecipesState, recipesList);
  return globalRecipesState;
};

function init() {
  search();
  displayRecipes(recipes, recipesList);
  dropDownEventListeners();
  displayInputSearch();
}

init();
