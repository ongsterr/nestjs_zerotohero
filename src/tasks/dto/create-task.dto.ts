import { IsNotEmpty } from 'class-validator'

export class CreateTaskDto {
  @IsNotEmpty() // Gets identified for validation pipe
  title: string

  @IsNotEmpty()
  description: string
}
