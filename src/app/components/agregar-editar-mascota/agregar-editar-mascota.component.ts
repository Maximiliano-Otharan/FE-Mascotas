import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent implements OnInit {
  loading: boolean = false;
  form: FormGroup;
  id: number;

  operacion: string = "Agregar";

  constructor(private fb: FormBuilder, 
    private _mascotaService: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) { 
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    });

    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0) {
      this.operacion = "Editar";
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number) {
    this.loading = true;
    this._mascotaService.getMascota(id).subscribe({
      next: (data) => {
        this.form.patchValue({
          nombre: data.nombre,
          raza: data.raza,
          color: data.color,
          edad: data.edad,
          peso: data.peso
        });
        this.loading = false;
      },
      error: (e) => this.loading = false,
      complete: () => console.info('complete')
    })
    
  }

  agregarEditarMascota() {
    // console.log(this.form)
    // const nombre = this.form.get('nombre')?.value;
    // const nombre = this.form.value.nombre;

    const mascota: Mascota = {
      nombre: this.form.get('nombre')?.value,
      raza: this.form.get('raza')?.value,
      color: this.form.get('color')?.value,
      edad: this.form.get('edad')?.value,
      peso: this.form.get('peso')?.value,
    }

    if(this.id != 0) {
      mascota.id = this.id
      this.editarMascota(this.id, mascota);
    }else{
      this.agregarMascota(mascota);
    }
}

  agregarMascota(mascota: Mascota) {
    //Enviamos el Objeto al Back-End
    this._mascotaService.addMascota(mascota).subscribe({
      next: () => {
        this.mensajeExito("registrada");
        this.router.navigate(['/listadoMascotas']);
      },
      complete: () => console.info('complete')
    });
  }

  editarMascota(id: number, mascota: Mascota) {
    this.loading = true;
    this._mascotaService.updateMascota(id, mascota).subscribe({
      next: () => {
        this.loading = false;
        this.mensajeExito("actualizada");
        this.router.navigate(['/listadoMascotas']);
      },
      error: (e) => {
        console.info(e)
        this.loading = false;
      },
      complete: () => console.info('complete')
    });
  }

  mensajeExito(text: string) {
    this._snackBar.open(`La Mascota fue ${text} con exito`, '', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }
}
