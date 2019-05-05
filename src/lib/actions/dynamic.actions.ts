import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { DynamicActionTypes, DynamicActionResults } from './dynamic-action.models';

export function getDynamicActionType(entity: string, type: DynamicActionTypes, result?: DynamicActionResults): string {
  const text = `[${entity}] ${type}`;
  return !!result ? `${text} ${result}` : text;
}

class DynamicAction implements Action {
  readonly type: string;
  constructor(entity: string, type: DynamicActionTypes, result?: DynamicActionResults) {
    this.type = getDynamicActionType(entity, type, result);
  }
}

/**
 * ADD ONE ENTITY ACTIONS
 */
export class AddOneEntity<T> extends DynamicAction {
  constructor(private entity: string, public payload: T) {
    super(entity, DynamicActionTypes.addOne);
  }
}

export class AddOneEntitySuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T) {
    super(entity, DynamicActionTypes.addOne, DynamicActionResults.success);
  }
}

export class AddOneEntityFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.addOne, DynamicActionResults.fail);
  }
}

/**
 * ADD MANY ENTITIES ACTIONS
 */
export class AddManyEntities<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.addMany);
  }
}

export class AddManyEntitiesSuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.addMany, DynamicActionResults.success);
  }
}

export class AddManyEntitiesFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.addMany, DynamicActionResults.fail);
  }
}

/**
 * ADD ALL ENTITIES ACTIONS
 */
export class AddAllEntities<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.addAll);
  }
}

export class AddAllEntitiesSuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.addAll, DynamicActionResults.success);
  }
}

export class AddAllEntitiesFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.addAll, DynamicActionResults.fail);
  }
}

/**
 * REMOVE ONE ENTITY ACTIONS
 */

export class RemoveOneEntity<T> extends DynamicAction {
  constructor(private entity: string, public payload: string) {
    super(entity, DynamicActionTypes.removeOne);
  }
}

export class RemoveOneEntitySuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: string) {
    super(entity, DynamicActionTypes.removeOne, DynamicActionResults.success);
  }
}

export class RemoveOneEntityFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.removeOne, DynamicActionResults.fail);
  }
}

/**
 * REMOVE MANY ENTITY ACTIONS
 */

export class RemoveManyEntities<T> extends DynamicAction {
  constructor(private entity: string, public payload: string[]) {
    super(entity, DynamicActionTypes.removeMany);
  }
}

export class RemoveManyEntitiesSuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: string[]) {
    super(entity, DynamicActionTypes.removeMany, DynamicActionResults.success);
  }
}

export class RemoveManyEntitiesFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.removeMany, DynamicActionResults.fail);
  }
}

/**
 * REMOVE ALL ENTITIES ACTIONS
 */
export class RemoveAllEntities<T> extends DynamicAction {
  constructor(private entity: string, public payload?: any) {
    super(entity, DynamicActionTypes.removeAll);
  }
}

export class RemoveAllEntitiesSuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload?: any) {
    super(entity, DynamicActionTypes.removeAll, DynamicActionResults.success);
  }
}

export class RemoveAllEntitiesFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.removeAll, DynamicActionResults.fail);
  }
}

/**
 * UPDATE ONE ENTITY ACTIONS
 */
export class UpdateOneEntity<T> extends DynamicAction {
  constructor(private entity: string, public payload: T) {
    super(entity, DynamicActionTypes.updateOne);
  }
}

export class UpdateOneEntitySuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T) {
    super(entity, DynamicActionTypes.updateOne, DynamicActionResults.success);
  }
}

export class UpdateOneEntityFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.updateOne, DynamicActionResults.fail);
  }
}

/**
 * UPDATE MANY ENTITIES ACTIONS
 */
export class UpdateManyEntities<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.updateMany);
  }
}

export class UpdateManyEntitiesSuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.updateMany, DynamicActionResults.success);
  }
}

export class UpdateManyEntitiesFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.updateMany, DynamicActionResults.fail);
  }
}

/**
 * UPSERT ONE ENTITY ACTIONS
 */
