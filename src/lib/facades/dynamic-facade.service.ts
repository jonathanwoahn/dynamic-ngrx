import { ResetAllEntitiesState } from './../actions/dynamic.actions';
import { Store } from '@ngrx/store';
import { DynamicFacade } from './dynamic-facade';
import { Injectable, Inject } from '@angular/core';
import { DynamicStoreConfig, EntityConfig } from '../dynamic-ngrx.models';
import { DYNAMIC_STORE_CONFIG } from '../dynamic-ngrx.service';

@Injectable()
export class DynamicFacadeService {
  constructor(
    @Inject(DYNAMIC_STORE_CONFIG) private config: DynamicStoreConfig,
    private store: Store<any>,
  ) {
  }

  getFacade<T>(entity: string): DynamicFacade<T> {
    const index = this.config.entities.findIndex((entityConfig: EntityConfig<T>) => entityConfig.entity === entity);
    if (index === -1) {
      throw Error(`${entity} is not a known entity type.
      Please make sure it is defined in your configuration object for the Dynamic Store Module.`);
    }
    return new DynamicFacade<T>(this.config.entities[index], this.store);
  }

  /**
   * WARNING: This method completely resets the entire state
   */
  resetState(): void {
    this.store.dispatch(new ResetAllEntitiesState());
  }
}
