
function Home() {
  return (
    <main className="home-page">
      <div className="open-magazine">

        {/* Vasemman sivun sisältö */}
        <section className="magazine-left">
          <p className="magazine-edition">
        
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

    <p className="welcome-text">
      WELCOME TO MIETTE
    </p>

    <p className="hero-title">
      explore recipes and discover new food cultures
    </p>

    <nav className="home-navigation">
      <a href="/discover">DISCOVER</a>
      <a href="/favorites">FAVORITES</a>
    </nav>

  </div>

  <p className="magazine-page-number">02</p>

</section>

      </div>
    </main>
  );
}

export default Home;