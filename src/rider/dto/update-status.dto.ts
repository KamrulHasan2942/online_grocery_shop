import { IsNotEmpty, IsIn } from 'class-validator';

export class UpdateStatusDto {

  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(['pending', 'picked', 'on_the_way', 'delivered'], {
    message: 'Status must be one of: pending, picked, on_the_way, delivered',
  })
  status!: string;
}