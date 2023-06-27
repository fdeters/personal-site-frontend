<script>
    import ExternalPlatformLink from "./ExternalPlatformLink.svelte";

    export let title;
    export let links = []; // { url, text }
</script>

<section class="rounded-md bg-white px-4 py-3">
    <h2 class="mb-1 text-xl font-medium">
        {title}
    </h2>
    {#if links.length}
        <div class="mb-2 flex flex-wrap gap-4">
            {#each links as link}
                <ExternalPlatformLink href={link.url}>
                    {link.text}
                </ExternalPlatformLink>
            {/each}
        </div>
    {/if}
    <hr class="my-2" />
    <slot />
</section>
