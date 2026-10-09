import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class RiderDto {

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name should not contain numbers',
  })
  name!: string;

  @IsEmail({}, {
    message: 'Invalid email format',
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[@#$&]/, {
    message: 'Password must contain @ # $ or &',
  })
  password!: string;

  @IsInt()
  @Min(18, {
    message: 'Age must be at least 18',
  })
  age!: number;

  @IsString()
  @Matches(/^[0-9]{11}$/, {
    message: 'Phone must be 11 digits',
  })
  phone!: string;

  @IsString()
  @IsNotEmpty()
  vehicle!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;
}