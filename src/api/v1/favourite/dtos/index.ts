import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateFavouriteDto {
  @IsDefined()
  @IsString()
  public user: string;

  @IsDefined()
  @IsString()
  public house: string;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
