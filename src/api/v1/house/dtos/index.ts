import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateHouseDto {
  @IsDefined()
  @IsString()
  public user: string;

  @IsDefined()
  @IsString()
  public category: string;

  @IsDefined()
  @IsString()
  public title: string;

  @IsDefined()
  @IsString()
  public description: string;

  @IsDefined()
  @IsString()
  public address: string;

  @IsDefined()
  @IsString()
  public square: number;

  @IsDefined()
  @IsString()
  public money: Object;

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
