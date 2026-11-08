<script>
  import AvatarImage from '../lib/components/AvatarImage.svelte';
  import TopicCard from '../lib/components/TopicCard.svelte';
  import BodyLink from '../lib/components/BodyLink.svelte';
  import HeadshotImage from '../lib/assets/images/tokyo-drama.jpg';

  /** @type {import('./$types').PageData} */
  export let data;

  /**
   * @param {{ id: string, clicks: number, text: string, url: string }[]} links
   */
  function sortLinksByClicks(links) {
    return [...links].sort((link1, link2) => link2.clicks - link1.clicks);
  }
</script>

<svelte:head>
  <title>Forrest Deters</title>
</svelte:head>

<header class="mx-auto mb-4 max-w-md text-center">
  <div class="mt-2 mb-4 flex flex-col items-center gap-4">
    <AvatarImage
      src={HeadshotImage}
      alt="A headshot of Forrest standing in front of a temple in Tokyo. Dramatic lighting bathes one side of his face in even white light. He's wearing a plain black t-shirt. It's a little self-serious."
    />
    <div
      class="dark:bg-dark-500 mt-2 flex flex-col items-center gap-2 rounded-md bg-white px-4
        pt-3 pb-4"
    >
      <h1
        class="dark:border-darkmixed-100 w-fit border-b-2 border-gray-300 px-1 text-2xl
          font-medium"
      >
        Forrest Deters
      </h1>
      <p class="dark:text-gray-400">
        I'm a web developer and vocal musician living in Portland, Oregon. I
        like pop funk, soccer, and games.
      </p>
    </div>
  </div>
</header>

<main
  class="mx-auto flex max-w-md flex-col gap-4 lg:grid lg:max-w-3xl lg:grid-cols-2"
>
  <TopicCard
    title="Web Development"
    links={sortLinksByClicks(data.webdev.links)}
  >
    <p>
      I spend my weekdays making web applications for the Data Resource Center
      at <BodyLink href="https://oregonmetro.gov" target="_blank"
        >Metro</BodyLink
      >, Portland's regional government.
    </p>
  </TopicCard>
  <TopicCard title="Music" links={sortLinksByClicks(data.music.links)}>
    <p>
      These days, I perform and arrange vocal music for fun and
      semi-professionally.
    </p>
  </TopicCard>
</main>

<footer class="mx-auto mt-6 flex max-w-md justify-center border-t pt-4">
  <nav>
    <a
      href="/tools"
      class="hocus:text-blue-600 px-2 py-1 text-gray-600 underline"
    >
      Tools
    </a>
  </nav>
</footer>
