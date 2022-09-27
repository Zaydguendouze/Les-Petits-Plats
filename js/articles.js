// displayRecipe dans un tableau pour afficher les recettes
export let displayRecipe = [];

// console.log(displayRecipe);

// Afficher les recettes dans un article
export const article = () => {
  // Constante pour afficher l'article dans le main
  const main = document.querySelector("main");
  displayRecipe[0].forEach((recipe) => {
    // console.log(recipe);
    // Pour chaque recette créer un article
    const newArticle = document.createElement("article");

    // Affichage de l'article selon la maquette dans le DOM
    const newHtml = `
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
    `;
    // Ajout des recettes
    newArticle.innerHTML = newHtml;
    main.appendChild(newArticle);
  });
};
