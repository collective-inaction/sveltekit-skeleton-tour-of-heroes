<script lang="ts">
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";
    import { heroData } from "$lib/stores/heroes";
    import LinkIcon from "$lib/icons/link.svelte";

    // Initialize heroesData with an empty array
    let heroesData: Hero[] = [];

    // Subscribe to the heroes store to get the hero data
    const unsubscribeHeroes = heroData.subscribe(($heroData) => {
        heroesData = $heroData;
    });
    // Create and subscribe to the search store with searchHeroes
    const searchStore = createSearchStore(heroesData);

    // Subscribe to the search store for search updates
    const unsubscribeSearch = searchStore.subscribe((model) => searchHandler(model));

    onDestroy(() => {
        // Unsubscribe from both heroes and search stores
        unsubscribeHeroes();
        unsubscribeSearch();
    });
</script>

<dl class="list-dl text-center">
    <label class="sr-only" for="hero-search">Search for a Hero</label>
    <input
        id="hero-search"
        type="search"
        class="input text-center"
        placeholder="Search for a Hero (By Name or Power)"
        bind:value={$searchStore.search}
    />
    <ul class="search-result">
        {#if $searchStore.search.trim() !== ""}
            <!-- Display filtered heroes when search terms are entered -->
            {#each $searchStore.filtered as hero}            
            <div>
                <span class="badge-icon bg-primary-500"
                  ><a href="heroes/detail/{hero.id}"><LinkIcon /></a></span
                >
                <span class="flex-auto">
                  <dt>{hero.name}</dt>
                  <dd>{hero.superPower}</dd>
                </span>
                </div>
            {/each}
        {/if}
    </ul>
</dl>