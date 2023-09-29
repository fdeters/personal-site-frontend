<script>
  import InstagramLogo from "../assets/images/instagram.svg";

  export let src;
  export let alt = "";
</script>

<div class="relative">
  <div
    class="w-36 overflow-hidden rounded-full shadow-md dark:border-2
    dark:border-gray-500 dark:shadow-none"
  >
    <img class="w-full" {src} {alt} />
  </div>
  <a
    href="https://www.instagram.com/doctypeforrest"
    target="_blank"
    class="absolute -bottom-2 -right-6 block w-8 overflow-hidden rounded-full"
  >
    <img
      src={InstagramLogo}
      alt="Link to Forrest's Instagram page"
      class="w-full"
    />
  </a>
</div>
