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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// type = "ingredients" || "appareils" || "ustensiles"
// export const buildDropdown  => (type, recipes, list, filtredInput) => {
// }
// buildDropdown("ingredients", recipes, ingredientsList, filtredInput);

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// let type = "ingredients" || "appareils" || "ustensiles";

export const buildDropdown = (recipes, type, list, filtredInput) => {
  let ingredients = [];
  let appareils = [];
  let ustensiles = [];
  // type = "ingredients" || "appareils" || "ustensiles";
  // list = ingredientList || appareilList || ustensilList;

  switch (type) {
    case "ingredients":
      if (filtredInput && filtredInput.length > 0 && type === "ingredients") {
        ingredients = filtredInput;
      } else {
        ingredients = removeDuplicateIngredients(recipes);
        console.log(list);
      }

      const ingredientListDOM = ingredients
        .slice(0, 30)
        .map((ingredient) => {
          return `
        <li>${capitalizeFirstLetter(ingredient)}</li>
      `;
        })
        .join("");
      list.innerHTML = ingredientListDOM;
      break;

    case "appareils":
      if (filtredInput && filtredInput.length > 0 && type === "appareils") {
        appareils = filtredInput;
      } else {
        appareils = removeDuplicateAppareils(recipes);
        console.log(list);
      }

      const appareilListDOM = appareils
        .slice(0, 30)
        .map((appliance) => {
          return `
        <li>${capitalizeFirstLetter(appliance)}</li>
      `;
        })
        .join("");
      list.innerHTML = appareilListDOM;
      break;

    case "ustensiles":
      if (filtredInput && filtredInput.length > 0) {
        ustensiles = filtredInput;
      } else {
        ustensiles = removeDuplicateUstensiles(recipes);
        console.log(list);
      }

      const ustensilListDOM = ustensiles
        .slice(0, 30)
        .map((ustensils) => {
          return `
        <li>${capitalizeFirstLetter(ustensils)}</li>
      `;
        })
        .join("");
      list.innerHTML = ustensilListDOM;
      break;
  }
  return list;
};

export const buildIngredientDropdown = (
  recipes,
  ingredientsList,
  filtredInputIngredients
) => {
  let ingredients = [];

  if (filtredInputIngredients && filtredInputIngredients.length > 0) {
    ingredients = filtredInputIngredients;
  } else {
    ingredients = removeDuplicateIngredients(recipes);
  }

  const ingredientListDOM = ingredients
    .slice(0, 30)
    .map((ingredient) => {
      return `
        <li>${capitalizeFirstLetter(ingredient)}</li>
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
