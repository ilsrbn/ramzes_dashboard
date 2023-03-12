import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminPostService} from '../api';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NotificationService} from '../shared/notification.service';


@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPostComponent implements OnInit, OnDestroy{
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
    posted: new FormControl(false)
  });

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private postsService: AdminPostService
  ) {}

  ngOnInit(): void {
    this.editor = new Editor({ history: true });
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  submit() {
    this.postsService.createPost({
      requestBody: {
        title: this.form.value.title,
        content: this.form.value.editorContent,
        posted: this.form.value.posted,
        featured_photos: []
      }
    }).pipe(
      tap(() => {
        this.router.navigateByUrl('/app/posts')
        this.notificationService.show('Post created successfully!')
      })
    ).subscribe()
  }
}
