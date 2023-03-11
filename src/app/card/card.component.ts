import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzIconModule} from 'ng-zorro-antd/icon';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, NzIconModule],
  template: `
    <div class="custom-card">
      <img *ngIf="cover" [src]="cover">
      <div *ngIf="title" class="custom-card__title">{{ title }}</div>
      <div *ngIf="description; else descriptionTemplate" class="custom-card__body"><p>{{ description }}</p></div>
      <ng-template #descriptionTemplate>
        <div class="custom-card__body">
          <ng-content select="[description]"></ng-content>
        </div>
      </ng-template>
      <div *ngIf="onSelect || onDelete || onEdit || onToggleVisibility; else actionsTemplate" class="custom-card__actions">
        <i
          *ngIf="onToggleVisibility"
          class="custom-card__visibility"
          [ngClass]="{'custom-card__visibility-visible': posted}"
          (click)="onToggleVisibility()"
          nz-icon
          nzTheme="fill"
          [nzType]="posted ? 'eye':'eye-invisible'"
        ></i>
        <i
          *ngIf="onEdit"
          class="custom-card__setting"
          (click)="onEdit()"
          nz-icon
          nzTheme="fill"
          nzType="setting"
        ></i>
        <i
          *ngIf="onDelete"
          class="custom-card__delete"
          (click)="onDelete()"
          nz-icon
          nzTheme="fill"
          nzType="delete"
        ></i>
        <i
          *ngIf="onSelect"
          class="custom-card__select"
          (click)="onSelect()"
          nz-icon
          nzTheme="outline"
          nzType="check"
        ></i>
      </div>
      <ng-template #actionsTemplate>
        <div class="custom-card__actions">
            <ng-content select="[actions]"></ng-content>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./card.styles.scss']
})
export class CardComponent {
  @Input() title?: string
  @Input() description?: string
  @Input() cover?: string
  @Input() posted?: boolean
  @Input() onToggleVisibility?: () => void
  @Input() onEdit?: () => void
  @Input() onDelete?: () => void

  @Input() onSelect?: () => void
  // @Input() title?: Pick<CardOptions, 'title'>
  // @Input() title?: Pick<CardOptions, 'title'>
  // @Input() title?: Pick<CardOptions, 'title'>
}
