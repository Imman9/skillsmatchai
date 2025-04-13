import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { UserRole } from '../models/user-role.enum';

interface User {
  id: string;
  email: string;
  role: UserRole;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Mock users for testing
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'jobseeker@example.com',
      role: UserRole.JOB_SEEKER,
      token: 'mock-token-1',
    },
    {
      id: '2',
      email: 'employer@example.com',
      role: UserRole.EMPLOYER,
      token: 'mock-token-2',
    },
    {
      id: '3',
      email: 'admin@example.com',
      role: UserRole.ADMIN,
      token: 'mock-token-3',
    },
  ];

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    // For demo purposes, accept any password
    const user = this.mockUsers.find((u) => u.email === email);
    if (user) {
      return of(user).pipe(
        delay(1000), // Simulate network delay
        tap((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        })
      );
    }
    throw new Error('Invalid email or password');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return this.currentUserSubject.value?.token || null;
  }
}
