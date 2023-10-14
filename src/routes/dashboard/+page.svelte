<script lang="ts">
    import Search from "../search/+page.svelte";
    import { heroData } from "$lib/stores/heroes";
    import { appendMessage } from "$lib/stores/messages";
    import { onDestroy } from "svelte";

    export let topHeroesData: Hero[] = [];

    const unsubscribe = heroData.subscribe(($heroData) => {
    topHeroesData = $heroData.slice(0, 5);
    let message: string = "The following heroes have been loaded: ";
    topHeroesData.forEach((hero) => {
      message += `ID: ${hero.id} `;
    });
    appendMessage(message);
  });
  // Unsubscribe when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>
<h2 class="text-center">Top 5 Heroes</h2>
<div class="text-center">
    {#each topHeroesData as hero (hero.id)}
        <a href="/heroes/detail/{hero.id}" class="badge">{hero.name}</a>
    {/each}
</div>
<Search />