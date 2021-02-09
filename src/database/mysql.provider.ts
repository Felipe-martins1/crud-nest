import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MySQLProvider {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger('MySQLProvider');
    this.logger.log('initialized');
  }
  getValue(): string {
    return 'Value from MySQLProvider';
  }
}
