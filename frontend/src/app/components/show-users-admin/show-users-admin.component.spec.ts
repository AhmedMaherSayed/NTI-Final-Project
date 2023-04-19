import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersAdminComponent } from './show-users-admin.component';

describe('ShowUsersAdminComponent', () => {
  let component: ShowUsersAdminComponent;
  let fixture: ComponentFixture<ShowUsersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUsersAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowUsersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
