import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrmPassw } from '../forms/frm-passw/frm-passw';

@Component({
  selector: 'app-change-passw',
  imports: [],
  templateUrl: './change-passw.html',
  styleUrl: './change-passw.css',
})
export class ChangePassw {
    private readonly dialogo = inject(MatDialog);

  mostrarDialogo() {
    const dialogoRef = this.dialogo.open(FrmPassw, {
      width: '45rem',
      maxWidth: '45vw',      
      minWidth: '15rem',
      disableClose: true
    });
  }
  
  ngOnInit(): void {
    this.mostrarDialogo();
  }
}
