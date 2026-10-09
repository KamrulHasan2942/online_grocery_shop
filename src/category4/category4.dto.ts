import { IsNotEmpty, Matches, IsDateString, IsUrl, IsString } from 'class-validator';

export class Category4Dto {

  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name field is required' })
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name should not contain any numbers',
  })
  name!: string; // ✅ FIXED

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password field is required' })
  @Matches(/[@#$&]/, {
    message: 'Password must contain at least one special character (@,#,$,&)',
  })
  password!: string; // ✅ FIXED

  @IsNotEmpty({ message: 'Date field is required' })
  @IsDateString({}, {
    message: 'Invalid date format',
  })
  date!: string; // ✅ FIXED

  @IsNotEmpty({ message: 'Social media link is required' })
  @IsUrl({}, {
    message: 'Invalid social media URL',
  })
  socialLink!: string; // ✅ FIXED
}