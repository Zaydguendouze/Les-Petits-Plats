import { recipes } from "../data/recipes.js";

let recipesOnPage = [];

const recipesList = document.querySelector("main");
const searchBar = document.getElementById("search");

export function filteredRecipes(searchString) {
  const filteredRecipes = recipes.filter((recipe) => {
    const isSearchInIngredients = recipe.ingredients.filter((element) =>
      element.ingredient.toLowerCase().includes(searchString)
    );
    return (
      recipe.name.toLowerCase().includes(searchString) ||
      recipe.description.toLowerCase().includes(searchString) ||
      isSearchInIngredients.length > 0
    );
  });
  recipesOnPage = filteredRecipes;
  displayrecipes(filteredRecipes);
  console.log(recipesOnPage);
}

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  if (searchString.length < 3) return displayrecipes(recipes);

  filteredRecipes(searchString);

  if (recipesOnPage.length === 0) {
    console.log("test");
    const newArcticle = document.createElement("article");
    const newHtml = `<p>Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`;
    newArcticle.innerHTML = newHtml;
    recipesList.appendChild(newArcticle);
  }
  // remplacer filter par some pour la V2
});

function init() {
  // const res = recipes;
  // dataArray = orderList(res);
  displayrecipes(recipes);
}

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

init();