export class UpsertOneEntity<T> extends DynamicAction {
  constructor(private entity: string, public payload: T) {
    super(entity, DynamicActionTypes.upsertOne);
  }
}

export class UpsertOneEntitySuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T) {
    super(entity, DynamicActionTypes.upsertOne, DynamicActionResults.success);
  }
}

export class UpsertOneEntityFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.upsertOne, DynamicActionResults.fail);
  }
}

/**
 * UPSERT MANY ENTITIES ACTIONS
 */
export class UpsertManyEntities<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.upsertMany);
  }
}

export class UpsertManyEntitiesSuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.upsertMany, DynamicActionResults.success);
  }
}

export class UpsertManyEntitiesFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.upsertMany, DynamicActionResults.fail);
  }
}

/**
 * SELECT AND RESET
 */
export class SelectEntityId<T> extends DynamicAction {
  constructor(private entity: string, public payload: string) {
    super(entity, DynamicActionTypes.selectId);
  }
}

export class ClearSelectedId<T> extends DynamicAction {
  constructor(private entity: string, public payload?: any) {
    super(entity, DynamicActionTypes.selectId, DynamicActionResults.clear);
  }
}

export class ResetState<T> extends DynamicAction {
  constructor(private entity: string, public payload?: any) {
    super(entity, DynamicActionTypes.resetState);
  }
}

/**
 * LOAD ENTITIES
 */

export class LoadEntities<T> extends DynamicAction {
  constructor(private entity: string, public payload: { query: Object, force: boolean }) {
    super(entity, DynamicActionTypes.load);
  }
}

export class LoadEntitiesSuccess<T> extends DynamicAction {
  constructor(private entity: string, public payload: T[]) {
    super(entity, DynamicActionTypes.load, DynamicActionResults.success);
  }
}

export class LoadEntitiesFail<T> extends DynamicAction {
  constructor(private entity: string, public payload: HttpErrorResponse) {
    super(entity, DynamicActionTypes.load, DynamicActionResults.fail);
  }
}

export class LoadEntitiesResolved<T> extends DynamicAction {
  constructor(private entity: string, public payload?: any) {
    super(entity, DynamicActionTypes.load, DynamicActionResults.resolved);
  }
}

export const RESET_ALL = '[Dynamic NGRX] Reset All Entities State';
export class ResetAllEntitiesState implements Action {
  readonly type = RESET_ALL;
  constructor(public payload?: any) {}
}

/**
 * Add the rest of the actions in here
 */

export type DynamicActions<T> =
  // ADD
  | AddOneEntity<T>
  | AddOneEntitySuccess<T>
  | AddOneEntityFail<T>
  | AddManyEntities<T>
  | AddManyEntitiesSuccess<T>
  | AddManyEntitiesFail<T>
  | AddAllEntities<T>
  | AddAllEntitiesSuccess<T>
  | AddAllEntitiesFail<T>
  // REMOVE
  | RemoveOneEntity<T>
  | RemoveOneEntitySuccess<T>
  | RemoveOneEntityFail<T>
  | RemoveManyEntities<T>
  | RemoveManyEntitiesSuccess<T>
  | RemoveManyEntitiesFail<T>
  | RemoveAllEntities<T>
  | RemoveAllEntitiesSuccess<T>
  | RemoveAllEntitiesFail<T>
  // UPDATE
  | UpdateOneEntity<T>
  | UpdateOneEntitySuccess<T>
  | UpdateOneEntityFail<T>
  | UpdateManyEntities<T>
  | UpdateManyEntitiesSuccess<T>
  | UpdateManyEntitiesFail<T>
  // UPSERT
  | UpsertOneEntity<T>
  | UpsertOneEntitySuccess<T>
  | UpsertOneEntityFail<T>
  | UpsertManyEntities<T>
  | UpsertManyEntitiesSuccess<T>
  | UpsertManyEntitiesFail<T>
  // Select, clear, reset
  | SelectEntityId<T>
  | ClearSelectedId<T>
  | ResetState<T>
  // LOAD
  | LoadEntities<T>
  | LoadEntitiesSuccess<T>
  | LoadEntitiesFail<T>
  | LoadEntitiesResolved<T>
  ;
