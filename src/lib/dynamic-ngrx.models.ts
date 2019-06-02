export interface EntityConfig<T> {
  /**
   * Array of the entities you use in your application. They should be spelled
   * and capitalized in the same way you have your interfaces defined
   * i.e. if you have an interface
   * Todo {
   *   id: number;
   *   text: string;
   * }
   * then you pass in your argument as: 'Todo'
   */
  entity: string;
  /**
   * If the key is something other than 'id'. Defaults to 'id' if left blank
   */
  entityKey?: string;
  /**
   * Data service associated with the entity. Reference the injectable service here.
   * If no service is provided, the default service will be used, which just passes
   * the entity through
   */
  dataService?: any;
  /**
   * Persist to local storage. Defaults to true.
   */
  persist?: boolean;
}

export interface DynamicStoreConfig {
  entities: EntityConfig<any>[];
  // Additional entities to be synchronized with localStorageSync that are not entity entity array
  syncEntities?: string[];
  /**
   * Defaults to false. Set as true to enable syncing data offline
   */
  enableOfflineSync?: boolean;
  /**
   * Enable ngrx logging
   */
  enableLogging?: boolean;
}
