<script>
  import IconOpenInNew from "~icons/mdi/open-in-new";

  export let href;
  export let topic;
  export let linkId;
  export let currentClicks = 0;

  async function trackExternalLinkClick(topic, linkId, currentClicks) {
    const url = new URL(
      "https://personal-site-e7709-default-rtdb.firebaseio.com"
    );
    url.pathname = `topics/${topic}/links/${linkId}/.json`;

    await fetch(url, {
      method: "PATCH",
      body: JSON.stringify({ clicks: currentClicks + 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
</script>

<a
  class="min-h-[2.3rem] rounded-md bg-[#f6efe6] px-2 text-yellow-700
        dark:bg-primary-400 dark:text-dark-600"
  {href}
  target="_blank"
  on:click={() => trackExternalLinkClick(topic, linkId, currentClicks)}
>
  <span
    class="inline-flex h-full items-center gap-1
            hover:underline focus:underline"
  >
    <slot />
    <IconOpenInNew style="height: 1rem" />
  </span>
</a>
