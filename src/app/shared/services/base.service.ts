import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {inject} from "@angular/core";
import {environment} from "../../../environments/environment";
import {catchError, Observable, retry, throwError} from "rxjs";

export class BaseService<T> {
  // Define las opciones HTTP, para este caso el encabezado indica que el contenido enviado y recibido será en formato JSON
  protected httpOptions = { headers: new HttpHeaders({ 'Content-type': 'application/json' }) };

  //inject para inyectar el servicio HttpClient para hacer peticiones HTTP
  protected http: HttpClient = inject(HttpClient);

  //Definiendo las rutas base y la endpoint del recurso al cual se realizarán las peticiones
  protected basePath: string = `${environment.serverBasePath}`;
  protected resourceEndpoint: string = '/resources';

  //Construye la URL completa del endpoint del recurso
  protected resourcePath(): string{
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  //Captura errores del cliente y servidor
  protected handleError(error: HttpErrorResponse) {
    //error de cliente
    if (error.error instanceof ErrorEvent){
      console.log('An error occurred: ', error.error.message);
    } else {
      //error de backend
      console.log(`Backend returned code ${error.status}, body was ${error.error}`)
    }
    return throwError(()=> new Error('Something bad happened; please try again later.'));
  }

//Envia una solicitud "POST" para crear un nuevo recurso. El item se convierte a JSON y enviado al servidor
  public create(item: any): Observable<T>{
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  public delete(id: any): Observable<any>{
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptions);
  }

  public update(id: any, item: any): Observable<T>{
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item),
      this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }

  public getAll(): Observable<T[]>{
    return this.http.get<T[]>(this.resourcePath(), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
