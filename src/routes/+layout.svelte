<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import IconSun from '~icons/mdi/weather-sunny';
  import IconMoon from '~icons/mdi/weather-night';

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
  <nav class="theme-bar" aria-label="Appearance">
    <button
      type="button"
      class="theme-toggle"
      role="switch"
      aria-label="Dark mode"
      aria-checked={dark}
      on:click={toggleTheme}
    >
      <IconSun aria-hidden="true" class="theme-icon theme-sun" />
      <span class="theme-toggle-thumb" aria-hidden="true"></span>
      <IconMoon aria-hidden="true" class="theme-icon theme-moon" />
    </button>
  </nav>
  <slot />
</div>
