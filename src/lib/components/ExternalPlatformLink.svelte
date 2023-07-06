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
    class="rounded-md bg-[#f6efe6] px-2 text-yellow-700 min-h-[2.3rem]
        dark:bg-primary-500 dark:text-dark-600"
    {href}
    target="_blank"
    on:click={() => trackExternalLinkClick(topic, linkId, currentClicks)}
>
    <span
        class="text inline-flex items-center gap-1 h-full
            hover:underline focus:underline"
    >
        <slot />
        <IconOpenInNew style="height: 1rem" />
    </span>
</a>
