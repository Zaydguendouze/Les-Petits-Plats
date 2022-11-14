import { recipes } from "../data/recipes.js";
import { filterRecipes, displayRecipes, buildDropdown } from "./utils.js";
import { dropDownEventListeners, removeTags } from "./dropdowns.js";

/* Global variables --------------------------------- */
export let globalRecipesState = [];
let uniqueIngredients = [];
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

export let filterDropIngredients;
let filterDropAppareils;
let filterDropUstensiles;

export function displayInputSearch() {
  ingredientSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredIngredients = uniqueIngredients.filter((ingredient) => {
      return ingredient.includes(searchString);
    });

    filteredIngredients = filterDropIngredients;

    buildDropdown(recipes, "ingredients", ingredientsList, filteredIngredients);
  });

  appareilSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredAppareil = uniqueAppareil.filter((appliance) => {
      return appliance.includes(searchString);
    });

    filteredAppareil = filterDropAppareils;

    buildDropdown(recipes, "appareils", appareilsList, filteredAppareil);
  });

  ustensileSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredUstensiles = uniqueUstensils.filter((ustensils) => {
      return ustensils.includes(searchString);
    });

    filteredUstensiles = filterDropUstensiles;

    buildDropdown(recipes, "ustensiles", ustensilesList, filteredUstensiles);
  });
}

export let tagsArrayIngredients = [];
let tagsArrayAppareils = [];
let tagsArrayUstensiles = [];

export const filterByTags = () => {
  let tags = document.getElementsByClassName("tagCreated");

  // let tagsArrayIngredients = [];
  // let tagsArrayAppareils = [];
  // let tagsArrayUstensiles = [];

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

  // if (tagsArrayIngredients.length > 0) {
  //   data = data.filter((recipe) => {
  //     const tempRecipe = tagsArrayIngredients.every((ingredient) => {
  //       return recipe.ingredients.some(
  //         (element) =>
  //           element.ingredient.toLowerCase() === ingredient.toLowerCase()
  //       );
  //     });
  //     if (tempRecipe) return recipe;
  //   });
  //   buildDropdown(data, "ingredients", ingredientsList, filterDropIngredients);
  // }

  // -------------------------------------------------------------------------
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

        if (j === tagsArrayIngredients.length - 1 && includeRecipe === true) {
          filtredRecipes.push(recipe);
        }
      }
    }
    if (filtredRecipes.length > 0) {
      console.log("filtredRecipes", filtredRecipes);
      data = filtredRecipes;
    }
    buildDropdown(data, "ingredients", ingredientsList, filterDropIngredients);
  }
  // END build filter without using array functions: map, filter.........
  // -------------------------------------------------------------------------

  // if (tagsArrayAppareils.length > 0) {
  //   data = data.filter((recipe) => {
  //     const tempRecipe = tagsArrayAppareils.every((appareil) => {
  //       return recipe.appliance.toLowerCase() === appareil.toLowerCase();
  //     });
  //     if (tempRecipe) return recipe;
  //   });
  //   buildDropdown(data, "appareils", appareilsList, filterDropAppareils);
  // }

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

        if (j === tagsArrayAppareils.length - 1 && includeRecipe === true) {
          filtredRecipes.push(recipe);
        }
      }
    }
    if (filtredRecipes.length > 0) {
      console.log("filtredRecipes", filtredRecipes);
      data = filtredRecipes;
    }
    buildDropdown(data, "appareils", appareilsList, filterDropAppareils);
  }

  // if (tagsArrayUstensiles.length > 0) {
  //   data = data.filter((recipe) => {
  //     const tempRecipe = tagsArrayUstensiles.every((ustensile) => {
  //       return recipe.ustensils.some(
  //         (element) => element.toLowerCase() === ustensile.toLowerCase()
  //       );
  //     });
  //     if (tempRecipe) return recipe;
  //   });
  //   buildDropdown(data, "ustensiles", ustensilesList, filterDropUstensiles);
  // }

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

        if (j === tagsArrayUstensiles.length - 1 && includeRecipe === true) {
          filtredRecipes.push(recipe);
        }
      }
    }
    if (filtredRecipes.length > 0) {
      console.log("filtredRecipes", filtredRecipes);
      data = filtredRecipes;
    }
    buildDropdown(data, "ustensiles", ustensilesList, filterDropUstensiles);
  }

  globalRecipesState = data;
  displayRecipes(globalRecipesState, recipesList);
};

function init() {
  search();
  displayRecipes(recipes, recipesList);
  dropDownEventListeners();
  displayInputSearch();
}

init();
