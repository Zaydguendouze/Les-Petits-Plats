import { displayRecipe, article } from "./articles.js";
import { recipes } from "../data/recipes.js";

// Constante pour l'affichage des recettes
const index = () => {
  displayRecipe[0] = recipes;
  // Affichage des résultats
  article();
};

// Lancement du programme a la fin du chargement
const body = document.querySelector("body");
body.onload = index;
