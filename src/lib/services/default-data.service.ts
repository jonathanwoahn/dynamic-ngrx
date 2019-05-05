import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IDynamicDataService<T> {
  entity: string;
  addOneEntity?(entity: T): Observable<T>;
  addManyEntities?(entities: T[]): Observable<T[]>;
  addAllEntities?(entities: T[]): Observable<T[]>;
  removeOneEntity?(entityId: string): Observable<string>;
  removeManyEntities?(entityIds: string[]): Observable<string[]>;
  removeAllEntities?(): Observable<null>;
  updateOneEntity?(entity: T): Observable<T>;
  updateManyEntities?(entities: T[]): Observable<T[]>;
  upsertOneEntity?(entity: T): Observable<T>;
  upsertManyEntities?(entities: T[]): Observable<T[]>;
  load?(force?: boolean, query?: Object): Observable<T[]>;
}

@Injectable()
export class DefaultDataService<T> implements IDynamicDataService<T> {
  entity: string;
  addOneEntity(entity: T): Observable<T> {
    return of(entity);
  }

  addManyEntities(entities: T[]): Observable<T[]> {
    return of(entities);
  }

  addAllEntities(entities: T[]): Observable<T[]> {
    return of(entities);
  }

  removeOneEntity(entityId: string): Observable<string> {
    return of(entityId);
  }

  removeManyEntities(entityIds: string[]): Observable<string[]> {
    return of(entityIds);
  }

  removeAllEntities(): Observable<null> {
    return of(null);
  }

  updateOneEntity(entity: T): Observable<T> {
    return of(entity);
  }

  updateManyEntities(entities: T[]): Observable<T[]> {
    return of(entities);
  }

  upsertOneEntity(entity: T): Observable<T> {
    return of(entity);
  }

  upsertManyEntities(entities: T[]): Observable<T[]> {
    return of(entities);
  }

  load(query: Object): Observable<T[]> {
    return of([]);
  }
}
