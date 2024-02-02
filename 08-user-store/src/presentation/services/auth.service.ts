import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity, LoginUserDto } from "../../domain";

export class AuthService {
  // DI
  constructor() {}

  public async registerUser( registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if( existUser ) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel( registerUserDto );
      
      // Encriptar contraseña
      user.password = bcryptAdapter.hash( registerUserDto.password );
      await user.save();

      // JWT <-- Para mantener la autenticacion del usuario

      // Email de confirmacion

      const { password, ...userEntity } = UserEntity.fromObject( user );

      return {
        user: userEntity,
        token: 'ABC'
      };
    } catch (error) {
      throw CustomError.internalServer(`${ error }`);
    }
  }

  public async loginUser( loginUserDto: LoginUserDto ) {
    const userExists = await UserModel.findOne({ email: loginUserDto.email });
    if( !userExists ) throw CustomError.badRequest('Email not exists');

    const passwordsIsMach = bcryptAdapter.compare( loginUserDto.password, userExists.password);
    if( !passwordsIsMach ) throw CustomError.badRequest("Passwords don't match");

    const { password, ...userEntity } = UserEntity.fromObject( userExists );

    const token = await JwtAdapter.generateToken({ id: userExists.id, email: userExists.email });
    if( !token ) throw CustomError.internalServer("Error while creating JWT");
    
    return {
        user: userEntity,
        token: token
      }
  }
}