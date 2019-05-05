import { EffectsModule, EffectSources } from '@ngrx/effects';
import { NgModule, Inject, InjectionToken, Injectable, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, MetaReducer, ActionReducer, State, ReducerManager, META_REDUCERS } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { ActionFactoryService } from './actions/action-factory.service';
import { reducerWrapper } from './reducers/dynamic.reducer';
import { DynamicFacadeService } from './facades/dynamic-facade.service';
import { DefaultDataService } from './services/default-data.service';
import { DynamicEffectFactoryService } from './effects/dynamic-effect-factory.service';
import { DynamicDataFactoryService } from './services/dynamic-data-factory.service';
import {
  DynamicStoreConfig,
  EntityConfig,
} from './dynamic-ngrx.models';
import { compact } from 'lodash';
import { getMetaReducers } from './meta-reducers';
import {
  DYNAMIC_STORE_CONFIG,
  DYNAMIC_DATA_PROVIDER,
} from './dynamic-ngrx.service';

export function getConfigProviders(config: DynamicStoreConfig): any[] {

  const providers = config.entities
    .filter((entityConfig: EntityConfig<any>) => !!entityConfig.dataService)
    .map((entityConfig: EntityConfig<any>) => {
      return {
        provide: DYNAMIC_DATA_PROVIDER,
        multi: true,
        useClass: entityConfig.dataService,
      };
    });
  const compactProviders = compact(providers);
  return compactProviders;
}

export function filterEntities(config: DynamicStoreConfig): EntityConfig<any>[] {
  return config.entities;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  exports: [],
  providers: [
    DynamicFacadeService,
    ActionFactoryService,
    DefaultDataService,
    DynamicEffectFactoryService,
    DynamicDataFactoryService,
  ],
})
export class DynamicNgrxModule {
  static forRoot(config?: DynamicStoreConfig): ModuleWithProviders {
    return {
      ngModule: DynamicNgrxModule,
      providers: [
        {
          provide: DYNAMIC_STORE_CONFIG,
          useValue: config,
        },
        {
          provide: META_REDUCERS,
          deps: [DYNAMIC_STORE_CONFIG],
          useFactory: getMetaReducers,
        },
        // This works in ng serve, but not in build --prod
        ...getConfigProviders(config),
      ],
    };
  }
  constructor(
    @Inject(DYNAMIC_STORE_CONFIG) private config: DynamicStoreConfig,
    private reducerManager: ReducerManager,
    private effectSources: EffectSources,
    private dynamicEffectFactoryService: DynamicEffectFactoryService<any>,
  ) {
    const reducers = this.config.entities.reduce((result, entityConfig: EntityConfig<any>) => {
      const effects = this.dynamicEffectFactoryService.getEntityEffects(entityConfig);
      this.addEffects(effects);
      result[entityConfig.entity] = reducerWrapper(entityConfig);
      return result;
    }, {});
    this.reducerManager.addReducers(reducers);
  }

  private addEffects(effectSourceInstance: any): void {
    this.effectSources.addEffects(effectSourceInstance);
  }
}
