import { Injectable, Inject } from '@angular/core';
import { ActionFactory } from './action-factory';
import { DynamicStoreConfig, EntityConfig } from '../dynamic-ngrx.models';
import { DYNAMIC_STORE_CONFIG } from '../dynamic-ngrx.service';

@Injectable()
export class ActionFactoryService {
  strategies;
  constructor(
    @Inject(DYNAMIC_STORE_CONFIG) private config: DynamicStoreConfig,
  ) {}

  getEntityActions<T>(entity: string): ActionFactory<T> {
    const index = this.config.entities.findIndex((entityConfig: EntityConfig<T>) => entityConfig.entity === entity);
    if (index === -1) {
      throw Error(`${entity} is not a known entity type.
      Please make sure it is defined in your configuration object for the Dynamic Store Module.`);
    }

    return new ActionFactory<T>(entity);
  }
}
