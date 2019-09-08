import { NgModule } from "@angular/core";

import { Apollo, ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloClient } from 'apollo-client';

@NgModule({
    imports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule,
        BrowserModule
    ],
    providers: [{
        provide: APOLLO_OPTIONS,
        useFactory(httpLink: HttpLink) {
                const apiURI = "https://api.graph.cool/simple/v1/cjshuqw7y01vw0167ww73e63q";//não importa
                const http = httpLink.create({ uri: apiURI });
                return {
                cache: new InMemoryCache(),
                link: http
            
          }
        },
        deps: [HttpLink]
      }],
})

export class ApolloConfigModule{}
/* @NgModule({
    imports: [
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ]
})

export class ApolloConfigModule{
     constructor(private apollo: Apollo, private httpLink: HttpLink){
         const apiURI = "https://api.graph.cool/simple/v1/cjshuqw7y01vw0167ww73e63q";
         const http = httpLink.create({ uri: apiURI });

         apollo.create({
             link:http,
             cache: new InMemoryCache()
         })
     }
}
 */