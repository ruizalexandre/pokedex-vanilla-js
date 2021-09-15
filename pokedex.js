/**
 * @typedef {Object} PokemonName
 * @property {string} english
 * @property {string} japanese
 * @property {string} chinese
 * @property {string} french
 */

/**
 * @typedef {Object} PokemonBase
 * @property { number} "HP"
 * @property { number} "Attack"
 * @property { number} "Defense"
 * @property { number} "Sp. Attack"
 * @property { number} "Sp. Defense"
 * @property { number} "Speed"
 */

/**
 * @typedef {Object} Pokemon
 * @property {string} id
 * @property {PokemonName} name
 * @property { ("Grass" | "Poison" | "Fire" | "Flying" | "Water" | "Bug" | "Normal" | "Electric" | "Ground" | "Fairy" | "Fighting" | "Psychic" | "Rock" | "Steel" | "Ice" | "Ghost" | "Dragon") } type
 * @property { PokemonBase } base
 */

class PokedexService {
    baseUrl = 'https://raw.githubusercontent.com/ruizalexandre/pokedex/master/';

    /**
     * @return {Promise<Pokemon[]>} List of Pokemons (first generation)
     */
    async fetchAll() {
        const response = await fetch(this.baseUrl + 'pokedex.json');
        return await response.json();
    }

    /**
     * 
     * @param {string} id 
     * @return {string} Formatted id
     */
    formattedId(id) {
        let formattedIndex = id;

        if (id < 10) {
            formattedIndex = '0' + formattedIndex;
        }

        if (id < 100) {
            formattedIndex = '0' + formattedIndex;
        }

        return formattedIndex;
    }

    /**
     * 
     * @param {string} type 
     * @return {string} Badge url from img.shields.io
     */
    getTypeBadge(type) {
        var color = '';

        switch (type) {
            case "Grass":
                color = '77c74f';
                break;
            case "Poison":
                color = 'a041a1';
                break;
            case "Fire":
                color = 'ef7e2e';
                break;
            case "Flying":
                color = 'a78fef';
                break;
            case "Water":
                color = '668fef';
                break;
            case "Bug":
                color = 'a7b820';
                break;
            case "Normal":
                color = 'a8a778';
                break;
            case "Electric":
                color = 'f7cf2f';
                break;
            case "Ground":
                color = 'dfbf69';
                break;
            case "Fairy":
                color = 'fe64d4';
                break;
            case "Fighting":
                color = 'bf2e27';
                break;
            case "Psychic":
                color = 'f65787';
                break;
            case "Rock":
                color = 'b69f37';
                break;
            case "Steel":
                color = 'b7b7cf';
                break;
            case "Ice":
                color = '97d7d8';
                break;
            case "Ghost":
                color = '6f5696';
                break;
            case "Dragon":
                color = '6937e2';
                break;
            default:
                break;
        }

        return `https://img.shields.io/static/v1?message=${type}&color=${color}&label=`;
    }


    /**
     * 
     * @param {string} id 
     * @return {string} Thumbnail pokemon URL
     */
    pokemonImageUrl = (id) => this.baseUrl + 'thumbnails/' + this.formattedId(id) + '.png';
}

const pokedexService = new PokedexService();
pokedexService.fetchAll().then(renderPokedex);

function renderPokedex(pokemons) {
    const pokedexListElement = document.getElementById('pokedex-list');
    const pokedexListFragment = document.createDocumentFragment();

    pokemons.forEach((pokemon) => {
        const pokemonListItem = document.createElement('div');
        pokemonListItem.className = 'pokemon-list-item';

        // ----------
        // Pokemon image
        // ----------
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokedexService.pokemonImageUrl(pokemon.id);
        pokemonImage.setAttribute('thumnbnails-pokemon', '');
        pokemonListItem.appendChild(pokemonImage);

        // ----------
        // Pokemon types badges
        // ----------
        const typeBadgesFragment = document.createDocumentFragment();
        pokemon.type.forEach((type) => {
            const typeBadge = document.createElement('img');
            typeBadge.className = 'type-badge';
            typeBadge.src = pokedexService.getTypeBadge(type);
            typeBadgesFragment.appendChild(typeBadge);
        });
        const pokemonDescription = document.createElement('div');
        pokemonDescription.className = 'w3-small';
        pokemonDescription.appendChild(typeBadgesFragment);

        // ----------
        // Pokemon name
        // ----------
        const pokemonName = document.createElement('div');
        pokemonName.className = 'pokemon-name';
        pokemonName.innerHTML = `#${pokedexService.formattedId(pokemon.id)} ${pokemon.name.english}`;

        // ----------
        // Pokemon information
        // ----------
        const pokemonInfo = document.createElement('div');
        pokemonInfo.className = 'pokemon-info';
        pokemonInfo.appendChild(pokemonName);
        pokemonInfo.appendChild(pokemonDescription);
        pokemonListItem.appendChild(pokemonInfo);

        // ----------
        // PokemonListItem append to list
        // ----------
        pokedexListFragment.appendChild(pokemonListItem);
        pokedexListElement.appendChild(pokedexListFragment);
    });

    // ----------
    // Author section
    // ----------
    const authorRedirectButton = document.createElement('a');
    authorRedirectButton.href = 'https://github.com/ruizalexandre'
    authorRedirectButton.innerHTML = 'Created by @ruizalexandre';
    const authorSection = document.createElement('div');
    authorSection.className = 'author-section';
    authorSection.appendChild(authorRedirectButton);
    pokedexListElement.appendChild(authorSection);
}