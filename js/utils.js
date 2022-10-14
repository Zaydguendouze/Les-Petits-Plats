import { removeDuplicateIngredients } from "./index.js";
import { removeDuplicateAppareils } from "./index.js";
import { removeDuplicateUstensiles } from "./index.js";

export function filterRecipes(searchString, originalRecipes) {
  const filteredRecipes = originalRecipes.filter((recipe) => {
    const isSearchInIngredients = recipe.ingredients.filter((element) =>
      element.ingredient.toLowerCase().includes(searchString)
    );
    return (
      recipe.name.toLowerCase().includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString) ||
      isSearchInIngredients.length > 0
    );
  });

  return filteredRecipes;
}

export const displayRecipes = (recipes, recipesList) => {
  const htmlString = recipes
    .map((recipe) => {
      return `
    <article>
    <img class ="recipe-img" src="" alt="">
    <div class = "recipe d-flex flex-column">
        <div class = "mb-3 d-flex justify-content-between align-items-center">
            <h3>${recipe.name}</h3>
            <div class= "d-flex align-items-center">
                <i class="far fa-clock mr-1 d-flex align-items-center"></i>
                <h2>${recipe.time} min</h2>
            </div>
        </div >
        
        <div class = "d-flex justify-content-between align-items-start">

            <ul>${recipe.ingredients
              .map((e) => {
                return `<li class = "ingredients${e} "title="${e}"><h4>${
                  e.ingredient
                }</h4><span>${e.quantity ? ":" : ""} ${
                  e.quantity ? e.quantity : ""
                } ${e.unit ? e.unit : ""}</span></li>`;
              })
              // Concaténation pour retirer les virgules séparatrices avec .join()
              .join("")}
            </ul>

            <p>${recipe.description}</p>
        </div>
    </div>
    </article>
    `;
    })
    .join("");
  // Ajout des recettes
  recipesList.innerHTML = htmlString;
};

export const buildIngredientDropdown = (recipes, ingredientsList) => {
  console.log("test function ingredientDropdown");

  const ingredientsWithoutDuplicates = removeDuplicateIngredients(recipes);
  const ingredientListDOM = ingredientsWithoutDuplicates
    .map((ingredient) => {
      return `
        <li>${ingredient}</li>
      `;
    })
    .join("");
  ingredientsList.innerHTML = ingredientListDOM;
};

export const buildAppareilDropdown = (recipes, appareilsList) => {
  console.log("test function appareilDropdown");

  const appareilsWithoutDuplicates = removeDuplicateAppareils(recipes);
  const appareilListDOM = appareilsWithoutDuplicates
    .map((appliance) => {
      return `
        <li>${appliance}</li>
      `;
    })
    .join("");
  appareilsList.innerHTML = appareilListDOM;
};

export const buildUstensileDropdown = (recipes, ustensilesList) => {
  console.log("test function ustensileDropdown");

  const ustensilesWithoutDuplicates = removeDuplicateUstensiles(recipes);
  const ustensilListDOM = ustensilesWithoutDuplicates
    .map((ustensils) => {
      return `
        <li>${ustensils}</li>
      `;
    })
    .join("");
  ustensilesList.innerHTML = ustensilListDOM;
};
