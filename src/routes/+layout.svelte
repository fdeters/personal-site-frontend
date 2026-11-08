<script>
  import '../app.css';
  import { onMount } from 'svelte';

  let dark = false;
  let saved = false;

  onMount(() => {
    dark = document.documentElement.dataset.theme === 'dark';
    try {
      saved = ['light', 'dark'].includes(
        localStorage.getItem('site-theme') ?? ''
      );
    } catch (error) {
      console.warn('Unable to read the saved theme preference.', error);
    }
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    /** @param {MediaQueryListEvent} event */
    function updateSystemTheme(event) {
      if (!saved) {
        dark = event.matches;
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
      }
    }
    preference.addEventListener('change', updateSystemTheme);
    return () => preference.removeEventListener('change', updateSystemTheme);
  });

  function toggleTheme() {
    dark = !dark;
    saved = true;
    const theme = dark ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('site-theme', theme);
    } catch (error) {
      console.warn('Unable to save the theme preference.', error);
    }
  }
</script>

<div class="app-shell">
  <div class="theme-bar">
    <button
      type="button"
      class="theme-toggle"
      aria-pressed={dark}
      on:click={toggleTheme}
    >
      Dark mode <span aria-hidden="true">{dark ? 'On' : 'Off'}</span>
    </button>
  </div>
  <slot />
</div>
