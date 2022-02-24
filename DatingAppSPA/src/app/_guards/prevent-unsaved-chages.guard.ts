import { MemberEditComponent } from './../members/member-Edit/member-Edit.component';
import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";

@Injectable()
export class PreventUnsavedChages implements CanDeactivate <MemberEditComponent>{
    canDeactivate(Component: MemberEditComponent){
        if(Component.editForm.dirty){
            return confirm('Are you sure you want to continue? your changes will be lost');
        }
        return true
    }
}