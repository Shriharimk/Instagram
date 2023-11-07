

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { HoverEffectDirective } from './hover-effect.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div appHoverEffect></div>
  `,
})
class TestComponent {}

describe('HoverEffectDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;
  let directive: HoverEffectDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HoverEffectDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.directive(HoverEffectDirective));
    directive = debugElement.injector.get(HoverEffectDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should apply scaling transformation on mouseenter', () => {
    const element = debugElement.nativeElement;

    // Simulate mouseenter event
    const event = new MouseEvent('mouseenter');
    debugElement.triggerEventHandler('mouseenter', event);
    fixture.detectChanges(); // Update the view

    const transformedValue = element.style.transform;
    expect(transformedValue).toContain('scale(1.1)');
  });

  it('should reset scaling transformation on mouseleave', () => {
    const element = debugElement.nativeElement;

    // Simulate mouseenter event
    const enterEvent = new MouseEvent('mouseenter');
    debugElement.triggerEventHandler('mouseenter', enterEvent);
    fixture.detectChanges(); // Update the view

    // Simulate mouseleave event
    const leaveEvent = new MouseEvent('mouseleave');
    debugElement.triggerEventHandler('mouseleave', leaveEvent);
    fixture.detectChanges(); // Update the view

    const transformedValue = element.style.transform;
    expect(transformedValue).toContain('scale(1)');
  });
});
