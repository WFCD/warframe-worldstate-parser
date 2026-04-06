import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

/**
 * External mission data retrieved from https://10o.io/kuvalog.json
 */
export class ExternalMission {
  @ApiProperty({ description: 'Mission ID' })
  @IsString()
  id: string;

  /**
   * start time
   */
  @ApiProperty({ description: 'Start time', type: Date })
  @IsDate()
  @Type(() => Date)
  activation: Date;

  /**
   * end timer
   */
  @ApiProperty({ description: 'End time', type: Date })
  @IsDate()
  @Type(() => Date)
  expiry: Date;

  /**
   * formatted node name with planet
   */
  @ApiProperty({ description: 'Formatted node name with planet' })
  @IsString()
  node: string;

  /**
   * Untranslated formatted node name with planet
   */
  @ApiProperty({ description: 'Untranslated formatted node name with planet' })
  @IsString()
  nodeKey: string;

  /**
   * Enemy on tile
   */
  @ApiPropertyOptional({ description: 'Enemy on tile' })
  @IsOptional()
  @IsString()
  enemy?: string;

  /**
   * Mission type of node
   */
  @ApiProperty({ description: 'Mission type of node' })
  @IsString()
  type: string;

  /**
   * Untranslated node mission type
   */
  @ApiProperty({ description: 'Untranslated node mission type' })
  @IsString()
  typeKey: string;

  /**
   * whether or not the tile requires archwing
   */
  @ApiProperty({ description: 'Whether or not the tile requires archwing' })
  @IsBoolean()
  archwing: boolean;

  /**
   * whether or not the tile requires
   */
  @ApiProperty({ description: 'Whether or not the tile requires sharkwing' })
  @IsBoolean()
  sharkwing: boolean;

  /**
   * Whether the mission is expired at the time of creation or not
   */
  @ApiProperty({
    description:
      'Whether the mission is expired at the time of creation or not',
  })
  @IsBoolean()
  expired: boolean;
}
