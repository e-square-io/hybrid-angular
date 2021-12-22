import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HybridDirective } from './hybrid.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [HybridDirective],
  exports: [HybridDirective],
})
export class HybridModule { }
