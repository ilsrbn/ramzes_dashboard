import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminPostService, Post} from '../api';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import { Editor, Toolbar } from 'ngx-editor';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../shared/notification.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy{
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    editorContent: new FormControl('', Validators.required),
    posted: new FormControl(false)
  });
  post$ = this.route.paramMap.pipe(
    switchMap( (paramMap: ParamMap) => {
      const id = paramMap.get('id')
      this.id = id
      return this.postsService.getPostById({ id }).pipe(tap((value) => {
        this.form.setValue({ editorContent: value.content, title: value.title, posted: value.posted })
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
    private route: ActivatedRoute
  ) {}

  submit() {
    this.postsService.editPost({
      id: this.id,
      requestBody: {
        title: this.form.value.title,
        content: this.form.value.editorContent,
        posted: this.form.value.posted
      }
    }).pipe(
      tap(() => {
        this.router.navigateByUrl('/app/posts')
        this.notificationService.show('Post edited successfully!')
      })
    ).subscribe()
  }
}
