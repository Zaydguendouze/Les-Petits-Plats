import { recipes } from "../data/recipes.js";
import { filterRecipes, displayRecipes, buildDropdown } from "./utils.js";
import { dropDownEventListeners } from "./dropdowns.js";

/* Global variables --------------------------------- */
let globalRecipesState = [];
export let uniqueIngredients = [];
let uniqueAppareil = [];
let uniqueUstensils = [];
/* Global variables -------------------------------- */

const searchBar = document.getElementById("search");
const recipesList = document.querySelector("main");

export function search() {
  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    if (searchString.length < 3) return displayRecipes(recipes, recipesList);

    const filteredRecipes = filterRecipes(searchString, recipes);

    globalRecipesState = filteredRecipes;
    console.log(filteredRecipes);

    displayRecipes(filteredRecipes, recipesList);

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

export const filterByTags = () => {
  let tags = document.getElementsByClassName("tagCreated");

  let tagsArrayIngredients = [];
  let tagsArrayAppareils = [];
  let tagsArrayUstensiles = [];

  let tagCross = document.querySelectorAll(".cross");
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

  if (globalRecipesState.length > 0) {
    data = [...globalRecipesState];
  } else {
    data = [...recipes];
  }

  console.log("databeforefilter", data);
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
  }

  if (tagsArrayAppareils.length > 0) {
    data = data.filter((recipe) => {
      const tempRecipe = tagsArrayAppareils.every((appareil) => {
        return recipe.appliance.toLowerCase() === appareil.toLowerCase();
      });
      if (tempRecipe) return recipe;
    });
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
  }

  // START ajouter le filtre pour les ustencils !

  // END

  console.log(data);
  globalRecipesState = data;
  console.log(tagsArrayAppareils, tagsArrayIngredients, tagsArrayUstensiles);
  // console.log("data", data);
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
