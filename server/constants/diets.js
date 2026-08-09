/**
 * The three diet values SearchFilters.jsx already hardcodes as
 * DIET_OPTIONS. Kept here as the single source of truth so the model's
 * enum validation and any future route/query validation both import the
 * same list instead of each declaring their own copy.
 */
const DIETS = ['Herbivore', 'Carnivore', 'Omnivore']

module.exports = { DIETS }