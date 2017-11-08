import { NgModule } from '@angular/core';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';

import schema from './schema';

@NgModule({
  exports: [
    ApolloModule
  ]
})
export class GraphQLModule {
  constructor(
    apollo: Apollo
  ) {
    // create Apollo
    apollo.create({
      link: withClientState(schema),
      cache: new InMemoryCache()
    });
  }
}
