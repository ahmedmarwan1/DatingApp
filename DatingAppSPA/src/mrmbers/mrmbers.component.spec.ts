/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MrmbersComponent } from './mrmbers.component';

describe('MrmbersComponent', () => {
  let component: MrmbersComponent;
  let fixture: ComponentFixture<MrmbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrmbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrmbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
