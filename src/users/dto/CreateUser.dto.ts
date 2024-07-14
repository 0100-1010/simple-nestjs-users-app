import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserSettingsDto } from './UserSettings.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserSettingsDto)
  settings?: UserSettingsDto;
}
