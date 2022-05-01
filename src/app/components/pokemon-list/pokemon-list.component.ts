import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  pagina = 1;
  totalPokemons!: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.dataService.getPokemons(16, this.pagina + 0).subscribe((response: any) => {
      // console.log(response);
      this.totalPokemons = response.count;
      
      response.results.forEach((result: { name: string; }) => {
        this.dataService.getASpecificPokemon(result.name)
          .subscribe((response: any) => {
            this.pokemons.push(response);
            // console.log(this.pokemons);
          });
      });
    });
  }

}