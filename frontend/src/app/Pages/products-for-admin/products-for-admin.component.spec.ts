import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsForAdminComponent } from './products-for-admin.component';

describe('ProductsForAdminComponent', () => {
  let component: ProductsForAdminComponent;
  let fixture: ComponentFixture<ProductsForAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsForAdminComponent]
    });
    fixture = TestBed.createComponent(ProductsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
