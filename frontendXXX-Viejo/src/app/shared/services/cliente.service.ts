import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TipoCliente } from '../interfaces/tipo-cliente';

const _SERVER = environment.servidor;

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly http = inject(HttpClient);

  filtrar(parametros: any, pageIndex: number, pageSize: number) {
    let params = new HttpParams;
    for (const prop in parametros) {
      params = params.append(prop, parametros[prop]);
    }
    return this.http.get<any>(`${_SERVER}/api/cliente/filter/${pageIndex}/${pageSize}`, {params : params});
  }

  guardar(datos: TipoCliente, id? : number) {
    delete datos.id_cliente;

    if (id){
          return this.http.put<any>(`${_SERVER}/api/cliente/${id}`, datos);    
    }

    return this.http.post<any>(`${_SERVER}/api/cliente`, datos);

  }

  buscar(id : number) {
    return this.http.get<TipoCliente>(`${_SERVER}/api/cliente/${id}`);  
  }
  eliminar(id : number) {
    return this.http.delete(`${_SERVER}/api/cliente/${id}`);
  }

   resetearPassw(id : number) {
    return this.http.get(`${_SERVER}/api/cliente/resetpassw/${id}`);
  }   

}
