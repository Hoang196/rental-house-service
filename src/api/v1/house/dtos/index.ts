import { IsDefined, IsString, IsBoolean, IsOptional, IsNumber, IsArray } from 'class-validator';

export class CreateHouseDto {
  @IsDefined()
  @IsString()
  public category: string;

  @IsDefined()
  @IsString()
  public title: string;

  @IsDefined()
  @IsArray()
  public imgs: string;

  @IsDefined()
  @IsString()
  public description: string;

  @IsDefined()
  @IsString()
  public address: string;

  @IsDefined()
  @IsNumber()
  public district: number;

  @IsDefined()
  @IsNumber()
  public province: number;

  @IsDefined()
  @IsNumber()
  public square: number;

  @IsDefined()
  @IsNumber()
  public money: number;

  @IsDefined()
  @IsString()
  public contact: string;

  @IsDefined()
  @IsString()
  public type: string;

  @IsOptional()
  @IsString()
  public like?: string;

  @IsOptional()
  @IsString()
  public status?: string;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
