import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminPhotoService, AdminPostService, Photo, Post } from '../api';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  openSidebar$ = new BehaviorSubject<boolean>(false)
  photos$: Observable<Photo[]> = this.photosService.getAllPhotos({
    limit: 999,
    page: 1
  }).pipe(
    shareReplay(),
    map((paginatedPhotos) => paginatedPhotos.data)
  )

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    editorContent: new FormControl('', Validators.required),
    posted: new FormControl(false)
  });
  featuredPhotos$ = new BehaviorSubject<string[]>([])
  post$ = this.route.paramMap.pipe(
    switchMap((paramMap: ParamMap) => {
      const id = paramMap.get('id')
      this.id = id
      return this.postsService.getPostById({ id }).pipe(tap((value) => {
        this.form.setValue({ editorContent: value.content, title: value.title, posted: value.posted })
        if (value.featured_photos) {
          const photos = value.featured_photos
          this.featuredPhotos$.next(photos)
        }
      }))
    })
  )
  id: string
  editor: Editor
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  ngOnInit(): void {
    this.editor = new Editor({ history: true });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private postsService: AdminPostService,
    private route: ActivatedRoute,
    private photosService: AdminPhotoService,
  ) { }

  submit() {
    this.postsService.editPost({
      id: this.id,
      requestBody: {
        title: this.form.value.title,
        content: this.form.value.editorContent,
        posted: this.form.value.posted,
        featured_photos: this.featuredPhotos$.value
      }
    }).pipe(
      tap(() => {
        this.router.navigateByUrl('/app/posts')
        this.notificationService.show('Post edited successfully!')
      })
    ).subscribe()
  }
  addFeaturedPhoto(photoURL: string) {
    const photos = this.featuredPhotos$.value
    photos.unshift(photoURL)

    this.featuredPhotos$.next(photos)
  }
  deleteFeaturedPhoto(photoURL: string) {
    const photos = this.featuredPhotos$.value.filter((photo) => photo !== photoURL)
    const featuredPhotos$ = this.featuredPhotos$
    return () => {
      featuredPhotos$.next(photos)
    }
  }
  observeURL(event: Event): void {
    const regexp = /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg|webp))/g

    const targetElement = event.target as HTMLInputElement;
    const value = targetElement.value

    const isPhotoUrl = regexp.test(value)

    if (isPhotoUrl) {
      this.addFeaturedPhoto(value)
      targetElement.value = ""
    }
  }

}
