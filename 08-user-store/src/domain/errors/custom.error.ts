
export class CustomError extends Error {
  
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super( message );
  }

  static badRequest( message: string ) {
    return new CustomError( 401, message );
  }

  static notFound( message: string ) {
    return new CustomError( 404, message );
  }

  static internalServer( message: string ) {
    return new CustomError( 500, message );
  }

}