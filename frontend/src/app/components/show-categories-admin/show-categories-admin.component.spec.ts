import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCategoriesAdminComponent } from './show-categories-admin.component';

describe('ShowCategoriesAdminComponent', () => {
  let component: ShowCategoriesAdminComponent;
  let fixture: ComponentFixture<ShowCategoriesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCategoriesAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
