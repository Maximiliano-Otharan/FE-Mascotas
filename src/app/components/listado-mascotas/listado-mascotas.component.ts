import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Mascota } from 'src/app/interfaces/mascota';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

const listMascotas: Mascota[] = [
  {nombre: 'Chiquito', edad: 6, raza: 'Caniche', color: 'Blanco', peso: 7},
  {nombre: 'Gordo', edad: 6, raza: 'Caniche', color: 'Blanco', peso: 10},
  {nombre: 'Mora', edad: 6, raza: 'Caniche', color: 'Blanco', peso: 8},
  {nombre: 'Ciro', edad: 3, raza: 'Golden', color: 'Dorado', peso: 13},
  {nombre: 'Pelusa', edad: 16, raza: 'Caniche', color: 'Negro', peso: 5},
  {nombre: 'Treysi', edad: 8, raza: 'Ovejera Aleman', color: 'Marron y Negri', peso: 15}
];

@Component({
  selector: 'app-listado-mascotas',
  templateUrl: './listado-mascotas.component.html',
  styleUrls: ['./listado-mascotas.component.css']
})
export class ListadoMascotasComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<Mascota>(listMascotas);
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = "Items por pagina";
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarMascota() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      this._snackBar.open('La Mascota fue eliminada con exito', '', {
        duration: 3000,
        horizontalPosition: 'right',
      });
    }, 3000);
 
  }

}
