import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private router: Router, private loginSheet: MatBottomSheet ){}

  onGetStartedClick(){
    this.router.navigate(['/login']);
  }

  
  route(routePath: string) {
    this.router.navigate([routePath]);
  }
}
