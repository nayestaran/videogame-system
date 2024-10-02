import { AwsDynamoDB } from './data/aws-dynamodb';

type DomainConfig = {
  readonly awsDynamoDB: AwsDynamoDB;
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

export class Domain {
  private readonly awsDynamoDB: AwsDynamoDB;

  public constructor({ awsDynamoDB }: DomainConfig) {
    this.awsDynamoDB = awsDynamoDB;
  }

  public async execute(videogameAdmin: VideogameAdmin): Promise<void> {
    const videogameHasAlreadyAdmin = this.awsDynamoDB.checkVideogameHasAdmin(videogameAdmin.videogame);

    if (!videogameHasAlreadyAdmin) {
      await this.awsDynamoDB.insertVideogameAdmin(videogameAdmin);
    }
  }

  // Gets the list of the existing list of videogames admins
  public getListOfVideogameAdmins(): Array<VideogameAdmin> {
    return this.awsDynamoDB.getListOfVideogameAdmins();
  }
}
