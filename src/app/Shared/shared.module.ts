import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { FormComponent } from './form/form/form.component';
import { ErrorsComponent } from './form/errors/errors.component';

@NgModule({

    entryComponents: [
        // ModalComponent,
        // OrderModalComponent
    ],

    declarations: [
        FormComponent,
        ErrorsComponent
    ],

    exports: [
        ErrorsComponent,
        FormComponent
    ],

    imports: [
        ReactiveFormsModule,
        CommonModule
    ],

})
export class SharedModule { }