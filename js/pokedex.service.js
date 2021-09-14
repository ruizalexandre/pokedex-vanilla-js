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

var pokedexService = (function () {
  var _baseUrl = 'https://raw.githubusercontent.com/ruizalexandre/pokedex/master/';

  /**
   * @return {Promise<Pokemon[]>} List of Pokemons (first generation)
   */
  function _fetchAll() {
    return fetch(_baseUrl + 'pokedex.json')
      .then(function (response) {
        return response.json();
      });
  }

  return {
    fetchAll: _fetchAll,
  };
})();