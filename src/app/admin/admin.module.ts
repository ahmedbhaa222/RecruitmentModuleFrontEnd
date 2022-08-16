import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './components/job-list/job-list.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';

import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ToolbarModule} from 'primeng/toolbar';
import {ChipsModule} from 'primeng/chips';
import {InputNumberModule} from 'primeng/inputnumber';



@NgModule({
  declarations: [
    JobListComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    CalendarModule,
		DialogModule,
		MultiSelectModule,
    InputNumberModule,
		DropdownModule,
		ButtonModule,
    ToolbarModule,
		ToastModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    InputTextareaModule,
    ChipsModule,
    
  ],
})
export class AdminModule { }
