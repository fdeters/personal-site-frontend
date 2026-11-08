<script>
  import portrait from '#lib/assets/images/tokyo-drama.jpg';
  import topics from '#lib/data/topics.json';
  import '#lib/styles/in-page-navigation.css';
  import { inPageNavigation } from '#lib/in-page-navigation.js';

  const { webdev, music } = topics.topics;
  export let preview = false;
</script>

<div class="preview jump-navigation" use:inPageNavigation>
  {#if preview}
    <aside class="preview-notice" aria-label="Preview information">
      <span>Refined design preview</span>
      <a href="/design-previews">Compare the original directions ↗</a>
    </aside>
  {/if}

  <div class="site">
    <header class="site-header">
      <a class="skip-link" href="#main-content">Skip to content</a>
      <a class="brand" href="/">Forrest Deters<span>.</span></a>
      <nav aria-label="Site sections">
        <a href="#web-development">Web development</a>
        <a href="#music">Music</a>
        <a href="#tools">Tools</a>
      </nav>
    </header>

    <main class="jump-target" id="main-content" tabindex="-1">
      <section
        class="intro jump-target"
        id="about"
        aria-labelledby="intro-heading"
        tabindex="-1"
      >
        <div class="intro-copy">
          <h1 id="intro-heading">Hi, I'm <span>Forrest.</span></h1>
          <p class="intro-text">
            I'm a web developer and vocal musician in Portland, Oregon. I like
            pop funk, soccer, and games.
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
        <section
          class="content-section jump-target"
          id="web-development"
          aria-labelledby="web-heading"
          tabindex="-1"
        >
          <div class="section-title">
            <h2 id="web-heading">Web development</h2>
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

        <section
          class="content-section jump-target"
          id="music"
          aria-labelledby="music-heading"
          tabindex="-1"
        >
          <div class="section-title">
            <h2 id="music-heading">Music</h2>
          </div>
          <div class="section-body">
            <p>
              I perform and arrange vocal music for fun and semi-professionally.
              I'm a founder of Pocket, a Portland-based six-piece a cappella
              group.
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

        <section
          class="content-section jump-target"
          id="tools"
          aria-labelledby="tools-heading"
          tabindex="-1"
        >
          <div class="section-title">
            <h2 id="tools-heading">Tools</h2>
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
      <a href="https://www.instagram.com/doctypeforrest"
        >Find me on Instagram ↗</a
      >
      <a href="#about">Back to top ↑</a>
    </footer>
  </div>
</div>

<style>
  .preview {
    color: var(--site-text);
    background: var(--site-bg);
    font-family: system-ui, sans-serif;
  }
  :where(.preview a) {
    text-decoration: none;
  }
  .preview a:hover {
    text-decoration: underline;
  }
  .preview a:focus-visible {
    outline: 3px solid currentColor;
    outline-offset: 4px;
  }
  .preview a:active {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
  .skip-link {
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 1;
    transform: translateY(-200%);
    padding: 12px 16px;
    background: var(--site-text);
    color: var(--site-bg);
  }
  .skip-link:focus {
    transform: none;
  }
  .preview-notice {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px 24px;
    padding: 11px 20px;
    background: var(--notice-bg);
    color: #fff;
    font-size: 12px;
    font-weight: 650;
  }
  .preview-notice a {
    color: #f5d399;
  }
  .preview-notice a,
  nav a,
  .all-tools,
  footer a {
    text-decoration: underline;
    text-underline-offset: 3px;
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
    border-bottom: 2px solid var(--site-text);
  }
  .brand {
    white-space: nowrap;
    font-size: 23px;
    font-weight: 850;
    letter-spacing: -0.06em;
  }
  .brand span {
    color: var(--site-accent);
  }
  nav {
    display: flex;
    flex-wrap: wrap;
    gap: 12px 30px;
    font-size: 16px;
    font-weight: 700;
  }
  nav a {
    padding: 10px 0;
  }
  nav a:hover,
  nav a:focus-visible,
  .all-tools:hover,
  .all-tools:focus-visible,
  footer a:hover,
  footer a:focus-visible {
    color: var(--site-accent);
  }
  .intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(230px, 360px);
    gap: 12%;
    align-items: center;
    padding: 80px 0 90px;
  }
  h1 {
    margin: 0 0 25px;
    font-size: clamp(52px, 7.5vw, 100px);
    line-height: 0.98;
    font-weight: 850;
    letter-spacing: -0.075em;
  }
  h1 span {
    color: var(--site-accent);
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
    color: var(--site-muted);
    font-size: 16px;
    line-height: 1.65;
  }
  .portrait {
    padding: 10px;
    background: #e6bb65;
    border: 2px solid var(--site-text);
    box-shadow: 9px 9px 0 var(--site-text);
  }
  .portrait img {
    display: block;
    width: 100%;
    height: 340px;
    object-fit: cover;
    object-position: center 35%;
  }
  .sections {
    border-top: 2px solid var(--site-text);
  }
  .content-section {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 6%;
    padding: 46px 0 52px;
    border-bottom: 1px solid var(--site-border);
  }
  .section-title {
    align-self: start;
  }
  h2 {
    display: inline;
    font-size: clamp(30px, 3.2vw, 43px);
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -0.05em;
    text-decoration: underline;
    text-decoration-color: var(--site-accent);
    text-decoration-thickness: 4px;
    text-underline-offset: 0.18em;
    text-decoration-skip-ink: none;
  }
  .section-body > p {
    max-width: 570px;
    color: var(--site-muted);
    font-size: 16px;
    line-height: 1.65;
  }
  .inline-link {
    color: var(--site-accent);
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 3px;
    font-weight: 700;
  }
  .inline-link:hover,
  .inline-link:focus-visible {
    color: var(--link-hover-text);
    background: var(--link-hover-bg);
  }
  .inline-link:active {
    color: var(--site-bg);
    background: var(--site-text);
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
    border: 1px solid var(--site-border);
    background: var(--site-surface);
    font-size: 16px;
    font-weight: 700;
  }
  .links a span {
    color: var(--site-accent);
  }
  .links a:hover,
  .links a:focus-visible {
    background: var(--link-hover-bg);
    border-color: var(--site-text);
  }
  .links a:active {
    background: var(--site-text);
    color: var(--site-bg);
  }
  .links a:active span {
    color: inherit;
  }
  .tool-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-top: 22px;
    padding: 21px 23px;
    border: 2px solid var(--site-text);
    background: var(--tool-card-bg);
    color: var(--tool-card-text);
  }
  .tool-link strong,
  .tool-link small {
    display: block;
  }
  .tool-link:hover,
  .tool-link:focus-visible {
    background: var(--tool-card-hover);
  }
  .tool-link:active {
    box-shadow: inset 0 0 0 3px var(--tool-card-text);
  }
  .tool-link strong {
    font-size: 18px;
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  .tool-link small {
    margin-top: 5px;
    color: var(--tool-card-text);
    font-size: 16px;
  }
  .tool-arrow {
    font-size: 25px;
  }
  .all-tools {
    display: inline-block;
    margin-top: 19px;
    font-size: 16px;
    font-weight: 750;
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 24px;
    justify-content: space-between;
    padding: 27px 0 35px;
    color: var(--site-muted);
    font-size: 16px;
    font-weight: 650;
  }
  footer a {
    color: var(--site-text);
  }
  nav a:active,
  .all-tools:active,
  footer a:active {
    color: var(--site-bg);
    background: var(--site-text);
  }
  :global([data-theme='dark']) .brand {
    letter-spacing: -0.025em;
  }
  :global([data-theme='dark']) h1 {
    letter-spacing: -0.035em;
    line-height: 1.1;
  }
  :global([data-theme='dark']) h2 {
    letter-spacing: -0.025em;
    line-height: 1.25;
  }
  :global([data-theme='dark']) .intro-text {
    letter-spacing: 0;
    line-height: 1.55;
  }
  :global([data-theme='dark']) .tool-link strong {
    letter-spacing: 0;
  }
  :global([data-theme='dark']) .portrait {
    border-color: var(--tool-frame);
    box-shadow: 9px 9px 0 var(--tool-shadow);
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
  }
</style>
