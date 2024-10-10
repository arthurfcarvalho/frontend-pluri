import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponsePageable } from '../types/api-response-pageable.type';
import { Area } from '../models/Area.model';
import { URLS } from '../../assets/constantes';

@Injectable({
  providedIn: 'root'
})
export class MensageBoxService {
}
