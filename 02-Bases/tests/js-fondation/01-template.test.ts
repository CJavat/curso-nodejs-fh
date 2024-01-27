import { emailTemplate } from '../../src/js-foundation/01-template';


describe('js-foundation/01-template', () => {
  test('emailTemplate should cointain a greeting', () => {
    expect( emailTemplate ).toContain('Hi,');
  });

  test('emailTemplate should cointain {{name}} and {{orderId}}', () => {
    expect( emailTemplate ).toMatch(/{{name}}/);
    expect( emailTemplate ).toMatch(/{{orderId}}/);

    expect( emailTemplate ).toContain('{{name}}');
    expect( emailTemplate ).toContain('{{orderId}}');
  });
});