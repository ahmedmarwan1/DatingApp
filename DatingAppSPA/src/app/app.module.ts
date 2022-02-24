import { MessagesResolver } from './_resolvers/messages.resolver';
import { ListsResolver } from './_resolvers/lists.resolver';
import { PreventUnsavedChages } from './_guards/prevent-unsaved-chages.guard';
import { MemberEditComponent } from './members/member-Edit/member-Edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './_services/user.service';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { AlertifyService } from './_services/alertify.service';
import { AuthService } from './_services/auth.service';
import { HttpModule} from '@angular/http';
import { NgModule, Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MemberListComponent } from './members/member-list/member-list.component';
import { AuthGuard } from './auth.guard';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HttpClientModule} from '@angular/common/http';
import { NgxGalleryModule, NgxGalleryComponent } from '@kolkov/ngx-gallery';import { MemberEditResolver } from './_resolvers/member-Edit.resolver';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

@NgModule({
  declarations: [			
    AppComponent,
      NavComponent,
      HomeComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailsComponent,
      MemberEditComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MemberMessagesComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    TabsModule.forRoot(),
    HttpClientModule,
    NgxGalleryModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot()
  ],
  providers: [ 
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChages,
    ListsResolver,
    MessagesResolver
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
