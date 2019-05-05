import { ActionFactory } from '../actions/action-factory';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  selectAllEntities,
  selectEntityObjects,
  selectTotalCount,
  selectAllIds,
  getSelectedEntityId,
  isLoaded,
  isLoading,
} from '../selectors/dynamic.selectors';
import { Dictionary } from '@ngrx/entity';
import { EntityConfig } from '../dynamic-ngrx.models';

export class DynamicFacade<T> {
  actions: ActionFactory<T>;

  objects$: Observable<Dictionary<T>>;
  // entities$: Observable<T[]>;
  entities$: BehaviorSubject<T[]> = new BehaviorSubject([]);
  ids$: Observable<string[]>;
  total$: Observable<number>;
  // selectedEntity$: Observable<T>;
  selectedEntity$: BehaviorSubject<T> = new BehaviorSubject(undefined);
  selectedEntityId$: Observable<string>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    private entityConfig: EntityConfig<T>,
    private store: Store<T>,
  ) {
    this.actions = new ActionFactory<T>(this.entityConfig.entity);

    /**
     * I'd love to figure out how to resolve the types on these selectors, but I'm confounded. But I know
     * these work, so I'm going to leave it for now
     */
    this.objects$ = this.store.select(selectEntityObjects<T>(entityConfig) as any) as any;
    this.store.select(selectAllEntities<T>(entityConfig) as any)
      .subscribe((entities: any) => {
        this.entities$.next(entities);
      });

    // this.entities$ = this.store.select(selectAllEntities<T>(entityConfig) as any) as any;
    this.total$ = this.store.select(selectTotalCount<T>(entityConfig) as any) as any;
    this.ids$ = this.store.select(selectAllIds<T>(entityConfig) as any) as any;
    this.selectedEntityId$ = this.store.select(getSelectedEntityId<T>(entityConfig) as any) as any;
    this.loaded$ = this.store.select(isLoaded<T>(entityConfig) as any) as any;
    this.loading$ = this.store.select(isLoading<T>(entityConfig) as any) as any;

    this.selectedEntityId$
      .pipe(
        withLatestFrom(this.objects$),
        map(([selectedId, entities]: [string, Dictionary<T>]) => (entities || {} as any)[selectedId]),
      )
      .subscribe((entity: T) => this.selectedEntity$.next(entity));
  }

  get entities(): T[] { return this.entities$.getValue(); }
  get selectedEntity(): T { return this.selectedEntity$.getValue(); }
}

