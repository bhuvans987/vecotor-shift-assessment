import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextNode } from '../textNode';

// Mock reactflow hooks and components
const mockUpdateNodeInternals = jest.fn();
jest.mock('reactflow', () => ({
  Position: { Left: 'left', Right: 'right' },
  useUpdateNodeInternals: () => mockUpdateNodeInternals,
  Handle: ({ id, type, position }) => (
    <div data-testid={`handle-${type}-${position}`} id={id}>
      {id}
    </div>
  ),
}));

// Mock zustand store
jest.mock('../../store', () => ({
  useStore: (selector) => {
    const mockState = {
      updateNodeField: jest.fn(),
    };
    return selector(mockState);
  },
}));

describe('TextNode Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('extracts single variable and creates a left handle + right handle', () => {
    render(<TextNode id="text-1" data={{ text: 'Hello {{name}}' }} />);

    // Should render target handle for variable 'name'
    const leftHandle = screen.getByTestId('handle-target-left');
    expect(leftHandle).toBeInDOM ? expect(leftHandle).toBeInTheDocument() : expect(leftHandle).toBeTruthy();
    expect(leftHandle.id).toBe('text-1-name');

    // Should call useUpdateNodeInternals
    expect(mockUpdateNodeInternals).toHaveBeenCalledWith('text-1');
  });

  test('extracts multiple unique variables dynamically on text change', () => {
    render(<TextNode id="text-1" data={{ text: '' }} />);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, {
      target: { value: 'Inputs: {{varA}} and {{varB}} and duplicate {{varA}}' },
    });

    const leftHandles = screen.getAllByTestId('handle-target-left');
    expect(leftHandles.length).toBe(2);
    expect(leftHandles[0].id).toBe('text-1-varA');
    expect(leftHandles[1].id).toBe('text-1-varB');
    expect(mockUpdateNodeInternals).toHaveBeenCalledWith('text-1');
  });

  test('removes handle when variable pattern is deleted', () => {
    render(<TextNode id="text-1" data={{ text: '{{var1}}' }} />);

    expect(screen.getAllByTestId('handle-target-left').length).toBe(1);

    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'Plain text without vars' } });

    expect(screen.queryAllByTestId('handle-target-left').length).toBe(0);
    expect(mockUpdateNodeInternals).toHaveBeenCalledWith('text-1');
  });
});
