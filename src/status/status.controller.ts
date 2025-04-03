import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class StatusController {
  @Get()
  getStatus() {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      message: 'API do Portal de Sistemas está funcionando!'
    };
  }
} 