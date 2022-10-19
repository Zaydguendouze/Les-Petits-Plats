import { recipes } from "../data/recipes.js";
import {
  filterRecipes,
  displayRecipes,
  buildIngredientDropdown,
  buildAppareilDropdown,
  buildUstensileDropdown,
} from "./utils.js";

const ingredientSearch = document.getElementById("search-ingredients");
const appareilSearch = document.getElementById("search-appareil");
const ustensileSearch = document.getElementById("search-ustensiles");

export function displayIngredientInputSearch(recipes, ingredientsList) {
  //   const allIngredients = ingredientsNames;

  //   console.log(allIngredients);
  //   const ingredient = ingredientSearch.addEventListener("keyup", (e) => {
  //     const searchString = e.target.value.toLowerCase();

  //     if (searchString.length < 3)
  //       return buildIngredientDropdown(ingredientsList);

  //     // const filteredIngredients = removeDuplicateIngredients(
  //     //   searchString,
  //     //   recipes
  //     // );

  //     // buildIngredientDropdown(filteredIngredients, ingredientsList);

  console.log("test", recipes);
  //   });
}
