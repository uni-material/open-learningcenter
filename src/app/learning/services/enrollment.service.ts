import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Enrollment} from "../model/enrollment.entity";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService extends BaseService<Enrollment>{

  constructor() {
    super();
    this.resourceEndpoint = 'enrollments'
  }
}
