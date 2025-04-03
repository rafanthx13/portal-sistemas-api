import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('status')
@Controller('status')
export class StatusController {
  @Get()
  @ApiOperation({ summary: 'Verifica o status da API' })
  @ApiResponse({
    status: 200,
    description: 'API está funcionando normalmente',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'online' },
        timestamp: { type: 'string', example: '2024-04-03T02:25:00.000Z' },
        message: { type: 'string', example: 'API do Portal de Sistemas está funcionando!' },
      },
    },
  })
  getStatus() {
    return {
      status: 'online',
      timestamp: new Date().toISOString(),
      message: 'API do Portal de Sistemas está funcionando!'
    };
  }
}
