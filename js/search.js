import { recipes } from "../data/recipes.js";
import { article, displayRecipe } from "./articles.js";

let data = [];

const searchInput = document.getElementById("search");
const main = document.querySelector("main");

function getData() {
  const res = recipes;
  data = orderList(res);
}

searchInput.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchString) ||
      recipe.ingredients.includes(searchString)
    );
  });
  article(filteredRecipes);
});

function orderList(data) {
  const orderData = data.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return orderData;
}
//   return orderedData;
// }

// export function filterData(e) {
//   searchResult.innerHTML = "";

//   const searchedString = e.target.value.toLowerCase().replace(/\s/g, "");

//   const filteredArr = displayRecipe.filter(
//     (el) =>
//       el.name.toLowerCase().includes(searchedString) ||
//       el.ingredients.toLowerCase().includes(searchedString) ||
//       `${el.name.last + el.name.first}`
//         .toLowerCase()
//         .replace(/\s/g, "")
//         .includes(searchedString) ||
//       `${el.name + el.ingredients}`
//         .toLowerCase()
//         .replace(/\s/g, "")
//         .includes(searchedString)
//   );

//   article(filteredArr);
// }

getData();
