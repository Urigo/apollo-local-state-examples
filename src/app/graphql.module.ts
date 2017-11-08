import { NgModule } from '@angular/core';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { mergeLink } from './mergeLink'

@NgModule({
  exports: [
    ApolloModule
  ]
})
export class GraphQLModule {
  constructor(apollo: Apollo) {

    const myCache = new InMemoryCache();
    apollo.create({
      link: mergeLink(myCache),
      cache: myCache
    });
  }
}
