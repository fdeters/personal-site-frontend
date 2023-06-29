<script>
    import IconOpenInNew from "~icons/mdi/open-in-new";

    export let href;
</script>

<a
    class="rounded-md bg-[#f6efe6] px-2 text-yellow-700
        dark:bg-primary-500 dark:text-dark-600"
    {href}
    target="_blank"
>
    <span
        class="text inline-flex items-center gap-2
            hover:underline focus:underline"
    >
        <slot />
        <IconOpenInNew style="height: 1rem" />
    </span>
</a>
