import { InjectionToken } from '@angular/core';
import { DefaultDataService } from './services/default-data.service';

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
   * Persist to local storage. Defaults to true. If "enableOfflineSync" is not set to true,
   * this will not work
   */
  persist?: boolean;
}

interface AngularMultiProvider {
  provide: InjectionToken<any>;
  useClass: any;
  multi: true;
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
  /**
   * Even if no providers are defined, provide and empty array to prevent build errors
   */
  providers: AngularMultiProvider[];
}
