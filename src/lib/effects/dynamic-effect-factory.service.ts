import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { DefaultDataService } from '../services/default-data.service';
import { ActionFactoryService } from '../actions/action-factory.service';
import { DynamicEffect } from './dynamic-effect';
import { DynamicDataFactoryService } from '../services/dynamic-data-factory.service';
import { EntityConfig } from '../dynamic-ngrx.models';
import { DynamicState } from '../reducers/dynamic.reducer';

@Injectable()
export class DynamicEffectFactoryService<T> {
  constructor(
    private actions$: Actions,
    // private dataService: DefaultDataService<T>,
    private actionFactory: ActionFactoryService,
    private dataServiceFactory: DynamicDataFactoryService,
    private store: Store<DynamicState<T>>,
  ) { }

  getEntityEffects(entityConfig: EntityConfig<T>) {
    const dataService = this.dataServiceFactory.getDataService(entityConfig.entity);
    return new DynamicEffect<T>(entityConfig, this.actions$, dataService, this.actionFactory, this.store);
  }
}

