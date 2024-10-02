import { Domain } from './domain';

export enum Platform {
  ps4 = 'ps4',
  ps5 = 'ps5'
}

export type VideogameAdmin = {
  readonly admin: string;
  readonly platform: Platform;
  readonly videogame: string;
};

export type Event = {
  readonly eventsList: Array<VideogameAdmin>;
};

export type HandlerOutput = Array<VideogameAdmin>;

export class Handler {
  private readonly domain: Domain;

  public constructor(domain: Domain) {
    this.domain = domain;
  }

  public async execute(event: Event): Promise<HandlerOutput> {
    console.log('Starting');

    await event.eventsList.reduce(async (previousPromise, currentVideogame) => {
      await previousPromise;

      return this.domain.execute(currentVideogame);
    }, Promise.resolve());

    console.info('Finishing');

    return this.domain.getListOfVideogameAdmins();
  }
}
