import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchAllPokemonResponse, Pokemon } from '../interface/pokemon';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private url = 'https://pokeapi.co/api/v2';

  constructor(private _http: HttpClient) {}

  getAllPokemos(): Observable<Pokemon[]> {
    return this._http
      .get<FetchAllPokemonResponse>(`${this.url}/pokemon/?limit=1500`)
      .pipe(map(this.transformSmallPokemonIntoPokemon));
  }

  private transformSmallPokemonIntoPokemon(
    res: FetchAllPokemonResponse
  ): Pokemon[] {
    const pokemonList: Pokemon[] = res.results?.map((poke) => {
      const urlArray = poke.url.split('/');
      const id = urlArray[6];
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

      return {
        id,
        name: poke.name,
        pic,
      };
    });
    return pokemonList;
  }
}
