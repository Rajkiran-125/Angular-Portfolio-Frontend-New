import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, type?:string, action?: string) {
    let snackBarClass:string = 'successSnackbar';
    switch (type) {
      case 'success':
        snackBarClass = 'successSnackbar';
        break;
      case 'error':
        snackBarClass = 'errorSnackbar';
        break;
      case 'warning':
        snackBarClass = 'warningSnackbar';
        break;
      case 'info':
        snackBarClass = 'infoSnackbar';
        break;
    }
    const snackBarRef = this.snackBar.open(message, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
      panelClass: [snackBarClass]
    });

    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss(); // This will close the snack-bar when the "Close" button is clicked
    });
  }

}
