<script>
  export let href;
  export let target = "";
  export let rel = "";
</script>

<a class="text-blue-400 underline dark:text-blue-300" {href} {target} {rel}>
  <slot />
</a>
