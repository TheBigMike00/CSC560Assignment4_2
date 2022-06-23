import { Component, OnInit } from '@angular/core';
import { PlayerService } from './player.service';
import { Player } from './player';
import { takeUntil } from 'rxjs-compat/operator/takeUntil';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PlayerService]
})
export class AppComponent implements OnInit {
  title = 'My Football Player';
  players?: Player[];
  player?: Player;
  name?: string;
  touchdowns?: number;
  passYards?: number;
  rushYards?: number;
  recYards?: number;
  fgMade?: number;

  constructor(private playerService: PlayerService) { }

  getPlayers()
  {
    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }


  addPlayer()
  {
    const newPlayer = {
      name: this.name ?? "John Doe",
      touchdowns: this.touchdowns ?? 0,
      passYards: this.passYards ?? 0,
      rushYards: this.rushYards ?? 0,
      recYards: this.recYards ?? 0,
      fgMade: this.fgMade ?? 0,

    }

    this.playerService.addPlayer(newPlayer)
      .subscribe(player =>
        this.players?.push(player));

    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }


  deletePlayer(id:any)
  {
    var players = this.players;
    this.playerService.deletePlayer(id)
      .subscribe(data => {
        if(data.n==1)
        {
          for(var i = 0; i<(players?.length ?? 0); i++)
          {
            if(players![i]._id == id)
            {
              players!.splice(i,1);
            }
          }
        }
      });
    

      this.playerService.getPlayers().subscribe(players => {
        this.players = players;
      });
  }


  updatePlayer(id:any)
  {
    const updatedPlayer = {
      name: this.name ?? "John Doe",
      touchdowns: this.touchdowns ?? 0,
      passYards: this.passYards ?? 0,
      rushYards: this.rushYards ?? 0,
      recYards: this.recYards ?? 0,
      fgMade: this.fgMade ?? 0,

    }

    this.playerService.updatePlayer(id, updatedPlayer).subscribe();

    this.playerService.getPlayers().subscribe(players => {
      this.players = players;
    });
  }


  getMostFGM()
  {
    this.playerService.getMostFGM().subscribe(players => {
      this.players = players;
    });
  }

  getMostRecYards()
  {
    this.playerService.getMostRecYards().subscribe(players => {
      this.players = players;
    });
  }

  getMostTDs()
  {
    this.playerService.getMostTDs().subscribe(players => {
      this.players = players;
    });
  }
  
  sortMostPassYards()
  {
    this.playerService.sortMostPassYards().subscribe(players => {
      this.players = players;
    });
  }

  sortMostRushYards()
  {
    this.playerService.sortMostRushYards().subscribe(players => {
      this.players = players;
    });
  }



  ngOnInit(): void {
      this.getPlayers();
  }
}
