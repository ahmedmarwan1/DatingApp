import { MessagesResolver } from './_resolvers/messages.resolver';
import { ListsResolver } from './_resolvers/lists.resolver';
import { PreventUnsavedChages } from './_guards/prevent-unsaved-chages.guard';
import { MemberEditResolver } from './_resolvers/member-Edit.resolver';
import { MemberEditComponent } from './members/member-Edit/member-Edit.component';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ListsComponent } from './lists/lists.component';
export const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailsComponent, resolve: {user : MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver} , canDeactivate: [PreventUnsavedChages]},
            {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
        ]
    },
    {path: '**', redirectTo: 'home', pathMatch:'full'}
];