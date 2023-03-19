import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-featured-photo-input',
  templateUrl: './featured-photo-input.component.html',
  styleUrls: ['./featured-photo-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FeaturedPhotoInputComponent),
      multi: true,
    },
  ],
})
export class FeaturedPhotoInputComponent implements ControlValueAccessor {
  public value: string | undefined = '';
  private onChange!: (value: string) => void;
  private onTouched!: () => void;
  constructor(private readonly changeDetector: ChangeDetectorRef) { }


  public onInputValueChange(event: Event): void {
    const targetElement = event.target as HTMLInputElement;
    const value = targetElement.value;
    console.log({ value })

    this.onChange(value);
  }
  public writeValue(value: string): void {
    this.value = value;

    this.changeDetector.detectChanges();
  }
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
