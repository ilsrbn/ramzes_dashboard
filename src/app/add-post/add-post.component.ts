import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AdminPhotoService, AdminPostService, Photo } from '../api';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/notification.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPostComponent implements OnInit, OnDestroy {
  openSidebar$ = new BehaviorSubject<boolean>(false)
  photos$: Observable<Photo[]> = this.photosService.getAllPhotos({
    limit: 999,
    page: 1
  }).pipe(
    shareReplay(),
    map((paginatedPhotos) => paginatedPhotos.data)
  )
  featuredPhotos$ = new BehaviorSubject<string[]>([])
  editor: Editor;
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

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    editorContent: new FormControl('', Validators.required),
    posted: new FormControl(false),
  });

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private postsService: AdminPostService,
    private photosService: AdminPhotoService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor({ history: true });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  submit() {
    this.postsService
      .createPost({
        requestBody: {
          title: this.form.value.title,
          content: this.form.value.editorContent,
          posted: this.form.value.posted,
          featured_photos: this.featuredPhotos$.value,
        },
      })
      .pipe(
        tap(() => {
          this.router.navigateByUrl('/app/posts');
          this.notificationService.show('Post created successfully!');
        })
      )
      .subscribe();
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
