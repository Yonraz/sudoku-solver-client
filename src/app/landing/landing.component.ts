import { AfterViewInit, Component, OnInit, Output } from '@angular/core';
import { SudokuService } from '../sudoku.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { Router } from '@angular/router';
import { BoardComponent } from '../board/board.component';

interface SudokuResponse {
  grid: number[][];
}
declare const cv: any;

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  providers: [SudokuService],
  imports: [CommonModule, LoadingSpinnerComponent, BoardComponent],
})
export class LandingComponent {
  title = 'sudoku solver';
  @Output() grid: number[][] = [];
  error: string | null = null;
  isLoading = false;

  constructor(private sudokuService: SudokuService, private router: Router) {}

  fileBrowseHandler($event: any) {
    this.isLoading = true;
    this.prepareFilesList($event.target.files);
    let imgElement = document.getElementById('imageSrc') as HTMLImageElement;
    imgElement!.src = URL.createObjectURL($event.target.files[0]);
    imgElement.onload = function () {
      let mat = cv.imread(imgElement);
      cv.imshow('canvasOutput', mat);
      mat.delete();
    };
  }

  prepareFilesList(files: Array<any>) {
    try {
      this.error = null;
      this.sudokuService.uploadImage(files[0]).subscribe({
        next: (res: string) => {
          console.log(res);
          if (!res) throw new Error('Could not process image');
          const response: SudokuResponse = JSON.parse(res);
          console.log(response.grid);
          this.grid = response.grid;
        },
        error: (error: any) => {
          console.log('e');
          throw error;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } catch (err) {
      console.log('ca');
      this.error =
        'Could not process image, please try again or use a different image.';
    }
  }
}
