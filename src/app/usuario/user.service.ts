import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../page';
import { UserDTO } from './user-dto';

@Injectable()
export class UserService {

  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Page<UserDTO>> {
    return this.http.get<Page<UserDTO>>(this.apiUrl);
  }

  save(userDTO: UserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.apiUrl, userDTO);
  }

  update(id: number, userDTO: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(this.apiUrl, userDTO);
  }

  delete(id: number): Observable<UserDTO> {
    return this.http.delete<UserDTO>(this.apiUrl);
  }
}
