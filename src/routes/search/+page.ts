import type { PageLoad } from "./$types"
export const load: PageLoad = async () => {    
        const res = await fetch("/api/heroes")
        const data = await res.json()
        return data.heroes;
}