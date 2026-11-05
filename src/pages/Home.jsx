import { Link } from "react-router-dom";
function Home() {
  return (
    <main className="home-page">
      <div className="open-magazine">

        {/* Vasemman sivun sisältö */}
        <section className="magazine-left">
            <p className="magazine-edition">
            HOME
            </p>

        
          <div className="left-center">
            <h1 className="miette-logo">Miette</h1>
             

            <p className="miette-subtitle">
              a little inspiration for your next meal
            </p>
             
          </div>

          <p className="magazine-page-number">01</p>
        </section>

       {/* Oikean sivun sisältö */}
<section className="magazine-right">

  <div className="right-center">

  <div className="home-text-content">
    <p className="welcome-text">
      WELCOME TO MIETTE
    </p>

    <p className="hero-title">
      explore recipes and discover new food cultures
    </p>
  </div>

  <nav className="home-navigation">
  <Link to="/discover">DISCOVER</Link>
  <Link to="/favorites">FAVORITES</Link>
</nav>

</div>

  <p className="magazine-page-number">02</p>

</section>

      </div>
    </main>
  );
}

export default Home;