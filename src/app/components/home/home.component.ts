import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public sort!: string;
  public games!: Array<Game>;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute) {
    //this.sort = "";
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGame('metacrit', params['game-search'])
      }
      else {
        this.searchGame('metacrit');
      }
    }
    )
  }

  searchGame(sort: string, search?: string): void {
    this.httpService.getGameList(sort, search).subscribe(
      (gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

}
