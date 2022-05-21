import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Args, Operation } from 'types';
import { EmptyOperation, evaluateOperation } from './operations/index';

describe('Render app', () => {

  test('renders button add arg', () => {
    render(<App />);
    const buttonText = screen.getByText(/add arg/i);
    expect(buttonText).toBeInTheDocument();
  });

  test('evaluateOperation', () => {
    const args11: Args = { switch1: true, switch2: true }
    const args10: Args = { switch1: true, switch2: false }
    const args01: Args = { switch1: false, switch2: true }
    const args00: Args = { switch1: false, switch2: false }

    let op: Operation = EmptyOperation
    expect(evaluateOperation(op, args11)).toBeUndefined();

    op = { name: 'constant', params: [], constValue: true }
    expect(evaluateOperation(op, args11)).toBeTruthy();

    op = { name: 'argument', params: [], argName: 'switch1' }
    expect(evaluateOperation(op, args11)).toBeTruthy();

    op = { name: 'argument', params: [], argName: 'switch2' }
    expect(evaluateOperation(op, args10)).toBeFalsy();

    op = {
      name: 'and', params: [
        { name: 'constant', params: [], constValue: true },
        { name: 'constant', params: [], constValue: true }
      ]
    }
    expect(evaluateOperation(op, args10)).toBeTruthy();

    op = {
      name: 'and', params: [
        { name: 'constant', params: [], constValue: true },
        { name: 'constant', params: [], constValue: false }
      ]
    }
    expect(evaluateOperation(op, args10)).toBeFalsy();

    op = {
      name: 'or', params: [
        { name: 'constant', params: [], constValue: true },
        { name: 'constant', params: [], constValue: false }
      ]
    }
    expect(evaluateOperation(op, args10)).toBeTruthy();

    op = {
      name: 'not', params: [
        { name: 'constant', params: [], constValue: false },
      ]
    }
    expect(evaluateOperation(op, args10)).toBeTruthy();
  });
})
