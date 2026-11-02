import { Link } from "react-router-dom";

function Favorites() {
  return (
    <main className="favorites-page">

      <div className="open-magazine favorites-magazine">

        {/* Vasemman sivun sisältö */}
        <section className="magazine-left favorites-left">

          <p className="favorites-label">
            FAVORITES
          </p>

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


        {/* Oikean sivun sisältö */}
        <section className="magazine-right favorites-right">

          <div className="favorites-right-center">

            <p className="favorites-welcome">
              YOUR SAVED RECIPES
            </p>

            <h2 className="favorites-heading">
              A little collection of inspiration
            </h2>

            <div className="favorites-empty">
              <p>
                Your collection is waiting
                to be filled.
              </p>
            </div>

          </div>

          {/* Navigaatio */}
          <nav className="favorites-navigation">
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