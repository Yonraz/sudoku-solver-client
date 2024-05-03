import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SudokuService {
  constructor(private http: HttpClient) {}

  uploadImage(file: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>('http://localhost:5000/upload', formData);
  }
}
