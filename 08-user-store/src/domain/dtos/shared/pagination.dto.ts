export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create( page: number = 1, limit: number = 10 ): [ string?, PaginationDto? ] {
    
    if( isNaN( page ) || isNaN( limit ) ) return ['Page and limit must be a numbers'];
    if( page <= 0 || limit <= 0 ) return ['Page must be greater than 0'];
    
    return [ undefined, new PaginationDto( page, limit ) ];
  }

}