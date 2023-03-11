import { Component } from '@angular/core';
import {AdminCategoryService, Category, Photo} from '../api';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, switchMap} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {IntersectionStatus} from '../directive/from-intersection-observer';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  constructor(
    private router: Router,
    private categoriesService: AdminCategoryService
  ) {}

  currentPage$ = new BehaviorSubject<number>(1)

  categories$: Observable<Category[]> = this.currentPage$.pipe(
    switchMap(currentPage => this.categoriesService.getAllCategories({
      page: 1,
      limit: currentPage * 20
    })),
    map((res) => res.data)
  )

  toggleVisibility(id: number) {
    const categoriesService = this.categoriesService
    const currentPage$ = this.currentPage$
    return () => categoriesService.togglePostedStatus({ categoryId: id.toString() }).subscribe(() => currentPage$.next(currentPage$.value))
  }

  editCategory = (id: number) => {
    const router = this.router
    return async () => {
      await router.navigateByUrl('/app/categories/' + id)
    }
  }

  handleDelete = (id: number) => {
    const categoryService = this.categoriesService
    const currentPage$ = this.currentPage$
    return () => {
      categoryService.deleteCategory({ id: id.toString() }).pipe(
        tap(() => currentPage$.next(this.currentPage$.value))
      ).subscribe()
    }
  }

  trackBy(index: number, element: Category) {
    return element.id
  }

  private nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1)
  }

  onVisibilityChanged(e: IntersectionStatus) {
    console.log(e);
    if (e === IntersectionStatus.Visible) { this.nextPage() }
  }
}
