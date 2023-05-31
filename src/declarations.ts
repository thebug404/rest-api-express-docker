/**
 * Represents a query object with string keys and unknown values.
 */
export type Query = Record<string, unknown>

/**
 * Represents an ID that can be either a string or a number.
 */
export type Id = string | number

/**
 * Defines the methods available in a service.
 * @interface
 * @template T - The type of the data.
 */
export interface ServiceMethods<T = unknown> {
  /**
   * Retrieves a list of items.
   * @param {Query} [query] - The optional query object.
   * @returns {Promise<T[]>} - A promise that resolves to an array of items.
   */
  list(query?: Query): Promise<T[]>;

  /**
   * Retrieves a single item by its ID.
   * @param {Id} id - The ID of the item to retrieve.
   * @param {Query} [query] - The optional query object.
   * @returns {Promise<T|null|undefined>} - A promise that resolves to the item or null/undefined if not found.
   */
  get(id: Id, query?: Query): Promise<T | null | undefined>;

  /**
   * Creates a new item.
   * @param {T} data - The data of the new item.
   * @param {Query} [query] - The optional query object.
   * @returns {Promise<T>} - A promise that resolves to the created item.
   */
  create(data: T, query?: Query): Promise<T>;

  /**
   * Updates an existing item by its ID.
   * @param {Id} id - The ID of the item to update.
   * @param {T} data - The updated data for the item.
   * @param {Query} [query] - The optional query object.
   * @returns {Promise<T>} - A promise that resolves to the updated item.
   */
  update(id: Id, data: T, query?: Query): Promise<T>;

  /**
   * Performs a partial update on an existing item by its ID.
   * @param {Id} id - The ID of the item to patch.
   * @param {T} data - The partial data to apply to the item.
   * @param {Query} [query] - The optional query object.
   * @returns {Promise<T>} - A promise that resolves to the patched item.
   */
  patch(id: Id, data: T, query?: Query): Promise<T>;

  /**
   * Removes an item by its ID.
   * @param {Id} id - The ID of the item to remove.
   * @param {Query} [query] - The optional query object.
   * @returns {Promise<T>} - A promise that resolves to the removed item.
   */
  remove(id: Id, query?: Query): Promise<T>;
}
