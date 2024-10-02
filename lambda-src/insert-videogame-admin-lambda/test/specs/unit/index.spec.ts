import { insertVideogameAdminHandler } from '../../../src';
import { Event, Platform, VideogameAdmin } from '../../../src/handler';

jest.setTimeout(20000);

describe('# Handler', () => {
  afterAll(() => jest.restoreAllMocks());
  beforeEach(() => jest.clearAllMocks());

  it('Should execute the handler successfully', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const videogameAdminA = {
      admin: 'Samuel Drake',
      platform: Platform.ps4,
      videogame: 'The last of us part II'
    };
    const videogameAdminB = {
      admin: 'Chloe Frazer',
      platform: Platform.ps4,
      videogame: 'Cyberpunk 2077'
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const videogameAdminListA: Array<VideogameAdmin> = [ ...Array(5) ].map(() => ({
      admin: '',
      platform: Platform.ps4,
      videogame: 'The last of us part II'
    }));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const videogameAdminListB: Array<VideogameAdmin> = [ ...Array(5) ].map(() => ({
      admin: '',
      platform: Platform.ps4,
      videogame: 'Cyberpunk 2077'
    }));

    const event: Event = {
      eventsList: [ videogameAdminA, videogameAdminB, ...videogameAdminListA, ...videogameAdminListB ]
    };

    const result = await insertVideogameAdminHandler(event);

    expect(result).toEqual([ videogameAdminA, videogameAdminB ]);
  });
});
