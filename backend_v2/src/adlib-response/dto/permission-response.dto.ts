import { IsString } from 'class-validator';
import { ResponseVisibilityPermissions } from '../permissions/response-visibility.permissions';

export class PermissionResponseDto {
  @IsString()
  permission: ResponseVisibilityPermissions;
}
