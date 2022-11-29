import { removeDuplicateIngredients } from "./index.js";
import { removeDuplicateAppareils } from "./index.js";
import { removeDuplicateUstensiles } from "./index.js";
import { createTag } from "./dropdowns.js";
// import { removeTags } from "./dropdowns.js";

export function filterRecipes(searchString, originalRecipes) {
  const filteredRecipes = originalRecipes.filter((recipe) => {
    const isSearchInIngredients = recipe.ingredients.filter((element) =>
      element.ingredient.toLowerCase().includes(searchString)
    );
    console.log("isSearchInIngredients", isSearchInIngredients);
    return (
      recipe.name.toLowerCase().includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString) ||
      isSearchInIngredients.length > 0
    );
  });

  console.log("filteredRecipes", filteredRecipes);
  return filteredRecipes;
}

// Ici boucler avec des paramètres
export function filterRecipesSearch(searchString, originalRecipes) {
  let filteredRecipes = [];
  for (let i = 0; i < originalRecipes.length; i++) {
    // console.log("recipe 1", recipe);
    // let includeRecipe = false;
    let recipe = originalRecipes[i];
    for (let j = 0; j < recipe.ingredients.length; j++) {
      let isSearchInIngredients =
        recipe.ingredients[j].ingredient.toLowerCase();
      // if (isSearchInIngredients === searchString.toLowerCase())
      // return isSearchInIngredients;
      // if (
      //   searchString.toLowerCase() ===
      //   recipe.ingredients[j].ingredient.toLowerCase()
      // )
      console.log("isSearchInIngredients", isSearchInIngredients);

      if (
        recipe.name.toLowerCase().includes(searchString) ||
        recipe.description.toLowerCase().includes(searchString) ||
        isSearchInIngredients.length > 0
      );
      // includeRecipe = true;
      // break;

      // else includeRecipe = false;
      // if (!includeRecipe) break;

      // if (j === recipe.ingredients.length - 1) {
      //   console.log("includeRecipe");
      //   filteredRecipes.push(recipe);
      // }
      // if (j === recipe.ingredients.length - 1) {
      // {
      //   includeRecipe = true;
      //   break;
      // } else includeRecipe = false;

      //   filteredRecipes.push(recipe);
      // }
    }

    // const filteredRecipes = originalRecipes[i];
    // console.log("originalRecipes[i]", originalRecipes[i]);
    // const isSearchInIngredients = originalRecipes[i].ingredients;
    // console.log(
    //   "originalRecipes[i].ingredients",
    //   originalRecipes[i].ingredients
    // );
    // for (let j = 0; j < isSearchInIngredients; j++) {
    //   if (
    //     isSearchInIngredients[j].ingredient.toLowerCase().includes(searchString)
    //   )
    //     return (
    //       originalRecipes.name.toLowerCase().includes(searchString) ||
    //       originalRecipes.description.toLowerCase().includes(searchString) ||
    //       isSearchInIngredients.length > 0
    //     );
    // }
  }
  return filteredRecipes.push(recipe);
}

const capitalizeFirstLetter = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

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

export const buildDropdown = (recipes, type, list, filtredInput) => {
  let ingredients = [];
  let appareils = [];
  let ustensiles = [];

  switch (type) {
    case "ingredients":
      if (filtredInput && filtredInput.length > 0) {
        ingredients = filtredInput;
      } else {
        ingredients = removeDuplicateIngredients(recipes);
      }

      const ingredientListDOM = ingredients
        .slice(0, 30)
        .map((ingredient) => {
          return `
        <li class="li-${type} tag">${capitalizeFirstLetter(ingredient)}</li>
      `;
        })
        .join("");
      list.innerHTML = ingredientListDOM;
      list.addEventListener("click", createTag);
      // list.addEventListener("click", removeTags);
      break;

    case "appareils":
      if (filtredInput && filtredInput.length > 0) {
        appareils = filtredInput;
      } else {
        appareils = removeDuplicateAppareils(recipes);
      }

      const appareilListDOM = appareils
        .map((appliance) => {
          return `
        <li class="li-${type}">${capitalizeFirstLetter(appliance)}</li>
      `;
        })
        .join("");
      list.innerHTML = appareilListDOM;
      list.addEventListener("click", createTag);
      // list.addEventListener("click", removeTags);
      break;

    case "ustensiles":
      if (filtredInput && filtredInput.length > 0) {
        ustensiles = filtredInput;
      } else {
        ustensiles = removeDuplicateUstensiles(recipes);
      }

      const ustensilListDOM = ustensiles
        .slice(0, 30)
        .map((ustensils) => {
          return `
        <li class="li-${type}">${capitalizeFirstLetter(ustensils)}</li>
      `;
        })
        .join("");
      list.innerHTML = ustensilListDOM;
      list.addEventListener("click", createTag);
      // list.addEventListener("click", removeTags);
      break;
  }

  return list;
};
