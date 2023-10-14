<script lang='ts'>
    import { onMount } from "svelte";
    //import heroes from "$lib/stores/heroes";
    import { page } from "$app/stores"; // Import the $page store
    import heroData from '$lib/data/heroes.json';

    export let heroes = heroData['heroes'];

    //let currentHeroes = $heroes.get(); // Get the current heroes from the store
    let slug: number;
    export let currentHero: Hero|undefined;
    // Get the slug from the route parameters
    slug = parseInt($page.params.slug);   

    onMount(async () => {             
        currentHero = heroes.find((hero) => hero.id === slug); // Find the hero with the matching id
    });
</script>

<h1>{currentHero?.name} Details</h1>
<div><span>id: {currentHero?.id}</span></div>
<div>
    <label>name:
        <input class="input text-center" value="{currentHero?.name}" />
    </label>
</div>
<button on:click={() => window.history.back()}>Go Back</button>
