import { ErrorResponse } from '../model/error.model';
import { validateResponse } from './mensagens-erro.helper';

describe('MensagensErroHelper', () => {

  it('validateResponse deve concatenar mensagens em error', () => {
    const response: ErrorResponse = {
      error: {
        messages: ['first', 'second']
      }
    }
    expect(validateResponse(response)).toEqual('first, second');
  });

  it('validateResponse deve concatenar mensagens na raiz do objeto de erro', () => {
    const response: ErrorResponse = {
      messages: ['first', 'second']
    }
    expect(validateResponse(response)).toEqual('first, second');
  });
});