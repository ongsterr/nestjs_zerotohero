import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TaskStatus } from './task-status.enum'

import { TasksRepository } from './tasks.repository'
import { TasksService } from './tasks.service'

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
})

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
}

describe('TasksService', () => {
  let tasksService: TasksService
  let tasksRepository

  beforeEach(async () => {
    // init NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile()

    tasksService = module.get(TasksService)
    tasksRepository = module.get(TasksRepository)
  })

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      // call tasksService.getTasks, which should then call the repository's getTasks
      tasksRepository.getTasks.mockResolvedValue('someValue')

      const result = await tasksService.getTasks(null, mockUser)
      expect(result).toEqual('someValue')
    })
  })

  describe('getTasksById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test description',
        id: 'someId',
        status: TaskStatus.OPEN,
      }

      tasksRepository.findOne.mockResolvedValue(mockTask)
      const result = await tasksService.getTaskById('someId', mockUser)
      expect(result).toEqual(mockTask)
    })

    it('calls TasksRepository.findOne and handles the error', async () => {
      tasksRepository.findOne.mockResolvedValue(null)
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      )
    })
  })
})
