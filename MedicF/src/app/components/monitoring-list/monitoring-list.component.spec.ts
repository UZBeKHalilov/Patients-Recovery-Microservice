import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringListComponent } from './monitoring-list.component';

describe('MonitoringListComponent', () => {
  let component: MonitoringListComponent;
  let fixture: ComponentFixture<MonitoringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitoringListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
