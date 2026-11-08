<script>
  import portrait from '#lib/assets/images/tokyo-drama.jpg';
  import topics from '#lib/data/topics.json';

  const directions = [
    {
      name: 'The Personal Index',
      description: 'Editorial, warm, and confident',
    },
    {
      name: 'The Creative Studio',
      description: 'Expressive, bold, and playful',
    },
    { name: 'The Field Notes', description: 'Human, quiet, and considered' },
    {
      name: 'The Digital Commons',
      description: 'Useful, clear, and welcoming',
    },
  ];

  let selected = 0;
  const web = topics.topics.webdev.links;
  const music = topics.topics.music.links;
</script>

<svelte:head>
  <title>Design directions – Forrest Deters</title>
  <meta
    name="description"
    content="Four possible design directions for Forrest Deters' personal site."
  />
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="comparison">
  <section class="comparison-inner" aria-label="Design comparison">
    <div>
      <p class="comparison-label">DESIGN EXPLORATION / 01—04</p>
      <h1>Four directions, one site.</h1>
      <p>
        Choose a concept to explore. These are homepage previews; links to the
        existing tools are real.
      </p>
    </div>
    <div class="selector" aria-label="Choose a design direction">
      {#each directions as direction, i}
        <button
          type="button"
          class:active={selected === i}
          aria-pressed={selected === i}
          onclick={() => (selected = i)}
        >
          <span>0{i + 1}</span>
          <strong>{direction.name}</strong>
          <small>{direction.description}</small>
        </button>
      {/each}
    </div>
  </section>

  {#if selected === 0}
    <div class="concept index">
      <div class="index-wrap">
        <header class="index-nav">
          <a class="index-brand" href="/"
            >FORREST DETERS<span> / PORTLAND, OR</span></a
          >
          <nav aria-label="Personal Index navigation">
            <a href="#index-work">Work</a><a href="#index-music">Music</a><a
              href="/tools">Tools ↗</a
            >
          </nav>
        </header>
        <main>
          <div class="index-hero">
            <div class="index-intro">
              <p class="eyebrow">
                A PERSONAL SITE &nbsp; / &nbsp; EST. IN CURIOSITY
              </p>
              <h2>Making things<br />that <em>connect.</em></h2>
              <p class="index-lede">
                I'm Forrest, a web developer and vocal musician in Portland,
                Oregon. This is a little home for my work, music, and useful
                things.
              </p>
              <a class="index-button" href="#index-explore"
                >Take a look <span>↘</span></a
              >
            </div>
            <div class="index-portrait">
              <img src={portrait} alt="Forrest in front of a temple in Tokyo" />
              <p>FORREST DETERS <span>PORTLAND, OREGON ↗</span></p>
            </div>
          </div>
          <div class="index-section-title" id="index-explore">
            <span>THE INDEX</span><span
              >THINGS I MAKE & SHARE &nbsp; / &nbsp; 01—03</span
            >
          </div>
          <div class="index-grid">
            <section id="index-work">
              <span class="index-number">01 / WORK</span>
              <h3>Building for<br />the web.</h3>
              <p>
                I make web applications for the Data Resource Center at Metro,
                Portland's regional government.
              </p>
              <a href={web.github.url}>Find me on GitHub ↗</a>
            </section>
            <section id="index-music">
              <span class="index-number">02 / MUSIC</span>
              <h3>Making room<br />for music.</h3>
              <p>
                I perform and arrange vocal music, from a cappella to sheet
                music.
              </p>
              <a href={music.sheetmusicplus.url}>Explore my arrangements ↗</a>
            </section>
            <section class="index-tool">
              <span class="index-number">03 / TOOLS</span>
              <h3>Useful things,<br />for everyone.</h3>
              <p>
                Have a decision to make? Give everyone a say with ranked-choice
                voting.
              </p>
              <a href="/tools/ranked-choice">Try ranked choice ↗</a>
            </section>
          </div>
        </main>
        <footer class="index-footer">
          <span>© FORREST DETERS</span><span>MADE IN PORTLAND, OREGON</span><a
            href="/tools">ALL TOOLS ↗</a
          >
        </footer>
      </div>
    </div>
  {:else if selected === 1}
    <div class="concept studio">
      <div class="studio-wrap">
        <header class="studio-nav">
          <a class="studio-logo" href="/">forrest<span>.</span></a>
          <nav aria-label="Creative Studio navigation">
            <a href="#studio-about">About</a><a href="#studio-projects"
              >Projects</a
            ><a class="studio-nav-pill" href="/tools">Tools ↗</a>
          </nav>
        </header>
        <main>
          <div class="studio-hero" id="studio-about">
            <div>
              <p class="studio-tag">HELLO FROM PORTLAND ✳</p>
              <h2>
                Web stuff.<br />Music stuff.<br /><span>Good stuff.</span>
              </h2>
              <p class="studio-lede">
                I'm Forrest. I build for the web, make vocal music, and like
                creating things people can actually use.
              </p>
              <a class="studio-button" href="#studio-projects"
                >COME EXPLORE <span>↘</span></a
              >
            </div>
            <div class="studio-image">
              <img
                src={portrait}
                alt="Forrest in front of a temple in Tokyo"
              /><span class="studio-sticker"
                >A LITTLE<br />BIT OF<br />EVERYTHING ✳</span
              >
            </div>
          </div>
          <div class="studio-ticker" aria-hidden="true">
            DEVELOPER ✳ MUSICIAN ✳ CURIOUS HUMAN ✳ DEVELOPER ✳ MUSICIAN ✳
          </div>
          <div class="studio-project-heading" id="studio-projects">
            <p>THE GOOD STUFF / 01—03</p>
            <h3>A few things<br /><em>worth sharing.</em></h3>
          </div>
          <div class="studio-grid">
            <section class="studio-card studio-yellow">
              <span>01 / WEB DEVELOPMENT</span>
              <h4>Built for<br />real life.</h4>
              <p>
                Web applications for Metro's Data Resource Center, and other
                things I've made along the way.
              </p>
              <a href={web.github.url}>GitHub ↗</a>
            </section>
            <section class="studio-card studio-pink">
              <span>02 / MUSIC</span>
              <h4>Let's make<br />some noise.</h4>
              <p>Vocal music, a cappella, and arrangements made to be sung.</p>
              <a href={music.pocket_youtube.url}>Listen to Pocket ↗</a>
            </section>
            <section class="studio-card studio-blue">
              <span>03 / TOOLS FOR EVERYONE</span>
              <h4>Decisions,<br />made better.</h4>
              <p>
                Rank your options, bring your people, and find a winner
                together.
              </p>
              <a href="/tools/ranked-choice">Try ranked choice ↗</a>
            </section>
          </div>
        </main>
        <footer class="studio-footer">
          <span>FORREST DETERS ✳ PORTLAND, OR</span><a href="/tools"
            >EXPLORE THE TOOLS ↗</a
          >
        </footer>
      </div>
    </div>
  {:else if selected === 2}
    <div class="concept notes">
      <div class="notes-wrap">
        <header class="notes-nav">
          <a class="notes-brand" href="/">Forrest Deters <span>✳</span></a>
          <nav aria-label="Field Notes navigation">
            <a href="#notes-about">About</a><a href="#notes-entries">Explore</a
            ><a href="/tools">Tools ↗</a>
          </nav>
        </header>
        <main>
          <div class="notes-hero" id="notes-about">
            <div class="notes-intro">
              <p class="notes-kicker">A LITTLE CORNER OF THE INTERNET</p>
              <h2>Hello, I'm<br /><em>Forrest.</em></h2>
              <p>
                A web developer and vocal musician based in Portland, Oregon. I
                like pop funk, soccer, games, and making useful things.
              </p>
              <a href="#notes-entries">A little more about what I do &nbsp; ↓</a
              >
            </div>
            <figure>
              <img src={portrait} alt="Forrest in front of a temple in Tokyo" />
              <figcaption>01 / A MOMENT IN TOKYO</figcaption>
            </figure>
          </div>
          <div class="notes-heading" id="notes-entries">
            <span>THE SHORT VERSION</span><span
              >A FEW THINGS YOU'LL FIND HERE</span
            >
          </div>
          <div class="notes-row">
            <span class="notes-index">01</span>
            <div>
              <h3>For the web</h3>
              <p>
                By day, I make web applications for the Data Resource Center at
                Metro, Portland's regional government.
              </p>
            </div>
            <a href={web.github.url}>GitHub ↗</a>
          </div>
          <div class="notes-row">
            <span class="notes-index">02</span>
            <div>
              <h3>For the love of music</h3>
              <p>
                I perform and arrange vocal music for fun and
                semi-professionally.
              </p>
            </div>
            <a href={music.sheetmusicplus.url}>Sheet music ↗</a>
          </div>
          <div class="notes-row">
            <span class="notes-index">03</span>
            <div>
              <h3>For making decisions</h3>
              <p>
                A simple ranked-choice voting tool for figuring things out
                together.
              </p>
            </div>
            <a href="/tools/ranked-choice">Try the tool ↗</a>
          </div>
        </main>
        <footer class="notes-footer">
          <span>Thanks for stopping by.</span><span
            >FORREST DETERS / PORTLAND, OR</span
          ><a href="/tools">ALL TOOLS ↗</a>
        </footer>
      </div>
    </div>
  {:else}
    <div class="concept commons">
      <div class="commons-wrap">
        <header class="commons-nav">
          <a class="commons-brand" href="/"><span>f.</span> Forrest Deters</a>
          <nav aria-label="Digital Commons navigation">
            <a href="#commons-about">About</a><a href="#commons-directory"
              >Explore</a
            ><a class="commons-nav-button" href="/tools">Browse tools ↗</a>
          </nav>
        </header>
        <main>
          <div class="commons-hero" id="commons-about">
            <div>
              <p class="commons-kicker">
                <span></span> HELLO FROM PORTLAND, OREGON
              </p>
              <h2>A personal site.<br /><em>For all kinds of things.</em></h2>
              <p>
                I'm Forrest: web developer, vocal musician, and maker of useful
                little tools. Welcome in.
              </p>
              <div class="commons-actions">
                <a class="commons-primary" href="/tools">Explore the tools ↗</a
                ><a href="#commons-directory">Get to know me ↓</a>
              </div>
            </div>
            <div class="commons-profile">
              <img src={portrait} alt="Forrest in front of a temple in Tokyo" />
              <div>
                <strong>Forrest Deters</strong><span>Developer / Musician</span>
              </div>
              <span class="commons-spark">✳</span>
            </div>
          </div>
          <div class="commons-directory-heading" id="commons-directory">
            <div>
              <p>THE DIRECTORY</p>
              <h3>Find your way around.</h3>
            </div>
            <span>A LITTLE SOMETHING FOR EVERYONE ↓</span>
          </div>
          <div class="commons-grid">
            <section class="commons-feature">
              <div class="commons-icon">↗</div>
              <p class="commons-card-label">FEATURED TOOL</p>
              <h4>Better decisions,<br />together.</h4>
              <p>
                Can't decide where to eat or what to do? Rank your choices and
                find a winner with ranked-choice voting.
              </p>
              <a href="/tools/ranked-choice"
                >Open ranked-choice voting <span>↗</span></a
              >
            </section>
            <section class="commons-card">
              <div class="commons-icon">⌘</div>
              <p class="commons-card-label">WEB DEVELOPMENT</p>
              <h4>Things I build.</h4>
              <p>I make web applications for Metro's Data Resource Center.</p>
              <a href={web.github.url}>Visit GitHub ↗</a>
            </section>
            <section class="commons-card">
              <div class="commons-icon">♫</div>
              <p class="commons-card-label">MUSIC</p>
              <h4>Things I sing.</h4>
              <p>Vocal music and arrangements, made to be shared.</p>
              <a href={music.pocket_insta.url}>Meet Pocket ↗</a>
            </section>
          </div>
        </main>
        <footer class="commons-footer">
          <span>Forrest Deters <small> · Made in Portland</small></span><a
            href="/tools">All tools ↗</a
          >
        </footer>
      </div>
    </div>
  {/if}
</div>

<style>
  .comparison {
    margin: -1rem;
    background: #e8e8e5;
    color: #222;
    font-family: system-ui, sans-serif;
  }
  .comparison-inner {
    max-width: 1440px;
    margin: auto;
    padding: 28px 5% 30px;
  }
  .comparison-label {
    color: #5d5e59;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.16em;
  }
  .comparison h1 {
    margin: 6px 0;
    font-size: 24px;
    font-weight: 750;
    letter-spacing: -0.04em;
  }
  .comparison-inner > div > p:last-child {
    color: #555650;
    font-size: 13px;
  }
  .selector {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 20px;
  }
  .selector button {
    text-align: left;
    background: #f7f7f5;
    border: 1px solid #cbccc7;
    border-radius: 6px;
    padding: 12px 14px;
    cursor: pointer;
    color: #30312e;
  }
  .selector button.active {
    background: #20221f;
    border-color: #20221f;
    color: white;
  }
  .selector button:focus-visible,
  .concept a:focus-visible {
    outline: 3px solid #e95f24;
    outline-offset: 3px;
  }
  .selector button span {
    display: block;
    font-size: 10px;
    opacity: 0.7;
    margin-bottom: 5px;
  }
  .selector button strong,
  .selector button small {
    display: block;
  }
  .selector button strong {
    font-size: 13px;
  }
  .selector button small {
    font-size: 11px;
    opacity: 0.75;
    margin-top: 3px;
  }
  .concept {
    min-height: 800px;
  }
  .concept a {
    text-decoration: none;
  }
  .concept a:hover {
    text-decoration: underline;
  }
  .concept img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .concept nav {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .index {
    background: #f3efe7;
    color: #272a24;
    font-family: Georgia, serif;
  }
  .index-wrap,
  .studio-wrap,
  .notes-wrap,
  .commons-wrap {
    max-width: 1440px;
    margin: auto;
    padding: 0 6%;
  }
  .index-nav,
  .studio-nav,
  .notes-nav,
  .commons-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 84px;
  }
  .index-nav {
    border-bottom: 1px solid #bcbfb4;
    font-family: system-ui, sans-serif;
    font-size: 12px;
  }
  .index-brand {
    font-weight: 800;
    letter-spacing: 0.06em;
  }
  .index-brand span {
    margin-left: 12px;
    font-weight: 500;
    color: #696d62;
    font-size: 10px;
  }
  .index-hero {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 8%;
    align-items: center;
    padding: 78px 0 82px;
  }
  .eyebrow,
  .index-number,
  .index-section-title,
  .index-portrait p,
  .index-footer {
    font-family: system-ui, sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
  }
  .eyebrow {
    color: #7e604c;
    margin-bottom: 26px;
  }
  .index h2 {
    font-size: clamp(52px, 6.8vw, 100px);
    line-height: 0.98;
    letter-spacing: -0.055em;
    font-weight: 400;
  }
  .index h2 em {
    color: #967457;
    font-weight: 400;
  }
  .index-lede {
    max-width: 470px;
    margin: 28px 0;
    color: #575a51;
    font-size: 17px;
    line-height: 1.7;
  }
  .index-button {
    display: inline-flex;
    gap: 55px;
    background: #303b31;
    color: white;
    padding: 15px 19px;
    font:
      600 12px system-ui,
      sans-serif;
  }
  .index-portrait {
    justify-self: end;
    width: min(100%, 400px);
  }
  .index-portrait img {
    height: 390px;
    object-position: center 35%;
  }
  .index-portrait p {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    color: #686b60;
    font-size: 9px;
  }
  .index-section-title,
  .notes-heading {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #8e9486;
    padding: 14px 0 25px;
  }
  .index-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid #c6c8bd;
  }
  .index-grid section {
    padding: 27px 28px 40px 0;
  }
  .index-grid section + section {
    border-left: 1px solid #c6c8bd;
    padding-left: 28px;
  }
  .index-number {
    color: #79604c;
  }
  .index-grid h3 {
    margin: 28px 0 15px;
    font-size: 33px;
    line-height: 1.08;
    letter-spacing: -0.04em;
  }
  .index-grid p {
    max-width: 310px;
    color: #5d6057;
    line-height: 1.6;
    font-size: 14px;
  }
  .index-grid a {
    display: inline-block;
    margin-top: 24px;
    font:
      700 12px system-ui,
      sans-serif;
    border-bottom: 1px solid #82907d;
    padding-bottom: 4px;
  }
  .index-footer,
  .studio-footer,
  .notes-footer,
  .commons-footer {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 25px 0;
    border-top: 1px solid #bcbfb4;
  }
  .studio {
    background: #f5f0e2;
    color: #25222b;
    font-family: system-ui, sans-serif;
  }
  .studio-nav {
    border-bottom: 2px solid #25222b;
    font-size: 13px;
    font-weight: 700;
  }
  .studio-logo {
    font-size: 32px;
    font-weight: 900;
    letter-spacing: -0.08em;
  }
  .studio-logo span {
    color: #e75532;
  }
  .studio-nav-pill {
    border: 2px solid #25222b;
    border-radius: 50px;
    padding: 9px 18px;
  }
  .studio-hero {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    align-items: center;
    gap: 7%;
    padding: 65px 0 75px;
  }
  .studio-tag {
    display: inline-block;
    background: #e9c85d;
    border: 1.5px solid #25222b;
    border-radius: 50px;
    padding: 7px 12px;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.08em;
  }
  .studio h2 {
    margin: 24px 0;
    font-size: clamp(50px, 7vw, 100px);
    line-height: 0.98;
    font-weight: 900;
    letter-spacing: -0.075em;
  }
  .studio h2 span {
    color: #d84a2c;
  }
  .studio-lede {
    max-width: 410px;
    line-height: 1.6;
    font-size: 17px;
  }
  .studio-button {
    display: inline-flex;
    justify-content: space-between;
    gap: 45px;
    margin-top: 26px;
    padding: 16px 20px;
    background: #25222b;
    color: white;
    font-size: 11px;
    font-weight: 800;
  }
  .studio-image {
    position: relative;
    transform: rotate(3deg);
    border: 3px solid #25222b;
    background: #e9c85d;
    padding: 12px 12px 45px;
    box-shadow: 9px 9px 0 #25222b;
  }
  .studio-image img {
    height: 370px;
  }
  .studio-sticker {
    position: absolute;
    right: -25px;
    bottom: -30px;
    display: grid;
    place-items: center;
    width: 110px;
    height: 110px;
    background: #f5a9a0;
    border: 2px solid #25222b;
    border-radius: 50%;
    text-align: center;
    font-size: 10px;
    line-height: 1.3;
    font-weight: 900;
    transform: rotate(-12deg);
  }
  .studio-ticker {
    margin: 0 -6.8%;
    padding: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    background: #25222b;
    color: #f6e8ac;
    font-size: 12px;
    font-weight: 850;
    letter-spacing: 0.16em;
  }
  .studio-project-heading {
    padding: 56px 0 25px;
  }
  .studio-project-heading p,
  .studio-card > span {
    font-size: 10px;
    font-weight: 850;
    letter-spacing: 0.1em;
  }
  .studio-project-heading h3 {
    margin-top: 14px;
    font-size: clamp(36px, 4vw, 56px);
    font-weight: 850;
    line-height: 1;
    letter-spacing: -0.06em;
  }
  .studio-project-heading h3 em {
    font-family: Georgia, serif;
    font-weight: 400;
  }
  .studio-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    padding-bottom: 55px;
  }
  .studio-card {
    min-height: 290px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    border: 2px solid #25222b;
  }
  .studio-yellow {
    background: #f4d36a;
  }
  .studio-pink {
    background: #f5b2ab;
  }
  .studio-blue {
    background: #afc8d8;
  }
  .studio-card h4 {
    margin: 32px 0 12px;
    font-size: 32px;
    font-weight: 850;
    line-height: 1;
    letter-spacing: -0.05em;
  }
  .studio-card p {
    font-size: 14px;
    line-height: 1.5;
  }
  .studio-card a {
    margin-top: auto;
    padding-top: 25px;
    font-size: 12px;
    font-weight: 800;
  }
  .studio-footer {
    border-color: #25222b;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.08em;
  }
  .notes {
    background: #f6f5ef;
    color: #343c35;
    font-family: Georgia, serif;
  }
  .notes-nav {
    border-bottom: 1px solid #d5d9cd;
  }
  .notes-brand {
    font-size: 21px;
    font-weight: 700;
    letter-spacing: -0.04em;
  }
  .notes-brand span {
    color: #8f9b78;
  }
  .notes-nav nav {
    font:
      12px system-ui,
      sans-serif;
  }
  .notes-hero {
    display: grid;
    grid-template-columns: 1fr 0.8fr;
    align-items: center;
    gap: 12%;
    padding: 90px 7% 90px;
  }
  .notes-kicker,
  .notes-heading,
  .notes-index,
  .notes-footer,
  .notes figcaption {
    font-family: system-ui, sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
  }
  .notes-kicker {
    color: #60725a;
  }
  .notes h2 {
    margin: 25px 0;
    font-size: clamp(58px, 7vw, 96px);
    line-height: 1;
    font-weight: 400;
    letter-spacing: -0.055em;
  }
  .notes h2 em {
    color: #829074;
  }
  .notes-intro > p:not(.notes-kicker) {
    max-width: 410px;
    font-size: 18px;
    line-height: 1.7;
    color: #667064;
  }
  .notes-intro > a {
    display: inline-block;
    margin-top: 30px;
    border-bottom: 1px solid #aeb8a4;
    padding-bottom: 6px;
    font:
      12px system-ui,
      sans-serif;
  }
  .notes figure {
    margin: 0;
  }
  .notes figure img {
    height: 400px;
    border-radius: 190px 190px 3px 3px;
  }
  .notes figcaption {
    margin-top: 13px;
    color: #60725a;
  }
  .notes-heading {
    border-color: #aeb8a4;
    color: #60725a;
    padding-bottom: 15px;
  }
  .notes-row {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    gap: 25px;
    align-items: start;
    border-top: 1px solid #d5d9cd;
    padding: 30px 0;
  }
  .notes-index {
    color: #60725a;
  }
  .notes-row h3 {
    font-size: 26px;
  }
  .notes-row p {
    margin-top: 8px;
    max-width: 550px;
    font-size: 14px;
    line-height: 1.6;
    color: #667064;
  }
  .notes-row a {
    font:
      12px system-ui,
      sans-serif;
    border-bottom: 1px solid #aeb8a4;
    padding-bottom: 5px;
  }
  .notes-footer {
    margin-top: 35px;
    border-color: #d5d9cd;
    color: #60725a;
  }
  .commons {
    background: #f5f7f7;
    color: #183330;
    font-family: system-ui, sans-serif;
  }
  .commons-nav {
    border-bottom: 1px solid #d6e0dd;
    font-size: 13px;
    font-weight: 650;
  }
  .commons-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 800;
    font-size: 16px;
  }
  .commons-brand span {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: #1c5e53;
    color: white;
    font:
      700 21px Georgia,
      serif;
  }
  .commons-nav-button {
    background: #e1eeea;
    border-radius: 8px;
    padding: 10px 15px;
  }
  .commons-hero {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 10%;
    align-items: center;
    padding: 88px 0;
  }
  .commons-kicker {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #356a5c;
  }
  .commons-kicker span {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 5px;
    border-radius: 50%;
    background: #6ea78e;
  }
  .commons h2 {
    margin: 20px 0;
    font-size: clamp(44px, 5.5vw, 76px);
    line-height: 1.07;
    letter-spacing: -0.06em;
    font-weight: 750;
  }
  .commons h2 em {
    font-family: Georgia, serif;
    font-weight: 400;
    color: #4a806f;
  }
  .commons-hero > div > p:not(.commons-kicker) {
    max-width: 500px;
    color: #4c685f;
    font-size: 16px;
    line-height: 1.7;
  }
  .commons-actions {
    display: flex;
    gap: 25px;
    align-items: center;
    margin-top: 28px;
    font-size: 12px;
    font-weight: 700;
  }
  .commons-primary {
    padding: 14px 18px;
    border-radius: 7px;
    color: white;
    background: #1c5e53;
  }
  .commons-profile {
    position: relative;
    padding: 12px;
    background: white;
    border: 1px solid #dce5e1;
    border-radius: 16px;
    box-shadow: 0 18px 55px #18333010;
  }
  .commons-profile img {
    height: 260px;
    border-radius: 9px;
  }
  .commons-profile div {
    display: flex;
    flex-direction: column;
    gap: 3px;
    padding: 15px 4px 4px;
    font-size: 13px;
  }
  .commons-profile div span {
    color: #536f65;
    font-size: 11px;
  }
  .commons-spark {
    position: absolute;
    right: -18px;
    bottom: 45px;
    display: grid;
    place-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #e4d7ae;
    font-size: 23px;
  }
  .commons-directory-heading {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 22px;
  }
  .commons-directory-heading p,
  .commons-card-label {
    color: #466d5f;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.12em;
  }
  .commons-directory-heading h3 {
    margin-top: 8px;
    font-size: 28px;
    font-weight: 750;
    letter-spacing: -0.04em;
  }
  .commons-directory-heading > span {
    color: #536f65;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
  .commons-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr;
    gap: 14px;
    padding-bottom: 65px;
  }
  .commons-grid section {
    display: flex;
    flex-direction: column;
    min-height: 310px;
    padding: 25px;
    border-radius: 12px;
  }
  .commons-feature {
    background: #dceee6;
    border: 1px solid #c7e1d5;
  }
  .commons-card {
    background: white;
    border: 1px solid #dce5e1;
  }
  .commons-icon {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    margin-bottom: 30px;
    border-radius: 10px;
    background: #edf5f1;
    font-size: 22px;
  }
  .commons-feature .commons-icon {
    background: #c4e0d1;
  }
  .commons-grid h4 {
    margin: 10px 0;
    font-size: 25px;
    font-weight: 750;
    line-height: 1.15;
    letter-spacing: -0.04em;
  }
  .commons-grid section > p:not(.commons-card-label) {
    color: #4c685f;
    font-size: 13px;
    line-height: 1.6;
  }
  .commons-grid section > a {
    margin-top: auto;
    padding-top: 24px;
    font-size: 12px;
    font-weight: 750;
  }
  .commons-footer {
    border-color: #d6e0dd;
    font-size: 12px;
    font-weight: 700;
  }
  .commons-footer small {
    color: #536f65;
    font-weight: 400;
  }
  @media (max-width: 700px) {
    .selector {
      grid-template-columns: repeat(2, 1fr);
    }
    .selector button {
      padding: 10px;
    }
    .selector button small {
      line-height: 1.3;
    }
    .concept nav {
      gap: 14px;
    }
    .index-wrap,
    .studio-wrap,
    .notes-wrap,
    .commons-wrap {
      padding: 0 6%;
    }
    .index-nav,
    .studio-nav,
    .notes-nav,
    .commons-nav {
      min-height: 70px;
    }
    .index-brand span,
    .commons-directory-heading > span {
      display: none;
    }
    .index-hero,
    .studio-hero,
    .notes-hero,
    .commons-hero {
      grid-template-columns: 1fr;
      gap: 35px;
      padding: 50px 0;
    }
    .index-portrait {
      justify-self: stretch;
      width: 100%;
    }
    .index-portrait img,
    .studio-image img,
    .notes figure img {
      height: 310px;
    }
    .index-grid,
    .studio-grid,
    .commons-grid {
      grid-template-columns: 1fr;
    }
    .index-grid section + section {
      border-left: 0;
      border-top: 1px solid #c6c8bd;
      padding-left: 0;
    }
    .index-grid section {
      padding: 25px 0;
    }
    .index-grid h3 {
      margin-top: 18px;
    }
    .index-section-title,
    .notes-heading {
      gap: 15px;
      font-size: 9px;
    }
    .studio-image {
      margin: 0 15px 10px 0;
    }
    .studio-grid section,
    .commons-grid section {
      min-height: 240px;
    }
    .studio-ticker {
      margin: 0 -6.8%;
    }
    .notes-hero {
      padding-left: 0;
      padding-right: 0;
    }
    .notes figure {
      max-width: 340px;
    }
    .notes-row {
      grid-template-columns: 32px 1fr;
      gap: 12px;
    }
    .notes-row a {
      grid-column: 2;
      justify-self: start;
    }
    .commons-profile {
      max-width: 320px;
    }
    .commons-nav-button {
      padding: 9px;
    }
    .index-footer,
    .studio-footer,
    .notes-footer,
    .commons-footer {
      flex-wrap: wrap;
    }
  }
</style>
