<script>
    export let href;
    export let target = "";
    export let rel = "";
</script>

<a
    class="border-b border-blue-400 text-blue-400
    hover:border-b-2 hover:font-bold focus:border-b-2 focus:font-bold"
    {href}
    {target}
    {rel}
>
    <slot />
</a>
