import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadRoutingModule } from './lazy-load-routing.module';
import { LazyLoadComponent } from '../lazy-load.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommaExpr } from '@angular/compiler';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FabButtonComponent } from 'src/app/shared/fab-button/fab-button.component';
import { PostsComponent } from 'src/app/actualpage/posts/posts.component';
import { ActualpageComponent } from 'src/app/actualpage/actualpage.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    LazyLoadComponent,
    HeaderComponent,
    SidebarComponent,
    FabButtonComponent,
    PostsComponent,
    ActualpageComponent
  ],
  imports: [
    CommonModule,
    LazyLoadRoutingModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LazyLoadModule { }
