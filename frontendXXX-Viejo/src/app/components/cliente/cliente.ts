import { AfterViewInit, OnInit, Component, signal, viewChild, inject, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { ClienteService } from '../../shared/services/cliente.service';
import { TipoCliente } from '../../shared/interfaces/tipo-cliente';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FrmCliente } from '../forms/frm-cliente/frm-cliente';
import { DialogoGeneral } from '../forms/dialogo-general/dialogo-general';

@Component({
  selector: 'app-cliente',
  imports: [MatCardModule, MatTableModule, MatIconModule, MatPaginatorModule,
            MatDialogModule
  ],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css',
})
export class Cliente implements AfterViewInit {
  mostrarEncabezados: string[] = ['cedula', 'nombre', 'telefono', 'email', 'botonera']

  dataSource = signal(new MatTableDataSource<TipoCliente>());

  private readonly clienteSrv = inject(ClienteService);

  private readonly dialogo = inject(MatDialog);
  paginator = viewChild(MatPaginator);
  
  //arregloClientes: any = [];
  filtro : any;
  totalRecords = signal<number>(0);
  pageIndex = signal<number>(0);
  pageSize = signal<number>(10);
  
  //private changeDetectorRefs = inject(ChangeDetectorRef);

  public mostrarDialogo(titulo: string, datos? : TipoCliente) {
    const dialogRef = this.dialogo.open(FrmCliente, {
      width: '50vw',
      maxWidth: '35rem',
      data: {
        title: titulo,
        data: datos
      },
      disableClose : true
    });
    dialogRef.afterClosed()
      .subscribe({
        next: (data) => {
          if (data) {
            this.resetearFiltro();
          }
        },
        complete: () => {
         // this.changeDetectorRefs.detach();
          this.resetearFiltro();
        
         // this.changeDetectorRefs.detectChanges();
         // this.changeDetectorRefs.reattach();
        },
        error: (err) => {
         console.error(err);
        }      
      
    });
  }
  onCreate() {
    this.mostrarDialogo('Nuevo Cliente');
  }

  onInfo(idCliente : string) {
    alert('Información sobre id : ' + idCliente);
  }

  onEdit(id : number) {
    
    this.clienteSrv.buscar(id)
      .subscribe({
        next: (data) => {
          this.mostrarDialogo('Modificar Cliente ', data);
        }
      });

    
  }
  onDelete(idCliente : number) {
      const dialogRef = this.dialogo.open(DialogoGeneral, {
      data: {
        texto: '¿Eliminar registro seleccionado?',
        icono: 'question_mark',
        textoAceptar: 'Si',
        textoCancelar: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.clienteSrv.eliminar(idCliente).subscribe((res: any) => {
          this.resetearFiltro();
          this.dialogo.open(DialogoGeneral, {
            data: {
              texto: 'Registro eliminado Correctamente',
              icono: 'check',
              textoAceptar: ' Aceptar ',
            },
          });
        });
      }
    });
  }
  onResetPassw(idCliente : string) {
    alert('Resetear contraseña para id : ' + idCliente);
  }

  resetearFiltro() {
      this.filtro =  {cedula: '', nombre: ''};
      this.filtrar();    
  }
  filtroInicial() {
    this.clienteSrv.filtrar(this.filtro, this.pageIndex(), this.pageSize())
      .subscribe({
        next: (data) => {
          //this.arregloClientes = data.data;
          this.totalRecords.set(data.totalRegistros);
          this.dataSource.set(new MatTableDataSource<TipoCliente>(data.data));
        },
        error: (err) => {
          
        },
        complete: () => {
          this.dataSource().paginator = this.paginator();
        }
      })
  }
  
  filtrar() {
    this.clienteSrv.filtrar(this.filtro, this.pageIndex(), this.pageSize())
      .subscribe({
        next: (data) => {
          console.log(data);
          //this.arregloClientes = data.data;
          this.totalRecords.set(data.totalRegistros);

          this.dataSource.set(new MatTableDataSource<TipoCliente>(data.data));
          
        },
        error: (err) => {
          
        },
        complete: () => {
          //this.dataSource().paginator = this.paginator();
          
        }
      })
  }  
    ngOnInit(): void {
    this.filtro =  {cedula: '', nombre: ''};
    this.filtrar();    
  } 
  onPageChange(event: PageEvent) {
    if (this.pageSize() !== event.pageSize) {
      this.pageIndex.set(0);
    } else {
      this.pageIndex.set(event.pageIndex);
    }

    this.pageSize.set(event.pageSize);
    this.filtrar();
  } 
   ngAfterViewInit(): void {
    this.filtro = {cedula : '', nombre : ''};
    this.filtroInicial();
  } 
  ngOnDestroy(): void {
    this.dataSource().disconnect();
  }
  
}
