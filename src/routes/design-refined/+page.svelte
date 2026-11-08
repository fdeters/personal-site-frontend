<script>
  import portrait from '#lib/assets/images/tokyo-drama.jpg';
  import topics from '#lib/data/topics.json';

  const { webdev, music } = topics.topics;
</script>

<svelte:head>
  <title>Forrest Deters – Refined design preview</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="preview">
  <aside class="preview-notice" aria-label="Preview information">
    <span>Refined design preview</span>
    <a href="/design-previews">Compare the original directions ↗</a>
  </aside>

  <div class="site">
    <header class="site-header">
      <a class="brand" href="/">Forrest Deters<span>.</span></a>
      <nav aria-label="Site sections">
        <a href="#web-development">Web development</a>
        <a href="#music">Music</a>
        <a href="#tools">Tools</a>
      </nav>
    </header>

    <main>
      <section class="intro" aria-labelledby="intro-heading">
        <div class="intro-copy">
          <p class="location">Portland, Oregon</p>
          <h1 id="intro-heading">Hi, I'm Forrest.</h1>
          <p class="intro-text">
            I'm a web developer and vocal musician. I like pop funk, soccer, and
            games.
          </p>
          <p class="intro-detail">
            Here you'll find my work, music, and tools for anyone to use.
          </p>
        </div>
        <div class="portrait">
          <img src={portrait} alt="Forrest in front of a temple in Tokyo" />
        </div>
      </section>

      <div class="sections">
        <section class="content-section" id="web-development">
          <div class="section-title">
            <span class="section-number">01</span>
            <h2>Web development</h2>
          </div>
          <div class="section-body">
            <p>
              I make web applications for the Data Resource Center at
              <a class="inline-link" href="https://oregonmetro.gov">Metro</a>,
              Portland's regional government.
            </p>
            <div class="links">
              <a href={webdev.links.github.url}
                >Find me on GitHub <span>↗</span></a
              >
              <a href={webdev.links.metromap.url}
                >Explore MetroMap <span>↗</span></a
              >
            </div>
          </div>
        </section>

        <section class="content-section" id="music">
          <div class="section-title">
            <span class="section-number">02</span>
            <h2>Music</h2>
          </div>
          <div class="section-body">
            <p>
              I perform and arrange vocal music for fun and semi-professionally.
            </p>
            <div class="links">
              <a href={music.links.sheetmusicplus.url}
                >Browse my sheet music <span>↗</span></a
              >
              <a href={music.links.pocket_youtube.url}
                >Watch Pocket on YouTube <span>↗</span></a
              >
              <a href={music.links.pocket_insta.url}
                >Follow Pocket on Instagram <span>↗</span></a
              >
            </div>
          </div>
        </section>

        <section class="content-section tools-section" id="tools">
          <div class="section-title">
            <span class="section-number">03</span>
            <h2>Tools</h2>
          </div>
          <div class="section-body">
            <p>Tools I've made for people to use.</p>
            <a class="tool-link" href="/tools/ranked-choice">
              <span>
                <strong>Ranked-choice voting</strong>
                <small>Rank options and find a winner together.</small>
              </span>
              <span class="tool-arrow" aria-hidden="true">↗</span>
            </a>
            <a class="all-tools" href="/tools">See all tools ↗</a>
          </div>
        </section>
      </div>
    </main>

    <footer>
      <span>Forrest Deters</span>
      <span>Portland, Oregon</span>
      <a href="#intro-heading">Back to top ↑</a>
    </footer>
  </div>
</div>

