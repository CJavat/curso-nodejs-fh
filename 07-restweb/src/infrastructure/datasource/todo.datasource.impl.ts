import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.formObject( todo );
  }
  
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();

    return todos.map( todo => TodoEntity.formObject( todo ));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if( !id ) throw `Todo with id ${id} not found`;
    return TodoEntity.formObject( todo! );
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.findById( updateTodoDto.id );

    const updatedTodo = await prisma.todo.update({
      where: { id: updateTodoDto.id },
      data: updateTodoDto!.values
    });

    return TodoEntity.formObject( updatedTodo );
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById( id );

    const deleted = await prisma.todo.delete({
      where: { id: id }
    });

    return TodoEntity.formObject( deleted );
  }

}