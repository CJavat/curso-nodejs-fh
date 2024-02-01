export class UpdateTodoDto {
  constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: string
  ) {}

  get values() {
    const returnObj: {[ key: string ]: any } = {}

    if( this.text ) returnObj.text = this.text;
    if( this.completedAt ) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create( props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;
    const newCompletedAt = completedAt;

    if( !id || isNaN( Number( id ) ) ) return ['id must be a valid number'];

    if( completedAt ) {
      const newCompletedAt = new Date(completedAt );
      if( newCompletedAt.toString() === 'Invalid Date') {
        return ['CompletedAt must be a valid date'];
      }
    }

    return [ undefined, new UpdateTodoDto( id, text, newCompletedAt ) ];
  }
}