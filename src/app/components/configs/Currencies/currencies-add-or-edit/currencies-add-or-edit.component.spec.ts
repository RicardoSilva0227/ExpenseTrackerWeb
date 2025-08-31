import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesAddOrEditComponent } from './currencies-add-or-edit.component';

describe('CurrenciesAddOrEditComponent', () => {
  let component: CurrenciesAddOrEditComponent;
  let fixture: ComponentFixture<CurrenciesAddOrEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesAddOrEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrenciesAddOrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
