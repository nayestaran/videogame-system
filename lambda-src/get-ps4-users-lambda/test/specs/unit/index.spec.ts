import { getPs4UsersHandler } from '../../../src';

const listOfExpectedElements = [ 'Victor Sullivan', 'Nathan Drake', 'Nadine Ross', 'Elena Fisher', 'Chloe Frazer' ];

describe('# Handler', () => {
  afterAll(() => jest.restoreAllMocks());
  beforeEach(() => jest.clearAllMocks());

  it('Should execute the handler successfully', async () => {
    const result = await getPs4UsersHandler();

    listOfExpectedElements.sort((a, b) => a.localeCompare(b));
    result.sort((a, b) => a.localeCompare(b));

    expect(result).toEqual(listOfExpectedElements);
  });
});
