import { Component } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../interface/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  public pokemons: Pokemon[] = [];
  public page = 0;
  public search = '';

  constructor(private pokemonService: PokemonService) {
    pokemonService.getAllPokemos().subscribe((pokemon) => {
      this.pokemons = pokemon;
    });
  }

  SearchPokemon(search: string) {
    this.page = 0;
    this.search = search;
  }

  nextPage() {
    this.page += 5;
  }
  prevPage() {
    if (this.page > 0) {
      this.page -= 5;
    }
  }
}
