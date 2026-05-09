type TInputData = string;

interface IDataStrategy {
  retrieveData(): TInputData;
  storeData(data: TInputData): void;
};

class InMemoryStrategy implements IDataStrategy {
  private data: TInputData = '';
  private static instance: InMemoryStrategy;
  constructor () {
    if (!InMemoryStrategy.instance) {
      InMemoryStrategy.instance = this;
    }

    return InMemoryStrategy.instance;
  };

  retrieveData(): TInputData {
    console.log('Retrieving data from in-memory storage.');
    return this.data;
  }

  storeData(data: TInputData): void {
    console.log('Storing data in in-memory storage.');
    this.data = data;
  }
};

class DatabaseStrategy implements IDataStrategy {
  private data: TInputData = '';
  private static instance: DatabaseStrategy;
  constructor () {
    if (!DatabaseStrategy.instance) {
      DatabaseStrategy.instance = this;
    }

    return DatabaseStrategy.instance;
  };

  retrieveData(): TInputData {
    console.log('Retrieving data from database.');
    return this.data;
  };

  storeData(data: TInputData): void {
    console.log('Storing data in database.');
    this.data = data;
  };
};

class APIStrategy implements IDataStrategy {
  private data: TInputData = '';
  private static instance: APIStrategy;
  constructor () {
    if (!APIStrategy.instance) {
      APIStrategy.instance = new APIStrategy();
    }

    return APIStrategy.instance;
  };

  retrieveData(): TInputData {
    console.log('Retrieving data from external API.');
    return this.data;
  };

  storeData(data: TInputData): void {
    console.log('Storing data to external API.');
    this.data = data;
  };
};

class CloudStrategy implements IDataStrategy {
  private data: TInputData = '';
  private static instance: CloudStrategy;

  constructor () {
    if (!CloudStrategy.instance) {
      CloudStrategy.instance = new CloudStrategy();
    }

    return CloudStrategy.instance;
  };

  retrieveData(): TInputData {
    console.log('Retrieving data from cloud storage.');
    return this.data;
  };

  storeData(data: TInputData): void {
    console.log('Storing data in cloud storage.');
    this.data = data;
  };
};

const strategyConfig = {
  inMemory: new InMemoryStrategy(),
  database: new DatabaseStrategy(),
  api: new APIStrategy(),
  cloud: new CloudStrategy()
};

type TStrategyType = keyof typeof strategyConfig;

class DataRepository {
  private strategy: TStrategyType;

  checkStrategy(strategy: TStrategyType): void {
    if (!strategyConfig[strategy]) {
      throw new Error(`Strategy ${strategy} is not supported.`);
    }
  };

  constructor(strategy: TStrategyType) {
    this.checkStrategy(strategy);
    this.strategy = strategy;
  };

  setStrategy(strategy: TStrategyType): void {
    this.checkStrategy(strategy);
    this.strategy = strategy;
  };
  
  retrieveData(): TInputData {
    return strategyConfig[this.strategy].retrieveData();
  };
};

// Client code
const inMemoryRepo = new DataRepository("inMemory");
const databaseRepo = new DataRepository("database");
const apiRepo = new DataRepository("api");
const cloudRepo = new DataRepository("cloud");

inMemoryRepo.retrieveData();
databaseRepo.retrieveData();
apiRepo.retrieveData();
cloudRepo.retrieveData();