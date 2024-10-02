// Don't modify this file

export type PutCommandInput = {
  readonly TableName: string;
};

export enum Platform {
  ps4 = 'ps4',
  ps5 = 'ps5'
}

export type User = {
  readonly username: string;
  readonly platform: Platform;
  readonly videogame: string;
};

export class AwsDynamoDB {
  private readonly tableName: string;

  public constructor(tableName: string) {
    this.tableName = tableName;
  }

  // Gets the list of existing users in the dynamodb table
  public async getListOfUsers(): Promise<Array<User>> {
    const params = {
      TableName: this.tableName
    };

    const result = await this.dynamoMock(params);

    return result;
  }

  private async dynamoMock(params: PutCommandInput): Promise<Array<User>> {
    console.log(`Getting list of users from ${ params.TableName }`);
    const listOfElements = [
      {
        username: 'Victor Sullivan',
        platform: Platform.ps4,
        videogame: 'Bloodborne'
      },
      {
        username: 'Victor Sullivan',
        platform: Platform.ps4,
        videogame: 'The last of us'
      },
      {
        username: 'Nathan Drake',
        platform: Platform.ps5,
        videogame: 'God of war Ragnarok'
      },
      {
        username: 'Nathan Drake',
        platform: Platform.ps4,
        videogame: 'God of war'
      },
      {
        username: 'Nadine Ross',
        platform: Platform.ps4,
        videogame: 'Star Wars Fallen Order'
      },
      {
        username: 'Nadine Ross',
        platform: Platform.ps5,
        videogame: 'Star Wars Jedi Survivor'
      },
      {
        username: 'Hector Alcazar',
        platform: Platform.ps4,
        videogame: 'Horizon Zero Dawn'
      },
      {
        username: 'Hector Alcazar',
        platform: Platform.ps5,
        videogame: 'Horizon Forbidden West'
      },
      {
        username: 'Hector Alcazar',
        platform: Platform.ps5,
        videogame: 'Marvels Spider Man'
      },
      {
        username: 'Samuel Drake',
        platform: Platform.ps5,
        videogame: 'Elden Ring'
      },
      {
        username: 'Samuel Drake',
        platform: Platform.ps5,
        videogame: 'The last of us part II'
      },
      {
        username: 'Rafe Adler',
        platform: Platform.ps5,
        videogame: 'Uncharted 2'
      },
      {
        username: 'Rafe Adler',
        platform: Platform.ps5,
        videogame: 'Uncharted 3'
      },
      {
        username: 'Rafe Adler',
        platform: Platform.ps5,
        videogame: 'Uncharted 4'
      },
      {
        username: 'Elena Fisher',
        platform: Platform.ps5,
        videogame: 'Hogwarts Legacy'
      },
      {
        username: 'Chloe Frazer',
        platform: Platform.ps4,
        videogame: 'Cyberpunk 2077'
      }
    ];

    // Random number between 1 sec and 3 secs
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const ms = Math.floor(Math.random() * 3000) + 1000;

    return new Promise((resolve) => setTimeout(() => resolve(listOfElements), ms));
  }
}
