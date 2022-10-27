import { recipes } from "../data/recipes.js";
import {
  filterRecipes,
  displayRecipes,
  buildDropdown,
  // createTags,
  // addNewTag,
  // createTag,
} from "./utils.js";
import {
  dropDownEventListeners,
  // createTags,
  // addNewTag,
  // tagRecover,
} from "./dropdowns.js";

/* Global variables --------------------------------- */
let globalRecipesState = [];

/* Global variables -------------------------------- */

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

var uniqueIngredients = [];
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

  recipes.forEach((recipe) =>
    appareilsNames.add(recipe.appliance.toLowerCase())
  );

  uniqueAppareil = [...appareilsNames];
  return [...appareilsNames];
}

let uniqueUstensils = [];
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

    console.log(filteredIngredients);

    buildDropdown(recipes, "ingredients", ingredientsList, filteredIngredients);
  });

  appareilSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredAppareil = uniqueAppareil.filter((appliance) => {
      return appliance.includes(searchString);
    });

    console.log(filteredAppareil);
    buildDropdown(recipes, "appareils", appareilsList, filteredAppareil);
  });

  ustensileSearch.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredUstensiles = uniqueUstensils.filter((ustensils) => {
      return ustensils.includes(searchString);
    });

    console.log(type);
    buildDropdown(recipes, "ustensiles", ustensilesList, filteredUstensiles);
  });
}

// function createTag() {
//   const allLi = document.querySelectorAll(".list");
//   const tags = document.querySelector(".tags");

//   allLi.forEach((li) => {
//     li.addEventListener("click", () => {
//       // const tag = document.createElement("li");
//       console.log("test");
//     });
//   });
// }

// const createTags = (e) => {
//   const tagsList = document.querySelector(".tags");
//   const list = e.target;
//   const newTag = document.createElement("li");
//   const newTagDOM = `${list.innerText} <i id = "${list.innerText}" class="far fa-times-circle"></i>`;
//   if (list.classList.contains("li-ingredients")) {
//     newTag.classList.add("tag-ingredients");
//   } else if (list.classList.contains("li-appliance")) {
//     newTag.classList.add(`tag-appliance`);
//   } else if (list.classList.contains("li-ustensils")) {
//     newTag.classList.add(`tag-ustensils`);
//   }

//   newTag.innerHTML = newTagDOM;
//   tagsList.appendChild(newTag);
//   const newSearchTag = tagLi.innerText.split(" ");
//   splitClean(newSearchTag);
//   newSearchTag.forEach((newT) => {
//     if (list.classList.contains("li-ingredients"))
//       addNewTag(uniqueIngredients[0], newT);
//     else if (list.classList.contains("li-appliance"))
//       addNewTag(uniqueAppareil[0], newT);
//     else if (list.classList.contains("li-ustensils"))
//       addNewTag(uniqueUstensils[0], newT);
//   });

//   buildDropdown();
// };

// const addNewTag = (tagsArray, newTag) => {
//   let tags = 0;
//   console.log(tagsArray);
//   tagsArray.forEach((currentTag) => {
//     if (currentTag === newTag) tags++;
//   });
//   if (tags === 0) tagsArray.push(newTag);
// };

function init() {
  displayRecipes(recipes, recipesList);
  dropDownEventListeners();
  displayInputSearch();
  // createTag();
  // createTags();
  // addNewTag();
  // tagRecover();
}

init();
