import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductsAdminComponent } from './show-products-admin.component';

describe('ShowProductsAdminComponent', () => {
  let component: ShowProductsAdminComponent;
  let fixture: ComponentFixture<ShowProductsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductsAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