<style>
  .preview {
    margin: -1rem;
    color: #242323;
    background: #f8f5ed;
    font-family: system-ui, sans-serif;
  }
  .preview a {
    text-decoration: none;
  }
  .preview a:hover {
    text-decoration: underline;
  }
  .preview a:focus-visible {
    outline: 3px solid #ae3928;
    outline-offset: 4px;
  }
  .preview-notice {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 24px;
    padding: 11px 20px;
    background: #242323;
    color: #fff;
    font-size: 12px;
    font-weight: 650;
  }
  .preview-notice a {
    color: #f5d399;
  }
  .site {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 6%;
  }
  .site-header {
    min-height: 88px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 25px;
    border-bottom: 2px solid #242323;
  }
  .brand {
    white-space: nowrap;
    font-size: 23px;
    font-weight: 850;
    letter-spacing: -0.06em;
  }
  .brand span {
    color: #b83f2b;
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 30px;
    font-size: 13px;
    font-weight: 700;
  }
  .intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(230px, 360px);
    gap: 12%;
    align-items: center;
    padding: 80px 0 90px;
  }
  .location {
    color: #99402e;
    font-size: 13px;
    font-weight: 750;
  }
  h1 {
    margin: 19px 0 25px;
    font-size: clamp(52px, 7.5vw, 100px);
    line-height: 0.98;
    font-weight: 850;
    letter-spacing: -0.075em;
  }
  .intro-text {
    max-width: 550px;
    font-size: clamp(20px, 2.3vw, 27px);
    font-weight: 550;
    line-height: 1.4;
    letter-spacing: -0.025em;
  }
  .intro-detail {
    max-width: 500px;
    margin-top: 20px;
    color: #56534e;
    font-size: 16px;
    line-height: 1.65;
  }
  .portrait {
    padding: 10px;
    background: #e6bb65;
    border: 2px solid #242323;
    box-shadow: 9px 9px 0 #242323;
  }
  .portrait img {
    display: block;
    width: 100%;
    height: 340px;
    object-fit: cover;
    object-position: center 35%;
  }
  .sections {
    border-top: 2px solid #242323;
  }
  .content-section {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 6%;
    padding: 46px 0 52px;
    border-bottom: 1px solid #bdb8ae;
    scroll-margin-top: 24px;
  }
  .section-title {
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  .section-number {
    color: #a63e2c;
    font-size: 12px;
    font-weight: 800;
  }
  h2 {
    font-size: clamp(30px, 3.2vw, 43px);
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.05em;
  }
  .section-body > p {
    max-width: 570px;
    color: #4e4b46;
    font-size: 16px;
    line-height: 1.65;
  }
  .inline-link {
    color: #242323;
    text-decoration: underline !important;
    text-underline-offset: 3px;
  }
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
  }
  .links a {
    display: inline-flex;
    align-items: center;
    gap: 18px;
    padding: 11px 13px;
    border: 1px solid #a9a49a;
    background: #fffdf8;
    font-size: 13px;
    font-weight: 700;
  }
  .links a span {
    color: #a63e2c;
  }
  .tool-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-top: 22px;
    padding: 21px 23px;
    border: 2px solid #242323;
    background: #f0cf88;
  }
  .tool-link strong,
  .tool-link small {
    display: block;
  }
  .tool-link strong {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  .tool-link small {
    margin-top: 5px;
    color: #51432d;
    font-size: 13px;
  }
  .tool-arrow {
    font-size: 25px;
  }
  .all-tools {
    display: inline-block;
    margin-top: 19px;
    font-size: 13px;
    font-weight: 750;
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 24px;
    justify-content: space-between;
    padding: 27px 0 35px;
    color: #56534e;
    font-size: 12px;
    font-weight: 650;
  }
  footer a {
    color: #242323;
  }
  @media (max-width: 700px) {
    .site-header {
      align-items: flex-start;
      flex-direction: column;
      gap: 15px;
      padding: 20px 0;
    }
    nav {
      gap: 10px 20px;
    }
    .intro {
      grid-template-columns: 1fr;
      gap: 30px;
      padding: 55px 0 65px;
    }
    .portrait {
      max-width: 320px;
      margin-right: 10px;
    }
    .portrait img {
      height: 285px;
    }
    .content-section {
      grid-template-columns: 1fr;
      gap: 22px;
      padding: 35px 0 40px;
    }
    .section-title {
      gap: 15px;
    }
  }
</style>
