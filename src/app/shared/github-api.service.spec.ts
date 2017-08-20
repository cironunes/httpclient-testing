import { TestBed, getTestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';

import { GithubApiService } from './github-api.service';
import { User } from './github-api.model';

describe('GithubApiService', () => {
  let injector;
  let service: GithubApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });

    injector = getTestBed();
    service = injector.get(GithubApiService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#getUsers', () => {
    it('should return an Observable<User[]>', () => {
      const dummyUsers: User[] = [
        new User(0, 'John'),
        new User(1, 'Doe')
      ];

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users).toEqual(dummyUsers);
      });

      const req = httpMock.expectOne(`${service.API_URL}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyUsers);
    });
  });

  describe('#search', () => {
    const dummyParams = new HttpParams().set('q', 'cironunes');

    it('should throw an error if trying to search for not supported `what`', () => {
      service.search('unknown', dummyParams)
        .subscribe(() => {}, err => {
          expect(err).toBe(`Searching for unknown is not supported. The available types are: ${service.WHAT.join(', ')}.`);
        });

      const req = httpMock.expectNone(`${service.API_URL}/search/users?q=cironunes`);
    });

    it('should return an Observable<SearchResults>', () => {
      service.search('users', dummyParams)
        .subscribe(result => {
          expect(result.items.length).toBe(2);
        });

      const req = httpMock.expectOne(`${service.API_URL}/search/users?q=cironunes`);
      expect(req.request.url).toBe(`${service.API_URL}/search/users`);
      expect(req.request.params).toEqual(dummyParams);

      req.flush({
        incomplete_results: false,
        items: [{}, {}],
        total_count: 2
      });
    });
  });

});
