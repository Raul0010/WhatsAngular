import {NgModule, Inject} from '@angular/core';
import {Apollo, ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { onError } from "apollo-link-error";
import { ApolloLink, Operation } from 'apollo-link';
import { StorageKeys } from './storage-keys';
import { HttpHeaders } from '@angular/common/http';
import { GRAPHCOOL_CONFIG, graphcoolConfig, GraphcoolConfig } from './core/providers/graphcool-config.provider';

//Tratamento de erros
const linkError = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) => 
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware: ApolloLink = new ApolloLink((operation: Operation, forward) => {
  
  const Token = window.localStorage.getItem(StorageKeys.AUTH_TOKEN);

  operation.setContext({
    headers: new HttpHeaders({
      'Authorization': `Bearer ${Token}`
    })
  });
  
  return forward(operation);
});

//Criação do apollo
//const uri = "https://api.graph.cool/simple/v1/cjshuqw7y01vw0167ww73e63q"; // <-- add the URL of the GraphQL server here
const uri = graphcoolConfig.simpleAPI;
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({uri})
  return {
    link: ApolloLink.from([linkError, authMiddleware.concat(http)]),
    cache: new InMemoryCache(),
    connectToDevTools: !environment.production
  };
};

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
