<script lang="ts">
  import "../app.postcss";
  import Messages from "./messages/+page.svelte";
</script>

<header>
  <!-- Include the navigation bar -->
  <nav class="nav text-center">

        <a class="btn btn-lg" href="/">Dashboard</a>

      <a class="btn btn-lg" href="/heroes">Heroes</a>

  </nav>
</header>

<main>
  <!-- Include a slot for rendering page content -->
  <slot />
</main>
<Messages />
