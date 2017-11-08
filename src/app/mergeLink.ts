import { ApolloLink, Observable } from "apollo-link";
import { HttpLink } from 'apollo-link-http';
import { graphql, GraphQLSchema } from "graphql";
import { print } from "graphql/language/printer";

import {
  introspectSchema,
  makeExecutableSchema,
  makeRemoteExecutableSchema,
  mergeSchemas,
} from 'graphql-tools';

import { clientSchema } from './schema/client-schema';
import { resolvers } from './schema/messages';
import { remoteSchemaExtension } from './schema/remoteSchemaExtension';

const localExecutableSchema = makeExecutableSchema({
  typeDefs: [clientSchema],
  resolvers,
});

async function getRemoteSchema() {

  const remoteHttpLink = new HttpLink({ uri: "https://xl54rr13l.lp.gql.zone/graphql" });

  const remoteSchema = await introspectSchema(remoteHttpLink);

  const remoteExecutableSchema = await makeRemoteExecutableSchema({
    schema: remoteSchema,
    link: remoteHttpLink
  });

  return remoteExecutableSchema;
}


const schemaPromise = new Promise((resolve, reject) => {
  getRemoteSchema().then((remoteSchema) => {
    const schema = mergeSchemas({
      schemas: [localExecutableSchema, remoteSchema, remoteSchemaExtension],
    });

    resolve(schema);
  });
});

export const mergeLink = (cache) => new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    const { query, variables, operationName } = operation;
    schemaPromise.then((schema: GraphQLSchema) => {
      graphql(schema, print(query), {}, { cache }, variables, operationName)
        .then(result => {
          observer.next(result);
          observer.complete(result);
        })
        .catch(e => observer.error(e));
    });
  });
});