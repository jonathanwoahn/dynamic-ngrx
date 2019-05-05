import { IDynamicDataService } from './../services/default-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionFactoryService } from './../actions/action-factory.service';
import { DynamicActions } from './../actions/dynamic.actions';
import { DefaultDataService } from '../services/default-data.service';
import { Actions, Effect, ofType, OnIdentifyEffects } from '@ngrx/effects';
import { getDynamicActionType } from '../actions/dynamic.actions';
import { DynamicActionTypes } from '../actions/dynamic-action.models';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { ActionFactory } from '../actions/action-factory';
import { of } from 'rxjs';
import { EntityConfig } from '../dynamic-ngrx.models';
import { Store } from '@ngrx/store';
import { isLoaded } from '../selectors/dynamic.selectors';
import { DynamicState } from '../reducers/dynamic.reducer';

export class DynamicEffect<T> implements OnIdentifyEffects {
  private entityActions: ActionFactory<T>;

  @Effect()
  addOne$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.addOne)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.addOneEntity(action.payload)
          .pipe(
            map((entity: T) => this.entityActions.addOneSuccess(entity)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.addOneFail(error))),
          );
      }),
    );

  @Effect()
  addMany$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.addMany)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.addManyEntities(action.payload)
          .pipe(
            map((entities: T[]) => this.entityActions.addManySuccess(entities)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.addManyFail(error))),
          );
      }),
    );

  @Effect()
  addAll$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.addAll)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.addAllEntities(action.payload)
          .pipe(
            map((entities: T[]) => this.entityActions.addAllSuccess(entities)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.addAllFail(error))),
          );
      }),
    );

  @Effect()
  removeOne$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.removeOne)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.removeOneEntity(action.payload)
          .pipe(
            map((entity: string) => this.entityActions.removeOneSuccess(entity)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.removeOneFail(error))),
          );
      }),
    );

  @Effect()
  removeMany$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.removeMany)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.removeManyEntities(action.payload)
          .pipe(
            map((entity: string[]) => this.entityActions.removeManySuccess(entity)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.removeManyFail(error))),
          );
      }),
    );

  @Effect()
  removeAll$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.removeAll)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.removeAllEntities()
          .pipe(
            map(() => this.entityActions.removeAllSuccess()),
            catchError((error: HttpErrorResponse) => of(this.entityActions.removeAllFail(error))),
          );
      }),
    );

  @Effect()
  updateOne$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.updateOne)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.updateOneEntity(action.payload)
          .pipe(
            map((entity: T) => this.entityActions.updateOneSuccess(entity)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.updateOneFail(error))),
          );
      }),
    );

  @Effect()
  updateMany$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.updateMany)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.updateManyEntities(action.payload)
          .pipe(
            map((entities: T[]) => this.entityActions.updateManySuccess(entities)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.updateManyFail(error))),
          );
      }),
    );

  @Effect()
  upsertOne$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.upsertOne)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.upsertOneEntity(action.payload)
          .pipe(
            map((entity: T) => this.entityActions.upsertOneSuccess(entity)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.upsertOneFail(error))),
          );
      }),
    );

  @Effect()
  upsertMany$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.upsertMany)),
      switchMap((action: DynamicActions<T>) => {
        return this.dataService.upsertManyEntities(action.payload)
          .pipe(
            map((entities: T[]) => this.entityActions.upsertManySuccess(entities)),
            catchError((error: HttpErrorResponse) => of(this.entityActions.upsertManyFail(error))),
          );
      }),
    );

  @Effect()
  load$ = this.actions$
    .pipe(
      ofType(getDynamicActionType(this.entityConfig.entity, DynamicActionTypes.load)),
      withLatestFrom(this.store.select(isLoaded<T>(this.entityConfig) as any)),
      switchMap(([action, entitiesLoaded]: [DynamicActions<T>, boolean]) => {
        if (action.payload.force || !entitiesLoaded) {
          return this.dataService.load(action.payload.query)
            .pipe(
              map((entities: T[]) => this.entityActions.loadSuccess(entities)),
              catchError((error: HttpErrorResponse) => of(this.entityActions.loadFail(error))),
            );
        }
        return of(this.entityActions.loadResolved());
      }),
    );

  constructor(
    private entityConfig: EntityConfig<T>,
    private actions$: Actions,
    private dataService: IDynamicDataService<T>,
    private actionFactory: ActionFactoryService,
    private store: Store<DynamicState<T>>,
  ) {
    this.entityActions = this.actionFactory.getEntityActions<T>(this.entityConfig.entity);
  }

  // This method is used by the parent class to differentiate between
  // the different classes that are calling on the exact same effects
  ngrxOnIdentifyEffects(): string {
    return this.entityConfig.entity;
  }
}
