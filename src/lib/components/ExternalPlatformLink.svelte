<script>
    import ExternalLinkIcon from "$lib/assets/icons/external-link.png";

    export let href;
</script>

<a
    class="rounded-md bg-[#f6efe6] px-1 italic text-yellow-700"
    {href}
    target="_blank"
>
    <span
        class="inline-flex items-center gap-2 hover:underline focus:underline"
    >
        <slot />
        <img class="h-3" src={ExternalLinkIcon} alt="" />
    </span>
</a>
