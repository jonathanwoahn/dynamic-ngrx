import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { getEntityAdapter, DynamicState, selectedEntityId } from '../reducers/dynamic.reducer';
import { EntityConfig } from '../dynamic-ngrx.models';

export function selectEntityState<T>(entity: string) {
  return createFeatureSelector<DynamicState<T>>(entity);
}

export function selectEntityObjects<T>(entityConfig: EntityConfig<T>): Dictionary<T> {
  const adapter = getEntityAdapter(entityConfig);
  const selectEntities = adapter.getSelectors().selectEntities;
  return createSelector(selectEntityState<T>(entityConfig.entity), selectEntities) as any;
}

export function selectAllEntities<T>(entityConfig: EntityConfig<T>): T[] {
  const adapter = getEntityAdapter(entityConfig);
  const selectAll = adapter.getSelectors().selectAll;
  return createSelector(selectEntityState<T>(entityConfig.entity), selectAll) as any;
}

export function selectAllIds<T>(entityConfig: EntityConfig<T>): string[] {
  const adapter = getEntityAdapter(entityConfig);
  const selectIds = adapter.getSelectors().selectIds;
  return createSelector(selectEntityState<T>(entityConfig.entity), selectIds) as any;
}

export function selectTotalCount<T>(entityConfig: EntityConfig<T>): number {
  const adapter = getEntityAdapter(entityConfig);
  const selectTotal = adapter.getSelectors().selectTotal;
  return createSelector(selectEntityState<T>(entityConfig.entity), selectTotal) as any;
}

export function getSelectedEntityId<T>(entityConfig: EntityConfig<T>): string {
  return createSelector(selectEntityState<T>(entityConfig.entity), selectedEntityId) as any;
}

export function isLoading<T>(entityConfig: EntityConfig<T>): boolean {
  return createSelector(selectEntityState<T>(entityConfig.entity), (state: DynamicState<T>) => !!(state || {} as any).loading) as any;
}

export function isLoaded<T>(entityConfig: EntityConfig<T>): boolean {
  return createSelector(selectEntityState<T>(entityConfig.entity), (state: DynamicState<T>) => !!(state || {} as any).loaded) as any;
}
