import { InjectionToken } from '@angular/core';
import { DynamicStoreConfig } from './dynamic-ngrx.models';
import { IDynamicDataService } from './services/default-data.service';

export const DYNAMIC_STORE_CONFIG = new InjectionToken<DynamicStoreConfig>('Dynamic Store Options');
export const DYNAMIC_STORE_ENTITIES = new InjectionToken('Dynamic Store Entities');
export const DYNAMIC_DATA_SERVICES = new InjectionToken<IDynamicDataService<any>[]>('Dynamic Data Services');
export const DYNAMIC_DATA_PROVIDER = new InjectionToken('Dynamic Data Provider');
