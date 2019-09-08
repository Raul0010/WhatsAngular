import { NgModule, Optional, SkipSelf } from '@angular/core';

import { AppRoutingModule } from './../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './../graphql.module';
import { ApolloConfigModule } from './../apollo-config.module';
import { Title } from '@angular/platform-browser';

@NgModule({
  exports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    ApolloConfigModule,
    GraphQLModule
  ],
  providers: [
    Title
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule){
    if (parentModule){
      throw new Error('CoreModule is already loaded. Import it only in the AppModule.');
    }
  }
}
