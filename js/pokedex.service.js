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

var pokedexService = (function() {
    var _baseUrl = 'https://raw.githubusercontent.com/ruizalexandre/pokedex/master/';

    /**
     * @return {Promise<Pokemon[]>} List of Pokemons (first generation)
     */
    function _fetchAll() {
        return fetch(_baseUrl + 'pokedex.json')
            .then(function(response) {
                return response.json();
            });
    }

    /**
     * 
     * @param {string} id 
     * @return {string} Formatted id
     */
    function _formattedId(id) {
        var formattedIndex = id;

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
    function _getTypeBadge(type) {
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
    function _pokemonImageUrl(id) {
        return _baseUrl + 'thumbnails/' + _formattedId(id) + '.png';
    }

    return {
        fetchAll: _fetchAll,
        pokemonImageUrl: _pokemonImageUrl,
        formattedId: _formattedId,
        getTypeBadge: _getTypeBadge,
    };
})();