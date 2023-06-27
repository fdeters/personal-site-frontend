<script>
    export let href;
</script>

<a
    class="rounded-sm bg-[#f6efe6] px-1 italic text-yellow-700
    hover:underline focus:underline"
    {href}
    target="_blank"
    rel=""
>
    <slot />
</a>
