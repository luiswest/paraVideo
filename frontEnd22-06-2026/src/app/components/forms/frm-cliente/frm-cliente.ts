import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClienteService } from '../../../shared/services/cliente.service';
import { DialogoGeneral } from '../dialogo-general/dialogo-general';
@Component({
  selector: 'app-frm-cliente',
  imports: [MatDialogModule, MatDividerModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,
    ReactiveFormsModule],
  templateUrl: './frm-cliente.html',
  styleUrl: './frm-cliente.css',
})
export class FrmCliente implements OnInit {
  titulo! : string;

  private data = inject(MAT_DIALOG_DATA);
  private readonly dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef<FrmCliente>)

  private builder = inject (FormBuilder);
  private srvCliente = inject(ClienteService);

  miForm : FormGroup;

  info : boolean = false;

  constructor() {
    this.miForm = this.builder.group({
        id_cliente: [0],
        cedula: ['',[Validators.required, Validators.pattern(/^([1-9]\d{8}|5\d{11})$/)]], //Cedula 700001111 DIMEX 534343434343
        nombre: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50), 
              Validators.pattern('([A-Za-zÑñáéíóú]+)( ([A-Za-zÑñáéíóú]+)){1,3}')]],
        telefono: ['', Validators.pattern('[2-9]?[0-9]{3}\-[0-9]{4}')],
        email:  ['', [Validators.required, Validators.email] ]
    });
  }
  get F() {
    return this.miForm.controls
  }
  onGuardar() {
    console.log(this.miForm.value);

    if (this.miForm.value.id_cliente === 0) {
      this.srvCliente.guardar(this.miForm.value)
        .subscribe({
            complete: () => {
              this.dialog.open(DialogoGeneral, {
                data : {
                  texto : 'Registro creado de forma correcta',
                  icono : 'check',
                  textoAceptar : ' Aceptar '
                }
              });
              this.dialogRef.close();
            },
            error : (e) => {
              //console.log(e.status)
              switch (e.status) {
                case 409: {
                  
                  this.dialog.open(DialogoGeneral, {
                    data : {
                      texto : 'Cédula de cliente duplicada',
                      icono : 'error',
                      textoAceptar : ' Aceptar '
                    }
                  });
                }
                break;
                default: {
                  this.dialog.open(DialogoGeneral, {
                    data : {
                      texto : 'Error no especificado',
                      icono : 'error',
                      textoAceptar : ' Aceptar '
                    }
                  });
                }
              }
            }
        });
    } else {
      this.srvCliente.guardar(this.miForm.value, this.miForm.value.id_cliente)
        .subscribe({
            complete: () => {
              this.dialog.open(DialogoGeneral, {
                data : {
                  texto : 'Registro modificado correctamente',
                  icono : 'info',
                  textoAceptar : ' Aceptar '
                }
              });              
              this.dialogRef.close();
            }
        });      
    }
  }

  ngOnInit(): void {
    this.titulo = this.data.title;
    this.info = this.data.info;
    if (this.data.data) {
        this.miForm.setValue(this.data.data[0]);
        
    }
  }
}
