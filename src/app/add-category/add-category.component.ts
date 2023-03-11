import {Component, OnInit} from '@angular/core';
import {AdminCategoryService} from '../api';
import {NgForm, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  constructor(
    private categoryService: AdminCategoryService,
    private notificationService: NotificationService,
    private router: Router
  ) {}
  showValidationErrors: boolean
  posted = false;
  createCategory(form: NgForm) {
    console.log(form.value);
    if (form.invalid) { return this.showValidationErrors = true }

    this.categoryService.createCategory(
      {
        requestBody:
          {
            title: form.value.title,
            posted: form.value.posted,
            description: form.value.description
          }
      })
      .pipe(catchError(err => {
        console.log({ err });
        return throwError(err)
      }))
      .subscribe(() => {
        this.notificationService.show('Post successfully created!', 1500)
        this.router.navigateByUrl('/app/categories')
      })
  }
}
