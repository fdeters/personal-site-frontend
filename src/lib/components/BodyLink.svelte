<script>
    export let href;
    export let target = "";
    export let rel = "";
</script>

<a
    class="underline text-blue-400"
    {href}
    {target}
    {rel}
>
    <slot />
</a>
