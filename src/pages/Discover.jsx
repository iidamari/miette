import { Link } from "react-router-dom";
function Discover() {
  return (
    <main className="discover-page">

      <div className="open-magazine discover-magazine">

        {/* Vasemman sivun sisältö */}
        <section className="magazine-left discover-left">

         

          <div className="discover-left-center">

            <h1 className="discover-title">
              Food cultures
            </h1>

            <p className="discover-description">
              Choose a food culture and find inspiration for your next meal
            </p>



           

            <nav className="culture-navigation">
              <button>Italian</button>
              <button>Greek</button>
              <button>French</button>
              <button>Mexican</button>
            </nav>

          </div>

          <p className="magazine-page-number">03</p>

        </section>


      {/* Oikean sivun sisältö */}
<section className="magazine-right discover-right">

  <div className="discover-right-center">

    <p className="discover-welcome">
      A WORLD OF FLAVORS
    </p>

    <h2 className="discover-recipe-title">
      Discover something delicious
    </h2>

  

    <div className="recipe-placeholder">
      <p>Recipes will appear here</p>
    </div>

  </div>

  {/* Sivunavigaatio */}
  <nav className="discover-navigation">
    <Link to="/">HOME</Link>
    <Link to="/discover" className="active">DISCOVER</Link>
    <Link to="/favorites">FAVORITES</Link>
  </nav>

  <p className="magazine-page-number">04</p>

</section>

      </div>

    </main>
  );
}

export default Discover;