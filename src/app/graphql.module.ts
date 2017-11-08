import { NgModule } from '@angular/core';
// Apollo
import { ApolloModule, Apollo } from 'apollo-angular';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http';

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

    const remoteHttpLink = new HttpLink({ uri: "https://xl54rr13l.lp.gql.zone/graphql" });

    const local = withClientState(schema);
    // create Apollo
    apollo.create({
      link: local.concat(remoteHttpLink),
      cache: new InMemoryCache()
    });
  }
}
