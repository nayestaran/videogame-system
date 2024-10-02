// Don't modify this file

export type PutCommandInput = {
  readonly TableName: string;
};

export enum Platform {
  ps4 = 'ps4',
  ps5 = 'ps5'
}

export type VideogameAdmin = {
  readonly admin: string;
  readonly platform: Platform;
  readonly videogame: string;
};

export class AwsDynamoDB {
  private readonly tableName: string;
  private readonly listOfVideogames: Map<string, VideogameAdmin>;

  public constructor(tableName: string) {
    this.tableName = tableName;
    this.listOfVideogames = new Map();
  }

  // Inserts a new admin for a videogame, overwriting previous admin if exists
  public async insertVideogameAdmin(videogameAdmin: VideogameAdmin): Promise<void> {
    const params = {
      TableName: this.tableName
    };

    const result = await this.dynamoMock(params);

    this.listOfVideogames.set(videogameAdmin.videogame, videogameAdmin);

    return result;
  }

  // Checks if a videogame has already an admin assigned
  public checkVideogameHasAdmin(videogame: string): boolean {
    return this.listOfVideogames.has(videogame);
  }

  // Gets the list of the existing list of videogames admins
  public getListOfVideogameAdmins(): Array<VideogameAdmin> {
    return Array.from(this.listOfVideogames.values());
  }

  private async dynamoMock(params: PutCommandInput): Promise<void> {
    console.log(`Getting list of users from ${ params.TableName }`);

    // Random number between 1 sec and 2 secs
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const ms = Math.floor(Math.random() * 2000) + 1000;

    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
