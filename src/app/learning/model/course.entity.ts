export class Course {
  id: number;
  tittle: string;
  description: string;

  //usando un objeto con variables opcionales
  constructor(course: { id?: number, title?: string, description?: string}){
    this.id = course.id || 0;
    this.tittle = course.title || '';
    this.description = course.description || '';
  }
}
