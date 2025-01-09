import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://furniture-production-4fc8.up.railway.app';
  constructor(private http: HttpClient) {}

  register(userData: {
    username: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/register/`, userData);
  }

  login(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/login/`, userData);
  }

  updateProfile(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${this.apiUrl}/accounts/update/`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  isAdmin(): boolean {
    const role = JSON.parse(localStorage.getItem('role') || '{}');

    return !!role;
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts/logout/`, {});
  }
}
