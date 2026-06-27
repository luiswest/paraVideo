import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrmPassw } from '../forms/frm-passw/frm-passw';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-passw',
  imports: [],
  templateUrl: './change-passw.html',
  styleUrl: './change-passw.css',
})
export class ChangePassw {
    private readonly dialogo = inject(MatDialog);
    private router = inject(Router);
  mostrarDialogo() {
    const dialogoRef = this.dialogo.open(FrmPassw, {
      width: '45rem',
      maxWidth: '45vw',      
      minWidth: '15rem',
      disableClose: true
    });
    dialogoRef.afterClosed()
      .subscribe({
        complete: () => {
          this.router.navigate(['/home']);
        }
      });

  }
  
  ngOnInit(): void {
    this.mostrarDialogo();
  }
}
