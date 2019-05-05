import { HttpErrorResponse } from '@angular/common/http';
import {
  DynamicActions,
  AddOneEntity,
  SelectEntityId,
  ClearSelectedId,
  AddOneEntitySuccess,
  AddOneEntityFail,
  RemoveOneEntity,
  RemoveOneEntitySuccess,
  RemoveOneEntityFail,
  RemoveManyEntities,
  RemoveManyEntitiesSuccess,
  RemoveManyEntitiesFail,
  ResetState,
  RemoveAllEntities,
  RemoveAllEntitiesSuccess,
  RemoveAllEntitiesFail,
  AddManyEntities,
  AddManyEntitiesSuccess,
  AddManyEntitiesFail,
  UpdateOneEntity,
  UpdateOneEntitySuccess,
  UpdateOneEntityFail,
  AddAllEntities,
  AddAllEntitiesSuccess,
  AddAllEntitiesFail,
  UpdateManyEntities,
  UpdateManyEntitiesSuccess,
  UpdateManyEntitiesFail,
  UpsertOneEntity,
  UpsertOneEntitySuccess,
  UpsertOneEntityFail,
  UpsertManyEntities,
  UpsertManyEntitiesSuccess,
  UpsertManyEntitiesFail,
  LoadEntities,
  LoadEntitiesSuccess,
  LoadEntitiesFail,
  LoadEntitiesResolved,
} from './dynamic.actions';

export class ActionFactory<T> {
  constructor(private entity: string) { }

  resetState(): DynamicActions<T> {
    return new ResetState(this.entity);
  }

  clearSelectedId(): DynamicActions<T> {
    return new ClearSelectedId(this.entity);
  }

  selectId(key: string): DynamicActions<T> {
    return new SelectEntityId<T>(this.entity, key);
  }

  /**
   * ADD ONE
   */
  addOne(entity: T): DynamicActions<T> {
    return new AddOneEntity<T>(this.entity, entity);
  }

  addOneSuccess(entity: T): DynamicActions<T> {
    return new AddOneEntitySuccess<T>(this.entity, entity);
  }

  addOneFail(error: HttpErrorResponse): DynamicActions<T> {
    return new AddOneEntityFail<T>(this.entity, error);
  }

  /**
   * ADD MANY
   */
  addMany(entities: T[]): DynamicActions<T> {
    return new AddManyEntities<T>(this.entity, entities);
  }

  addManySuccess(entities: T[]): DynamicActions<T> {
    return new AddManyEntitiesSuccess<T>(this.entity, entities);
  }

  addManyFail(error: HttpErrorResponse): DynamicActions<T> {
    return new AddManyEntitiesFail<T>(this.entity, error);
  }

  /**
   * ADD ALL
   */
  addAll(entities: T[]): DynamicActions<T> {
    return new AddAllEntities<T>(this.entity, entities);
  }

  addAllSuccess(entities: T[]): DynamicActions<T> {
    return new AddAllEntitiesSuccess<T>(this.entity, entities);
  }

  addAllFail(error: HttpErrorResponse): DynamicActions<T> {
    return new AddAllEntitiesFail<T>(this.entity, error);
  }

  /**
   * REMOVE ONE
   */
  removeOne(entityId: string): DynamicActions<T> {
    return new RemoveOneEntity<T>(this.entity, entityId);
  }

  removeOneSuccess(entityId: string): DynamicActions<T> {
    return new RemoveOneEntitySuccess<T>(this.entity, entityId);
  }

  removeOneFail(error: HttpErrorResponse): DynamicActions<T> {
    return new RemoveOneEntityFail<T>(this.entity, error);
  }

  /**
   * REMOVE MANY
   */
  removeMany(entityIds: string[]): DynamicActions<T> {
    return new RemoveManyEntities<T>(this.entity, entityIds);
  }

  removeManySuccess(entityIds: string[]): DynamicActions<T> {
    return new RemoveManyEntitiesSuccess<T>(this.entity, entityIds);
  }

  removeManyFail(error: HttpErrorResponse): DynamicActions<T> {
    return new RemoveManyEntitiesFail<T>(this.entity, error);
  }

  /**
   * REMOVE ALL
   */
  removeAll(): DynamicActions<T> {
    return new RemoveAllEntities<T>(this.entity);
  }

  removeAllSuccess(): DynamicActions<T> {
    return new RemoveAllEntitiesSuccess<T>(this.entity);
  }

  removeAllFail(error: HttpErrorResponse): DynamicActions<T> {
    return new RemoveAllEntitiesFail<T>(this.entity, error);
  }

  /**
   * UPDATE ONE
   */
  updateOne(entity: T): DynamicActions<T> {
    return new UpdateOneEntity<T>(this.entity, entity);
  }

  updateOneSuccess(entity: T): DynamicActions<T> {
    return new UpdateOneEntitySuccess<T>(this.entity, entity);
  }

  updateOneFail(error: HttpErrorResponse): DynamicActions<T> {
    return new UpdateOneEntityFail<T>(this.entity, error);
  }

  /**
   * UPDATE MANY
   */
  updateMany(entities: T[]): DynamicActions<T> {
    return new UpdateManyEntities<T>(this.entity, entities);
  }

  updateManySuccess(entities: T[]): DynamicActions<T> {
    return new UpdateManyEntitiesSuccess<T>(this.entity, entities);
  }

  updateManyFail(error: HttpErrorResponse): DynamicActions<T> {
    return new UpdateManyEntitiesFail<T>(this.entity, error);
  }

  /**
   * UPSERT ONE
   */
  upsertOne(entity: T): DynamicActions<T> {
    return new UpsertOneEntity<T>(this.entity, entity);
  }

  upsertOneSuccess(entity: T): DynamicActions<T> {
    return new UpsertOneEntitySuccess<T>(this.entity, entity);
  }

  upsertOneFail(error: HttpErrorResponse): DynamicActions<T> {
    return new UpsertOneEntityFail<T>(this.entity, error);
  }

  /**
   * UPSERT MANY
   */
  upsertMany(entities: T[]): DynamicActions<T> {
    return new UpsertManyEntities<T>(this.entity, entities);
  }

  upsertManySuccess(entities: T[]): DynamicActions<T> {
    return new UpsertManyEntitiesSuccess<T>(this.entity, entities);
  }

  upsertManyFail(error: HttpErrorResponse): DynamicActions<T> {
    return new UpsertManyEntitiesFail<T>(this.entity, error);
  }

  /**
   * LOAD ENTITIES
   */

  load(query: Object, force = false): DynamicActions<T> {
     return new LoadEntities<T>(this.entity, { query, force });
   }

  loadResolved(): DynamicActions<T> {
    return new LoadEntitiesResolved<T>(this.entity);
  }

  loadSuccess(entities: T[]): DynamicActions<T> {
    return new LoadEntitiesSuccess<T>(this.entity, entities);
  }

  loadFail(error: HttpErrorResponse): DynamicActions<T> {
    return new LoadEntitiesFail<T>(this.entity, error);
  }

}

