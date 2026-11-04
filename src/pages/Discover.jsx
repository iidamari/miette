

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

function Discover() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState(getSavedFavorites);

  async function fetchRecipes(culture, apiName) {
    setSelectedCulture(culture);
    setSelectedRecipe(null);
    setLoading(true);
    setError("");
    setRecipes([]);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${apiName}`
      );

      if (!response.ok) throw new Error();

      const data = await response.json();

      if (!data.meals || data.meals.length === 0) {
        setError(`No ${culture} recipes were found.`);
        return;
      }

      setRecipes(data.meals);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function openRecipe(id) {
    setDetailsLoading(true);
    setError("");
    setSelectedRecipe(null);

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (!response.ok) throw new Error();

      const data = await response.json();

      if (!data.meals || data.meals.length === 0) {
        throw new Error();
      }

      setSelectedRecipe(data.meals[0]);
    } catch (error) {
      console.error(error);
      setError("Recipe details could not be loaded.");
    } finally {
      setDetailsLoading(false);
    }
  }

  function toggleFavorite(recipe) {
    const alreadySaved = favorites.some(
      (favorite) => favorite.idMeal === recipe.idMeal
    );

    const updatedFavorites = alreadySaved
      ? favorites.filter(
          (favorite) => favorite.idMeal !== recipe.idMeal
        )
      : [...favorites, recipe];

    setFavorites(updatedFavorites);

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );
  }

  function isFavorite(id) {
    return favorites.some(
      (favorite) => favorite.idMeal === id
    );
  }

  function backToRecipes() {
    setSelectedRecipe(null);
    setError("");
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
    <main className="discover-page">
      <div className="open-magazine discover-magazine">

        {/* VASEN SIVU */}
        <section className="magazine-left discover-left">

          <p className="discover-label">DISCOVER</p>

          <div className="discover-left-center">

            <h1 className="discover-title">
              Food cultures
            </h1>

            <p className="discover-description">
              Choose a food culture and find inspiration for your next meal
            </p>

            <nav className="culture-navigation">
              {[
                { name: "Italian", apiName: "Italian" },
                { name: "Greek", apiName: "Greek" },
                { name: "French", apiName: "France" },
                { name: "Mexican", apiName: "Mexican" }
              ].map((culture) => (
                <button
                  key={culture.name}
                  className={
                    selectedCulture === culture.name ? "active" : ""
                  }
                  onClick={() =>
                    fetchRecipes(culture.name, culture.apiName)
                  }
                  aria-pressed={selectedCulture === culture.name}
                >
                  {culture.name}

                  {selectedCulture === culture.name && (
                    <span className="culture-dot">•</span>
                  )}
                </button>
              ))}
            </nav>

          </div>

          <p className="magazine-page-number">03</p>
        </section>

        {/* OIKEA SIVU */}
        <section className="magazine-right discover-right">

          <div className="discover-right-center">

            {selectedRecipe ? (

              /* YKSITTÄISEN RESEPTIN TIEDOT */
              <div className="recipe-details">

                {/* YLÄRIVI */}
                <div className="recipe-top-actions">

                  <button
                    className="recipe-back-button"
                    onClick={backToRecipes}
                    aria-label="Back to recipes"
                  >
                    <ArrowLeft size={18} />
                    <span>BACK TO RECIPES</span>
                  </button>

                  <div className="favorite-action">

                    <button
                      className="recipe-favorite-button"
                      onClick={() => toggleFavorite(selectedRecipe)}
                      aria-label={
                        isFavorite(selectedRecipe.idMeal)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      aria-pressed={isFavorite(selectedRecipe.idMeal)}
                    >
                      <Heart
                        size={22}
                        fill={
                          isFavorite(selectedRecipe.idMeal)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <p className="favorite-hint">
                      Tap the heart to save this recipe
                    </p>

                  </div>
                </div>

                {/* RESEPTIN TIEDOT */}
                <p className="recipe-cuisine-label">
                  {selectedRecipe.strArea === "France"
                    ? "FRENCH CUISINE"
                    : `${selectedRecipe.strArea?.toUpperCase()} CUISINE`}
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
                    {getIngredients(selectedRecipe).map((item, index) => (
                      <li key={index}>
                        <span>{item.ingredient}</span>
                        <span>{item.measure}</span>
                      </li>
                    ))}
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

              /* RESEPTIVALIKKO */
              <>
                <p className="discover-welcome">
                  A WORLD OF FLAVORS
                </p>

                <h2 className="discover-recipe-title">
                  {selectedCulture
                    ? `${selectedCulture} recipes`
                    : "Discover something delicious"}
                </h2>

                {loading && <p>Loading recipes...</p>}

                {detailsLoading && (
                  <p>Loading recipe details...</p>
                )}

                {error && <p role="alert">{error}</p>}

                {!loading &&
                  !detailsLoading &&
                  !error &&
                  recipes.length > 0 && (
                    <div className="row row-cols-1 row-cols-sm-2 g-3 recipe-grid">
  {recipes.map((recipe) => (
    <div className="col" key={recipe.idMeal}>
      <button
        className="recipe-card"
        onClick={() => openRecipe(recipe.idMeal)}
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
    </div>
  ))}
</div>
                  )}

                {!selectedCulture && !loading && (
                  <div className="recipe-placeholder">
                    <p>
                      Choose a food culture to discover recipes
                    </p>
                  </div>
                )}

                {!loading &&
                  selectedCulture &&
                  recipes.length === 0 &&
                  !error && (
                    <p>No recipes found.</p>
                  )}
              </>
            )}

          </div>

          {/* SIVUNAVIGOINTI */}
          <nav className="discover-navigation">
            <Link to="/">HOME</Link>
            <Link to="/discover" className="active">
              DISCOVER
            </Link>
            <Link to="/favorites">FAVORITES</Link>
          </nav>

          <p className="magazine-page-number">04</p>

        </section>
      </div>
    </main>
  );
}

export default Discover;