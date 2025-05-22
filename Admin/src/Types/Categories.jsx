/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {string} category
 * @property {string} [subCategory]
 * @property {number} price
 * @property {number} [oldPrice]
 * @property {string} description
 * @property {string[]} features
 * @property {Object.<string, string>} specifications
 * @property {string} image
 * @property {string[]} images
 * @property {number} rating
 * @property {number} reviews
 * @property {number} stock
 * @property {boolean} [isNew]
 * @property {boolean} [isFeatured]
 * @property {boolean} [isBestseller]
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} name
 * @property {string} image
 * @property {string} description
 * @property {number} itemCount
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */
