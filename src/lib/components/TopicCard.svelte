<script>
  import ExternalPlatformLink from './ExternalPlatformLink.svelte';

  /** @type {string} */
  export let title;
  /** @type {{ id: string, url: string, text: string, clicks: number }[]} */
  export let links = [];
</script>

<section
  class="dark:bg-dark-500 flex flex-col justify-between gap-4 rounded-md bg-white px-4
        py-3"
  aria-label={title}
>
  <div>
    <h2 class="mb-2 text-xl font-medium">
      {title}
    </h2>
    <div class="dark:text-gray-400">
      <slot />
    </div>
  </div>
  {#if links.length}
    <div>
      <hr class="mb-3 dark:border-gray-400" />
      <div class="flex flex-wrap gap-2" aria-label="Links to other platforms">
        {#each links as link}
          <ExternalPlatformLink href={link.url}>
            {link.text}
          </ExternalPlatformLink>
        {/each}
      </div>
    </div>
  {/if}
</section>
