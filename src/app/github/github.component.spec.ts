import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { GithubComponent } from './github.component';
import { GithubApiService } from '../shared/github-api.service';

const dummyUsers = [
  { login: 'cironunes' }
];

class FakeGithubApiSerivce {
  getUsers() {
    return Observable.of(dummyUsers);
  }
}

describe('GithubComponent', () => {
  let component: GithubComponent;
  let fixture: ComponentFixture<GithubComponent>;

  beforeEach(async(() => {
    let injector;
    let github: GithubApiService;

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      declarations: [ GithubComponent ],
      providers: [
        { provide: GithubApiService, useClass: FakeGithubApiSerivce }
      ]
    })
    .compileComponents();

    injector = getTestBed();
    github = injector.get(GithubApiService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('should load the first users of GitHub', () => {
      component.ngOnInit();
      component.users.subscribe(users => {
        expect(users.length).toBe(1);
        expect(users).toEqual(dummyUsers);
      });
    });
  });
});
