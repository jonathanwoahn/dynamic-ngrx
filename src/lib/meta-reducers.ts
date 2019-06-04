import { ActionReducer, State } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { RESET_ALL } from './actions/dynamic.actions';
import { DynamicStoreConfig } from './dynamic-ngrx.models';

export function getEntityKeys(config: DynamicStoreConfig): string[] {
  return config.entities
  .filter(entityConfig => entityConfig.persist !== false)
  .map(entityConfig => entityConfig.entity);
}

export function logger(reducer: ActionReducer<State<any>>): any {
  const options = {
    collapsed: true,
    timestamp: false,
  };
  return storeLogger(options)(reducer);
}

export function storageSyncReducer(keys: string[]): ActionReducer<any> {
  return function (reducer: ActionReducer<any>) {
    const options = {
      keys,
      rehydrate: true,
      restoreDates: false,
    };
    return localStorageSync(options)(reducer);
  };
}

export function resetState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === RESET_ALL) {
      return reducer({}, action);
    }
    return reducer(state, action);
  };
}

export function getMetaReducers(config?: DynamicStoreConfig) {
  const reducers: any[] = [
    resetState,
  ];

  if (config && config.enableLogging) {
    reducers.push(logger);
  }

  if (config.enableOfflineSync) {
    const keys = getEntityKeys(config);
    const storeSync = storageSyncReducer([...keys, ...config.syncEntities]);
    reducers.push(storeSync);
  }

  return reducers;
}
