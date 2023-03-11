import { Component } from '@angular/core';
import {BehaviorSubject, switchMap} from 'rxjs';
import {AdminPostService} from '../api';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  currentPage$ = new BehaviorSubject<number>(1)
  posts$ = this.currentPage$.pipe(
    switchMap((page) => this.postsService.getAllPosts({}))
  )

  constructor(
    private router: Router,
    private postsService: AdminPostService
  ) {}

  onEdit(postId: number) {
    const router = this.router
    return () => router.navigateByUrl('/app/posts/' + postId)
  }

  onDelete(postId: number) {
    const postsService = this.postsService
    const currentPage$ = this.currentPage$
    return () => {
      postsService.deletePostById(
        {
          id: postId.toString()
        })
        .pipe(
          tap(() => currentPage$.next(currentPage$.value))
        )
        .subscribe()
    }
  }

  onToggle(postId: number) {
    const postsService = this.postsService
    const currentPage$ = this.currentPage$
    return () => {
      postsService.togglePostVisibility(
        {
          id: postId.toString()
        })
        .pipe(
          tap(() => currentPage$.next(currentPage$.value))
        )
        .subscribe()
    }
  }
}
