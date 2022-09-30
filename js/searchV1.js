import { recipes } from "../data/recipes.js";

// let dataArray;

const recipesList = document.querySelector("main");
const searchBar = document.getElementById("search");
// let allRecipes = [recipes];

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchString);
    // ||
    // recipe.ingredients.toLowerCase().includes(searchString) ||
    // recipe.description.toLowerCase().includes(searchString)
  });
  displayrecipes(filteredRecipes);
  console.log(recipes);
});

function getRecipes() {
  // const res = recipes;
  // dataArray = orderList(res);
  displayrecipes(recipes);
}

// function orderList(data) {
//   const orderData = data.sort((a, b) => {
//     if (
//       a.name.toLowerCase() < b.name.toLowerCase()
//       // ||
//       // a.ingredients.toLowerCase() < b.ingredients.toLowerCase() ||
//       // a.description.toLowerCase() < b.description.toLowerCase()
//     ) {
//       return -1;
//     }
//     if (
//       a.name.toLowerCase() < b.name.toLowerCase()
//       // ||
//       // a.ingredients.toLowerCase() < b.ingredients.toLowerCase() ||
//       // a.description.toLowerCase() < b.description.toLowerCase()
//     ) {
//       return 1;
//     }
//     return 0;
//   });
//   return orderData;
// }

const displayrecipes = (recipes) => {
  const htmlString = recipes.map((recipe) => {
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
  });
  // Ajout des recettes
  recipesList.innerHTML = htmlString;
};

console.log(recipes);

getRecipes();
