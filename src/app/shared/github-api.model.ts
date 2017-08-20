export class User {
  constructor(
    id: number = 0,
    login: string = '',
    avatar_url: string = '',
    events_url: string = '',
    followers_url: string = '',
    following_url: string = '',
    gists_url: string = '',
    gravatar_id: string = '',
    html_url: string = '',
    organizations_url: string = '',
    received_events_url: string = '',
    repos_url: string = '',
    site_admin: boolean = false,
    starred_url: string = '',
    subscriptions_url: string = '',
    type: string = '',
    url: string = ''
  ) {}
}

export class SearchResults<T> {
  items: T[];
  total_count: number;
  incomplete_results: boolean;
}
