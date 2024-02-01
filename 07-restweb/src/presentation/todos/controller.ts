import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

// const todos = [
//   { id: 1, text: "Buy milk", completedAt: new Date() },
//   { id: 2, text: "Buy bread", completedAt: null },
//   { id: 3, text: "Buy butter", completedAt: new Date() },
// ];

export class TodosController {
  //* DI
  constructor(

  ) {}

  public getTodos = async ( req: Request, res: Response ) => {
    const todos = await prisma.todo.findMany();

    return res.json( todos );
  }

  public getTodoById = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    if( isNaN( id ) ) return res.status( 400 ).json({ error: `ID argument is not a number` });

    const todo = await prisma.todo.findUnique({
      where: { id: id },
    });
    // const todo = todos.find( todo => todo.id === id );

    ( todo )
      ? res.json( todo )
      : res.status( 404 ).json({ error: `Todo with id ${ id } not found` })
  }

  public createTodo = async ( req: Request, res: Response ) => {
    // const { text } = req.body;
    const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
    if( error ) return res.status( 400 ).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.json( todo );
  };

  public updateTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });

    if( error ) return res.status( 400 ).json({ error });

    const todo = await prisma.todo.findFirst({
      where: { id: id },
    })
    // const todo = todos.find( todo => todo.id === id );
    if( !todo ) return res.status( 404 ).json({ error: `Todo with id ${ id } not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id: id },
      data: updateTodoDto!.values
    });

    // todo.text = text || todo.text;
    // ( completedAt === 'null' )
    //   ? todo.completedAt = null
    //   : todo.completedAt = new Date( completedAt || todo.completedAt )


    // todo.text = text;
    // //! OJO, referencia

    res.json( updatedTodo );
  };

  public deleteTodo = async ( req: Request, res: Response ) => {
    const id = +req.params.id;
    if( isNaN( id ) ) return res.status( 400 ).json({ error: `ID argument is not a number` });

    const todo = await prisma.todo.findFirst({
      where: { id: id }
    })
    // const todo = todos.find( todo => todo.id === id );
    if( !todo ) return res.status( 404 ).json({ error: `Todo with id ${ id } not found` });


    // todos.splice( todos.indexOf( todo ), 1);
    const deleted = await prisma.todo.delete({
      where: { id: id }
    });

    ( deleted )
      ? res.json( deleted )
      : res.status( 400 ).json({ error: `Todo with id ${ id } not found` })
  };
}












