import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Player} from './player';
import { Observable,   } from 'rxjs';
//import { json } from 'express';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  readonly ROOT_URL = 'http://localhost:8081/api';


  getPlayers(): Observable<Player[]>
  {
    return this.http.get<Player[]>(this.ROOT_URL + '/getplayers');
  }

  addPlayer(newPlayer:Player): Observable<any>
  {
    return this.http.post<any>(this.ROOT_URL + '/addplayer', newPlayer);
  }

  deletePlayer(id:any): Observable<any>
  {
    return this.http.delete<any>(this.ROOT_URL + '/deleteplayer/' + id);
  }

  updatePlayer(id:any, updatedPlayer:Player): Observable<any>
  {
    return this.http.put<any>(this.ROOT_URL + '/updateplayer/' + id, updatedPlayer);
  }

  getMostFGM()
  {
    return this.http.get<Player[]>(this.ROOT_URL + '/getplayermostfgm');
  }

  getMostRecYards()
  {
    return this.http.get<Player[]>(this.ROOT_URL + '/getplayermostrecyards');
  }

  getMostTDs()
  {
    return this.http.get<Player[]>(this.ROOT_URL + '/getplayermosttouchdowns');
  }

  sortMostPassYards()
  {
    return this.http.get<Player[]>(this.ROOT_URL + '/getplayerspassyardsdescending');
  }
  
  sortMostRushYards()
  {
    return this.http.get<Player[]>(this.ROOT_URL + '/getplayersrushyardsdescending');
  }

}
