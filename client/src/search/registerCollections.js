/**
 * Single import point that registers every searchable collection with
 * the search service. Import this once (App.jsx does, as a side-effect
 * import) before any search happens. Adding a new collection later — an
 * "eras" collection, "mini games", the DNA lab, articles, the AI Guide —
 * means creating one new file under search/collections/ and adding one
 * import line here. Nothing else in the app needs to know.
 */
import './collections/dinosaurCollection.js'