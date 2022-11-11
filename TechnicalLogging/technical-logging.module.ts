import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnicalLoggingComponent } from './technical-logging.component';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { TechnicalLoggingService } from './technical-logging.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TechnicalLoggingModalComponent } from './technical-logging-modal/technical-logging-modal.component';

const routes: Routes = [
  {
    path: '',
    component: TechnicalLoggingComponent,
  }
];

@NgModule({
  declarations: [TechnicalLoggingComponent,
    TechnicalLoggingModalComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
   
  ],
  providers: [
    TechnicalLoggingService,
 
  ],
  exports:[TechnicalLoggingModalComponent]})
export class TechnicalLoggingModule { }
