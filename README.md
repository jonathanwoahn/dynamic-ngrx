# About This Project
This library is for anyone who wants to use NGRX in their project, but doesn't want to go through the insane headache
of managing all the actions, reducers, entities, selectors, effects and stores.

The goal of this project is to add all that functionality to your project with less than 5 lines of code (including config).

## Table of Contents
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Reference](#reference)
- [Known Issues](#known-issues)
- [Roadmap](#roadmap)

## Demo
Check it out in action on [stackblitz](https://stackblitz.com/edit/angular-1al2rp)

## Installation
To install, run
`npm i dynamic-ngrx --save`

The project also has the following dependencies
`@ngrx/effects @ngrx/entity @ngrx/router-store @ngrx/store @ngrx-devtools ngrx-store-logger`

## Quick Start
In your Angular `AppModule`

You'll need to add the dependency, create the config file, and pass it in as a parameter to `.forRoot` on the module

```javascript
import { DynamicNgrxModule, DynamicStoreConfig } from 'dynamic-ngrx';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

const config: DynamicStoreConfig = {
  entities: [
    { entity: 'Todo', },
  ],
};
```
- Import the configuration to the `.forRoot` method on the DynamicNgrxModule
```javascript
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DynamicNgrxModule.forRoot(config),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Usage in templates and services
In your templates and services, the main thing you'll need to do is import the `DynamicFacadeService`.
You pass in the interface you're working with, as well as the entity name, and it will return a facade
for that particular entity. You'll access all your required functions for the entity through the facade.

The example code below demonstrates how to access the entity observable, as well as dispatch two simple actions.

```javascript
export class AppComponent {
  @ViewChild('todoInput') todoInput: ElementRef;

  todos$: Observable<Todo[]>;

  private todoFacade: DynamicFacade<Todo>;
  constructor(
    private dynamicFacadeService: DynamicFacadeService,
    private store: Store<any>,
  ) {
    this.todoFacade = this.dynamicFacadeService.getFacade<Todo>('Todo');
    this.todos$ = this.todoFacade.entities$;
  }

  addTodo(event): void {
    if (event.keyCode !== 13) { return; }
    const todo: Todo = {
      id: uuid(),
      text: this.todoInput.nativeElement.value,
    };
    this.store.dispatch(this.todoFacade.actions.addOne(todo));
    this.todoInput.nativeElement.value = '';
  }

  removeTodo(todo: Todo): void {
    this.store.dispatch(this.todoFacade.actions.removeOne(todo.id));
  }
}

```


# Reference
## Introduction
This library is well suited for anyone that wants to use NGRX to manage large amount of entities,
and wants standard CRUD type functionality with those entities.

The main benefits of this library, our of the box, are:
- Immediate connectivity of Redux Dev Tools
- Detailed Action Logging
- Offline Sync
- Rapidly add new entities
- Full CRUD functionality for all entities
- All entity adaptors accessible
- Easily connect with external data providers


### DynamicNgrxModule

The `DynamicNgrxModule` accepts a `config` object `<DynamicStoreConfig>` upon import. 

### DynamicStoreConfig

| Property | Type | Description|
|:---------|:-----|:-----------|
|`entities`| `EntityConfig[]` | Array of entity configs|
|`syncEntities`|`string[]`| If you have additional entities managed by NGRX that are not being managed by Dynamic NGRX, add them here and it will ensure the data gets persisted (i.e. `auth` or personal account settings)|
|`enableOfflineSync`|boolean|Defaults to false. If you set this to true, all the Dynamic NGRX entities will be synchronized to localstorage|
|`enableLogging`|boolean|Defaults to true|

### EntityConfig

| Property | Type | Description|
|:---------|:-----|:-----------|
|`entity`| string | The name of the entity as you want it to exist in your state. Capitalization is important here |
|`entityKey`|string| If the key in your entity is something other than `id`|
|`dataService`|Angular Service| An Angular Injectable() service that extends the `<DefaultDataService>`. The data service you add will access your remote server settings. If this is left blank, then Dynamic NGRX will bypass any remote connections, and store the data immediately to the state|
|`persist`|boolean|Defaults to true. Set to false if you don't want this entity to persists to localstorage|

### DefaultDataService
The default data service handles the effects for every entity, unless otherwise specified. As described in `EntityConfig`, you can extend the default data service to integrate with an external API to handle the actions.

more readme to come ...


## Known Issues
The main issue I'm aware of at this time is the library throws an error when you try to build it using `--prod` or `--aot`.
I have spent many hours trying to troubleshoot and resolve the error, so I would love some help figuring out why this is failing.
In the mean time, if you build your project with any other settings, it should work just fine.

## Roadmap
- Convert offline mode to work with IndexedDB instead of Localstorage
- Depending on popularity, testing
