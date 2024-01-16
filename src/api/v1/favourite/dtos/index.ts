import { IsDefined, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateFavouriteDto {
  @IsDefined()
  @IsString()
  public userSend: string;

  @IsDefined()
  @IsString()
  public userReceive: string;

  @IsDefined()
  @IsString()
  public content: string;

  @IsDefined()
  @IsString()
  public type: string;

  @IsOptional()
  @IsBoolean()
  public active?: boolean;
}
