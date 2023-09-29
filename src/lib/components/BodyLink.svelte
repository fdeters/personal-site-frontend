<script>
  export let href;
  export let target = "";
  export let rel = "";
</script>

<a class="text-blue-400 underline" {href} {target} {rel}>
  <slot />
</a>
