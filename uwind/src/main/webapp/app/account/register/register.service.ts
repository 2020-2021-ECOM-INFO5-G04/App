import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient, private userService: UserService) {}

  save(account: IUser): Observable<{}> {
    return this.http.post(SERVER_API_URL + 'api/register', account);
  }
}
