<script>
    export let href;
</script>

<a class="text-yellow-700 italic hover:underline focus:underline"
    href={href} target="_blank" rel=""
>
    <slot />
</a>