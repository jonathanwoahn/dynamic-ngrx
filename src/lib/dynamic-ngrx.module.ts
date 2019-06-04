import { EffectsModule, EffectSources } from '@ngrx/effects';
import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule, ReducerManager, META_REDUCERS } from '@ngrx/store';
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
import { getMetaReducers } from './meta-reducers';
import { DYNAMIC_STORE_CONFIG } from './dynamic-ngrx.service';

export function filterEntities(config: DynamicStoreConfig): EntityConfig<any>[] {
  return config.entities;
}


// @dynamic
@NgModule({
  declarations: [
  ],
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
    const providers = config.providers ? config.providers : [];
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
        ...providers,
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
