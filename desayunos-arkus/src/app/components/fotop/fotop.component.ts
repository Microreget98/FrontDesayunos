import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-fotop',
  templateUrl: './fotop.component.html',
  styleUrls: ['./fotop.component.scss']
})
export class FotopComponent implements OnInit {

  public previsualizacion: string;
  public archivos: any = []
  constructor(
    private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<FotopComponent>,
    @Inject(MAT_DIALOG_DATA)public message:string) { }

  ngOnInit(): void {
  }

  onClickImg(): void {
    this.dialogRef.close();
  }

  capturarFile(event): any {
    const imagenrecibida = event.target.files[0]
    this.extraerBase64(imagenrecibida).then((imagen: any) => {
    this.previsualizacion = imagen.base;
    console.log(imagen);

    })
    //this.archivos.push(imagenrecibida)
    // console.log(event.target.files);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    }catch (e){
      return null;
    }
  })

}
