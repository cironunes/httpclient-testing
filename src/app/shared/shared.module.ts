import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GithubApiService } from './github-api.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [GithubApiService],
})
export class SharedModule { }
