import { Headers } from '@angular/http';
import { JwtModule, JWT_OPTIONS } from "@auth0/angular-jwt";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
 
export function tokenGetter() {
  return localStorage.getItem("access_token");
}
 
@NgModule({
  imports: [
    // ...
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
})
export class AppModule {}
