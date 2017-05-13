import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Movie } from './movie.model';

export class InMemHeroService implements InMemoryDbService {

  createDb() {
    const movies: Movie[] = [{
      id: 1,
      name: 'Eyes Wide Shut',
      year: 1999,
      documentary: false
    },
    {
      id: 2,
      name: 'Full Metal Jacket',
      year: 1987,
      documentary: false
    },
    {
      id: 3,
      name: 'The Shining',
      year: 1980,
      documentary: false
    },
    {
      id: 4,
      name: 'Barry Lyndon',
      year: 1975,
      documentary: false
    },
    {
      id: 5,
      name: 'A Clockwork Orange',
      year: 1971,
      documentary: false
    },
    {
      id: 6,
      name: '2001: A Space Odyssey',
      year: 1968,
      documentary: false
    },
    {
      id: 7,
      name: 'Dr. Strangelove (or) How I Learned to Stop Worrying and Love the Bomb',
      year: 1964,
      documentary: false
    },
    {
      id: 8,
      name: 'Lolita',
      year: 1962,
      documentary: false
    },
    {
      id: 9,
      name: 'Spartacus',
      year: 1960,
      documentary: false
    },
    {
      id: 10,
      name: 'Paths of Glory',
      year: 1957,
      documentary: false
    },
    {
      id: 11,
      name: 'The Killing',
      year: 1956,
      documentary: false
    },
    {
      id: 12,
      name: 'Killer\'s Kiss',
      year: 1955,
      documentary: false
    },
    {
      id: 13,
      name: 'The Seafarers',
      year: 1953,
      documentary: true
    },
    {
      id: 14,
      name: 'Fear and Desire',
      year: 1953,
      documentary: false
    },
    {
      id: 15,
      name: 'Day of the Fight',
      year: 1951,
      documentary: true
    },
    {
      id: 16,
      name: 'Flying Padre',
      year: 1951,
      documentary: true
    }
    ];
    return { movies };
  }

}
