import { ComponentFixture, TestBed } from '@angular/core/testing';

import { About } from './about';

describe('About', () => {
  let component: About;
  let fixture: ComponentFixture<About>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [About]
    })
    .compileComponents();

    fixture = TestBed.createComponent(About);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise certActiveIndex to 0', () => {
    expect(component.certActiveIndex).toBe(0);
  });

  it('certNext should advance the active index', () => {
    component.certGoTo(0);
    component.certNext();
    expect(component.certActiveIndex).toBe(1);
  });

  it('certPrev wraps around to last cert from index 0', () => {
    component.certGoTo(0);
    component.certPrev();
    expect(component.certActiveIndex).toBe(component.certifications.length - 1);
  });

  it('certNext wraps around to 0 from last index', () => {
    component.certGoTo(component.certifications.length - 1);
    component.certNext();
    expect(component.certActiveIndex).toBe(0);
  });

  it('certGoTo clamps to valid bounds', () => {
    component.certGoTo(-5);
    expect(component.certActiveIndex).toBe(0);
    component.certGoTo(9999);
    expect(component.certActiveIndex).toBe(component.certifications.length - 1);
  });

  it('certifications should have the first entry as the most impactful (tier 1)', () => {
    expect(component.certifications[0].tier).toBe(1);
  });

  it('stats array should have 4 entries', () => {
    expect(component.stats.length).toBe(4);
  });
});