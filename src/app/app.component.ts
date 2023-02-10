import { Component } from '@angular/core';
import { FormGroup, FormControl, MaxValidator, Validators } from '@angular/forms';
import axios from 'axios';
import { HttpClient } from  '@angular/common/http';
import { DecimalPipe, NgFor } from '@angular/common';


interface Country {
  placa: string;
  marca: string;
  docuemnto_propietario: number;
  nombre_propietario: string;
  docuemnto_conductor: number;
  nombre_conductor: string;
}

let COUNTRIES: Country[] = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient,) { }
  countries = COUNTRIES;

  profileForm = new FormGroup({
    placa: new FormControl('',[Validators.required]),
    color: new FormControl('',Validators.required),
    marca: new FormControl('',Validators.required),
    tipo_vehiculo: new FormControl('',Validators.required),
    propietario: new FormControl('',Validators.required),
    conductor: new FormControl('',Validators.required),

  });

  mostrarForm = new FormGroup({
    cedula: new FormControl('',[Validators.required]),
    primer_nombre: new FormControl('',Validators.required),
    segundo_nombre: new FormControl('',Validators.required),
    apellidos: new FormControl('',Validators.required),
    rol: new FormControl('',Validators.required),
    direccion: new FormControl('',Validators.required),
    telefono: new FormControl('',Validators.required),
    ciudad: new FormControl('',Validators.required),

  });


    enviarDatos(){
      axios.get('http://localhost:8000/apitest/registroVehiculos',{
        params: {
          'placa':this.profileForm.value.placa,
          'color':this.profileForm.value.color,
          'marca':this.profileForm.value.marca,
          'tipo_vehiculo':this.profileForm.value.tipo_vehiculo,
          'conductor':this.profileForm.value.conductor,
          'propietario':this.profileForm.value.propietario,
        }
      }).then(function (response) {
      // handle success
      console.log(response);
      })
      .catch(function (error) {
      // handle error
      console.log(error);
      })
      .finally(function () {
      // always executed
    });
    }

    mostarDatos() {

      let info = []
      axios.get('http://localhost:8000/apitest/consultaVehiculos').then(function (response) {
       if(response.status == 200){
        COUNTRIES = response.data.data;
       }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


    }

    enviarPersona(){
      axios.get('http://localhost:8000/apitest/registroPersonas',{
        params: {
          'cedula':this.mostrarForm.value.cedula,
          'primer_nombre':this.mostrarForm.value.primer_nombre,
          'segundo_nombre':this.mostrarForm.value.segundo_nombre,
          'apellidos':this.mostrarForm.value.apellidos,
          'direccion':this.mostrarForm.value.direccion,
          'telefono':this.mostrarForm.value.telefono,
          'ciudad':this.mostrarForm.value.ciudad,
          'rol':this.mostrarForm.value.rol,
        }
      }).then(function (response) {
      // handle success

      })
      .catch(function (error) {
      // handle error
      console.log(error);
      })
      .finally(function () {
      // always executed
    });

    this.mostarDatos()
    }


}
