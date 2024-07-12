import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect, MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption,
    MatFormFieldModule, MatSelectModule,
  ],
  exports:[
    MatTableModule,
    MatPaginatorModule,
    MatFormField,
    MatSelect,
    MatLabel,
    MatOption

  ]
})
export class MaterialImportsModule { }
