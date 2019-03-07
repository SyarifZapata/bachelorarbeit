import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedsContainerComponent } from './feeds-container.component';

describe('FeedsContainerComponent', () => {
  let component: FeedsContainerComponent;
  let fixture: ComponentFixture<FeedsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
