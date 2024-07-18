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
    return this.http.post<string>(
      'https://sudoku-server-20291e2c31ed.herokuapp.com/upload',
      formData
    );
  }
}
