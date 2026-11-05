import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";

const FAVORITES_KEY = "miette-favorites";

function getSavedFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  } catch {
    return [];
  }
}

function Favorites() {
  const [favorites, setFavorites] = useState(getSavedFavorites);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  function toggleFavorite(recipe) {
    const updatedFavorites = favorites.filter(
      (favorite) => favorite.idMeal !== recipe.idMeal
    );

    setFavorites(updatedFavorites);

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    setSelectedRecipe(null);
  }

  function backToFavorites() {
    setSelectedRecipe(null);
  }

  function getIngredients(recipe) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }

    return ingredients;
  }

  return (
    <main className="favorites-page">
      <div className="open-magazine favorites-magazine">

        {/* VASEN SIVU */}
        <section className="magazine-left favorites-left">

          <p className="favorites-label">FAVORITES</p>

          <div className="favorites-left-center">
            <h1 className="favorites-title">
              Your Favorites
            </h1>

            <p className="favorites-subtitle">
              A collection of recipes you love
            </p>
          </div>

          <p className="magazine-page-number">05</p>
        </section>

        {/* OIKEA SIVU */}
        <section className="magazine-right favorites-right">

          <div className="favorites-right-center">

            {selectedRecipe ? (
              /* RESEPTINÄKYMÄ */
              <div className="recipe-details">

                <div className="recipe-top-actions">

                  <button
                    className="recipe-back-button"
                    onClick={backToFavorites}
                  >
                    <ArrowLeft size={18} />
                    <span>BACK TO FAVORITES</span>
                  </button>

                  <div className="favorite-action">
                    <button
                      className="recipe-favorite-button"
                      onClick={() => toggleFavorite(selectedRecipe)}
                      aria-label="Remove from favorites"
                      aria-pressed="true"
                    >
                      <Heart size={22} fill="currentColor" />
                    </button>

                    <p className="favorite-hint">
                      Remove from favorites
                    </p>
                  </div>

                </div>

                <p className="recipe-cuisine-label">
                  {selectedRecipe.strArea?.toUpperCase()} CUISINE
                </p>

                <h2 className="discover-recipe-title">
                  {selectedRecipe.strMeal}
                </h2>

                <img
                  className="recipe-detail-image"
                  src={selectedRecipe.strMealThumb}
                  alt={selectedRecipe.strMeal}
                />

                <div className="recipe-information">

                  <h3>Ingredients</h3>

                  <ul className="ingredient-list">
                    {getIngredients(selectedRecipe).map(
                      (item, index) => (
                        <li key={index}>
                          <span>{item.ingredient}</span>
                          <span>{item.measure}</span>
                        </li>
                      )
                    )}
                  </ul>

                  <h3>Instructions</h3>

                  <p className="recipe-instructions">
                    {selectedRecipe.strInstructions}
                  </p>

                  {selectedRecipe.strSource && (
                    <a
                      className="recipe-source"
                      href={selectedRecipe.strSource}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Original recipe →
                    </a>
                  )}

                </div>
              </div>

            ) : (
              /* SUOSIKKILISTA */
              <>
                <p className="favorites-welcome">
                  YOUR SAVED RECIPES
                </p>

                <h2 className="favorites-heading">
                  A little collection of inspiration
                </h2>

                {favorites.length === 0 ? (
                  <div className="favorites-empty">
                    <p>
                      Your collection is waiting
                      to be filled.
                    </p>
                  </div>
                ) : (
                  <div className="favorites-grid">

                    {favorites.map((recipe) => (
                      <button
                        className="favorite-card"
                        key={recipe.idMeal}
                        onClick={() => setSelectedRecipe(recipe)}
                      >
                        <img
                          src={recipe.strMealThumb}
                          alt={recipe.strMeal}
                        />

                        <h3>{recipe.strMeal}</h3>

                        <span className="recipe-card-link">
                          VIEW RECIPE →
                        </span>
                      </button>
                    ))}

                  </div>
                )}
              </>
            )}

          </div>

          {/* NAVIGOINTI */}
          <nav className="favorites-navigation"
          aria-label="Main navigation">
            <Link to="/">HOME</Link>
            <Link to="/discover">DISCOVER</Link>
            <Link to="/favorites" className="active">
              FAVORITES
            </Link>
          </nav>

          <p className="magazine-page-number">06</p>

        </section>
      </div>
    </main>
  );
}

export default Favorites;