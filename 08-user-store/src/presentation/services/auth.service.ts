import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity, LoginUserDto } from "../../domain";
import { EmailService } from './email.service';


export class AuthService {
  // DI
  constructor(
    private readonly emailService: EmailService
  ) {}

  public async registerUser( registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if( existUser ) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel( registerUserDto );
      
      // Encriptar contraseña
      user.password = bcryptAdapter.hash( registerUserDto.password );
      await user.save();

      // JWT <-- Para mantener la autenticacion del usuario
      const token = await JwtAdapter.generateToken({ id: user.id, email: user.email });
      if( !token ) throw CustomError.internalServer("Error while creating JWT");

      // Email de confirmacion
      await this.sendEmailValidationLink( user.email );

      const { password, ...userEntity } = UserEntity.fromObject( user );

      return {
        user: userEntity,
        token: token
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

  private sendEmailValidationLink = async ( email: string ) => {
    const token = await JwtAdapter.generateToken({ email });
    if( !token ) throw CustomError.internalServer("Error getting token");

    const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${ link }"> Validate your email: ${ email }</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html
    }

    const isSent = await this.emailService.sendEmail( options );
    if( !isSent ) throw CustomError.internalServer("Error sending email");

    return true;
  }

  public validateEmail = async ( token: string ) => {
    const payload = await JwtAdapter.validateToken( token );
    if( !payload ) throw CustomError.unauthorized('Invalid token');

    const { email } = payload as { email: string };
    if( !email ) throw CustomError.internalServer('Email not in token');

    const user = await UserModel.findOne({ email });
    if(!user ) throw CustomError.internalServer('Email not exists');

    user.emailValidated = true;
    await user.save();

    return true;
  };
}