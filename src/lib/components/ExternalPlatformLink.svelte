<script>
    export let href;
</script>

<a class="text-yellow-700 italic hover:underline px-1 rounded-sm
    bg-[#f6efe6] focus:underline"
    href={href} target="_blank" rel=""
>
    <slot />
</a>