import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {Course} from "../../model/course.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-course-create-and-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatButton
  ],
  templateUrl: './course-create-and-edit.component.html',
  styleUrl: './course-create-and-edit.component.css'
})
export class CourseCreateAndEditComponent {
  //#region Atributes
  @Input() course!: Course;
  @Input() editMode: boolean = false;

  @Output() protected courseAddRequest = new EventEmitter<Course>();
  @Output() protected courseUpdateRequested = new EventEmitter<Course>();
  @Output() protected cancelRequested = new EventEmitter<void>();

  @ViewChild('courseForm', {static: false}) protected courseForm!: NgForm;
  //#endregion

  //#region Methods

  constructor() {
    this.course = new Course({});
  }

  private resetEditState(){
    this.course = new Course({});
    this.editMode = false;
    this.courseForm.reset();
  }

  private isValid = () => this.courseForm.valid;

  protected isEditMode = (): boolean => this.editMode;

  //#region Event Handlers
  /*
Aquí se utiliza un operador ternario para determinar qué acción ejecutar según el estado de la aplicación:
Si isEditMode() retorna true, significa que el formulario está en "modo edición",
por lo que se selecciona this.courseUpdateRequested, que probablemente sea un evento o un observable que se dispara cuando se solicita actualizar un curso.
Si isEditMode() retorna false, el formulario está en "modo agregar", por lo que se selecciona this.courseAddRequest, que se utilizará para agregar un nuevo curso.
*
* */
  protected onSumbit(){
    if (this.isValid()){
      let emitter = this.isEditMode() ? this.courseUpdateRequested: this.courseAddRequest;
      this.resetEditState();
    } else {
      console.error('Invalid form data');
    }
  }

  protected onCancel(){
    this.cancelRequested.emit();
    this.resetEditState();
  }

  //#endregion

  //#endregion


}
