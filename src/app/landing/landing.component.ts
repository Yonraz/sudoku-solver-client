import { Component } from '@angular/core';
import { SudokuService } from '../sudoku.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  providers: [SudokuService],
})
export class LandingComponent {
  title = 'sudoku solver';
  grid: number[][] = [];
  error: string | null = null;
  isLoading = false;

  constructor(private sudokuService: SudokuService, private router: Router) {}

  onFileDropped($event: any) {
    this.isLoading = true;
    this.prepareFilesList($event);
  }

  fileBrowseHandler($event: any) {
    this.isLoading = true;
    this.prepareFilesList($event.target.files);
  }

  prepareFilesList(files: Array<any>) {
    this.sudokuService.uploadImage(files[0]).subscribe({
      next: (res: string) => {
        console.log(res);
        const grid = JSON.parse(res);
        this.grid = grid;
        this.router.navigate(['/board', { res }]);
      },
      error: (err: any) => {
        console.error(err);
        err.message
          ? (this.error = err.message)
          : (this.error = 'An error occurred');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
