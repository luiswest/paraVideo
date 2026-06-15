import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FrmLogin } from '../forms/frm-login/frm-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{
private readonly dialogo = inject(MatDialog);
private readonly router = inject(Router);
  mostrarDialog() {
        const dialogRef = this.dialogo.open(FrmLogin, {
          width: '35vw',
          maxWidth: '45rem',
          disableClose : true
        });

    
    dialogRef.afterClosed().subscribe(
     {
        complete: () => {

        console.log(" si logueado");
        this.router.navigate(['home']);
         // this.changeDetectorRefs.detectChanges();
         // this.changeDetectorRefs.reattach();
        },
     }    
  
  );

  }
  ngOnInit(): void {
    this.mostrarDialog();

  }

}
