import { getAge } from '../../src/plugins/get-age.plugin';

describe('plugins/get-age.plugin', () => {

  test('getAge() should return the age of a person', () => {
    const birthdate = '1998-05-23';
    const age = getAge( birthdate );

    expect( typeof age ).toBe( 'number' );
  });

  test('getAge should return current age', () => {
    const birthdate = '1998-05-23';
    const age = getAge( birthdate );

    const calculateAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

    expect( age ).toBe( calculateAge );
  });

  test('getAge should return 0 years', () => {
    const spyOn = jest.spyOn( Date.prototype, 'getFullYear' ).mockReturnValue( 1998 );

    const birthdate = '1998-05-23';
    const age = getAge( birthdate );

    expect( age ).toBe( 0 );


  });

});