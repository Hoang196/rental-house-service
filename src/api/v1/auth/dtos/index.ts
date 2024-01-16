import { IsDefined, IsOptional, IsString } from 'class-validator';

export class AuthDto {
  @IsDefined()
  @IsString()
  public phone: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsOptional()
  @IsString()
  public username?: string;

  @IsOptional()
  @IsString()
  public address?: string;

  @IsOptional()
  @IsString()
  public avatar?: string;
}

export class RefreshDto {
  @IsDefined()
  @IsString()
  public refreshToken: string;
}

export class ChangePasswordDto {
  @IsDefined()
  @IsString()
  public id: string;

  @IsDefined()
  @IsString()
  public password: string;

  @IsDefined()
  @IsString()
  public newPassword: string;
}
