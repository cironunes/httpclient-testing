import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { GithubApiService } from '../shared/github-api.service';
import { User } from '../shared/github-api.model';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {

  githubForm: FormGroup;
  search: FormControl;
  users: Observable<User[]>;

  constructor(
    private github: GithubApiService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.githubForm = this.fb.group({
      search: ['']
    });
    // this.users = this.github.getUsers();
    this.search = (this.githubForm.get('search') as FormControl);


    this.users = this.search.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(users => {
        const params = new HttpParams().set('q', users);
        return this.github.search('users', params)
          .map(result => result.items);
      });
  }

}
