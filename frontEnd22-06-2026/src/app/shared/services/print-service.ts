import { Service } from '@angular/core';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';


@Service()
export class PrintService {
    
    print(columna : string[], cuerpo : Array<any>, encabezado : string, guardar? : boolean) {
        
        const doc = new jsPDF({
            orientation: 'portrait',  //landscape
            unit: 'px', 
            format: 'letter'});


        doc.text(encabezado, (doc.internal.pageSize.width / 2), 25, {align: 'center'} );
        autoTable(doc, {
            head: [columna],
            body: cuerpo
        });
        if (guardar) {
            const hoy = new Date();
            const nombreArchivo = hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + '.pdf';
            doc.save(nombreArchivo);
        } else {
            doc.output("dataurlnewwindow");
        }
    }

}
