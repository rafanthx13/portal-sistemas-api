import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStatus', () => {
    it('should return status information', () => {
      // Arrange
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2023-01-01T00:00:00.000Z');

      // Act
      const result = controller.getStatus();

      // Assert
      expect(result).toEqual({
        status: 'online',
        timestamp: '2023-01-01T00:00:00.000Z',
        message: 'API do Portal de Sistemas está funcionando!'
      });
    });
  });
});
