import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { heroes } from '$lib/data/heroes';
import { appendMessage } from './messages';

// Initialize the store with the initial heroes
const heroData: Writable<Hero[]> = writable<Hero[]>(heroes);

let lastUsedId: number = Math.max(...heroes.map(hero => hero.id), 0);

function addHero(heroName: string, heroSuperPower: string) {
    // Increment the last used ID to create a unique ID for the new hero
    lastUsedId++;

    // Create a new hero object
    const hero: Hero = {
        id: lastUsedId,
        name: heroName,
        superPower: heroSuperPower,
        searchTerms: `${heroName.toLowerCase()} ${heroSuperPower.toLowerCase()}`
    };    

    // Update the store with the new hero
    heroData.update((heroes) => [...heroes, hero]);
    heroes.push(hero);

    // Display a message that the hero has been added
    appendMessage(`Hero ID: ${hero.id} has been added`);
}

function deleteHero(hero: Hero) {
    // Update the store by filtering out the deleted hero
    heroData.update((heroes) => heroes.filter((h) => h.id !== hero.id));
    
    // Display a message that the hero has been deleted
    appendMessage(`Hero ID: ${hero.id} has been deleted`);
}

export { heroData, addHero, deleteHero };
