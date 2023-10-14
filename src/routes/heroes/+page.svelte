<script lang="ts">
  import { onDestroy } from "svelte";
  import { heroData, addHero, deleteHero } from "$lib/stores/heroes";
  import { appendMessage } from "$lib/stores/messages";
  import LinkIcon from "$lib/icons/link.svelte";
  import PlusIcon from "$lib/icons/plus.svelte";
  import DeleteIcon from "$lib/icons/delete.svelte";

  export let heroInputName: string = "";
  export let heroInputSuperPower: string = "";
  export let heroesData: Hero[] = [];

  // Subscribe to the heroes store
  const unsubscribe = heroData.subscribe(($heroData) => {
    heroesData = $heroData;
    let message: string = "The following heroes have been loaded: ";
    heroesData.forEach((hero) => {
      message += `ID: ${hero.id} `;
    });
    appendMessage(message);
  });

  // Unsubscribe when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });

  function handleaddHero(name: string, superPower: string) {
    if (name && superPower) {
      addHero(name, superPower);
      heroInputName = "";
      heroInputSuperPower = "";
      heroesData.push({
        id: heroesData.length + 1,
        name: name,
        superPower: superPower,
        searchTerms: `${name} ${superPower}`,
      });
    }
  }
</script>

<div class="w-4/5 mx-auto">
  <h1 class="text-center text-xl font-bold">My Heroes</h1>

  <dl class="list-dl text-center">
    {#if heroesData}
      {#each heroesData as hero (hero.id)}
        <div>
          <span class="badge-icon bg-primary-500"
            ><a href="heroes/detail/{hero.id}"><LinkIcon /></a></span
          >
          <span class="flex-auto">
            <dt>{hero.name}</dt>
            <dd>{hero.superPower}</dd>
          </span>
          <button
            type="button"
            class="badge-icon bg-error-500"
            on:click={() => deleteHero(hero)}
          >
            <DeleteIcon />
          </button>
        </div>
      {/each}
    {:else}
      <div class="placeholder animate-pulse"><p>Loading...</p></div>
    {/if}
    <div>
      <h1 class="text-center text-xl font-bold">Add a New Hero</h1>
      <span class="flex-auto">
        <div>
          <label class="sr-only" for="new-hero-name">Hero Name: </label>
          <input
            class="input text-center"
            id="new-hero-name"
            placeholder="New Hero Name"
            value={heroInputName}
          />
        </div>
        <div>
          <label class="sr-only" for="new-hero-superpower"
            >Hero Super Power:
          </label>
          <input
            class="input text-center"
            id="new-hero-superpower"
            placeholder="New Hero Super Power"
            value={heroInputSuperPower}
          />
        </div>
      </span>
      <button
        type="button"
        class="badge-icon bg-success-500"
        on:click={() => {
          addHero(heroInputName, heroInputSuperPower);
        }}
      >
        <PlusIcon />
      </button>
    </div>
  </dl>
</div>
