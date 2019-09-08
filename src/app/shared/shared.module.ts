import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule,
   MatToolbarModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule, 
    MatSlideToggleModule,
    MatListModule,
    MatIconModule,
    MatLineModule,
    MatSidenav,
    MatSidenavModule,
    MatTabsModule} from '@angular/material'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NoRecordComponent } from './components/no-record/no-record.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FromNowPipe } from './pipes/from-now.pipe';

@NgModule({
  imports:[
    MatIconModule,
    CommonModule
  ],
  exports: [
    AvatarComponent,
    CommonModule,
    FormsModule,
    FromNowPipe,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatListModule,
    MatLineModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSidenavModule,
    NoRecordComponent,
    ReactiveFormsModule
  ],
  declarations: [NoRecordComponent, AvatarComponent, FromNowPipe]
})
export class SharedModule { }
