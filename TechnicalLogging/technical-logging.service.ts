import { Injectable, ɵɵresolveBody } from '@angular/core';
import { Form } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TechnicalLoggingService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient,
              private authService: AuthService) { }
 
public logArray = [];

  formLog(objToSave){
    console.log("objtosave formlog", objToSave)
    return this.http.post(this.apiUrl + 'technicalLogging/postLoggingInfo' , objToSave)
  
}
   getAllTechnicalLogging()
  {  
    console.log("getAllTechnicalLoggingFE works body:", this.apiUrl + 'technicalLogging/getTechnicalLoggingInfo');
    return this.http.post(this.apiUrl + 'technicalLogging/getTechnicalLoggingInfo', {x : this.authService.returnLocalStorageUid()})
    
  
  }


  
}
