import { Component,Input } from '@angular/core';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'; // Todavía no lo usamos


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  @Input('entrada') entrada = "default";
  
  title = 'prueba1';

  //Arreglo para desplegar una tabla
  personas:any[]=[];
  //Input del formulario se asocian con un modelo
  persona:any={};

  guardar(){
    //Insertar dato en el arreglo
    this.personas.push(this.persona);
    //Se crea un nuevo objeto para almacenar nuevos datos
    this.persona={};
  }

   
  // tslint:disable-next-line:typedef
  downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('htmlData')!;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = { background: 'white', scale: 2 };
    
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 30;
      const bufferY = 20;
      const imgProps = (doc as any).getImageProperties(img);
      //const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      //const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, 900, 750,);
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toDateString()}.pdf`);
    }); 
  }

  
  
}
