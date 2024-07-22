import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Todo from './todo';

describe('Todo component', () => {
  test('Adding a todo', () => {
    render(<Todo />);

    const input = screen.getByLabelText('Add Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
  });

  test('Completing a todo', async () => {
    render(<Todo />);

    const input = screen.getByLabelText('Add Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);
    await waitFor(() => screen.findByText('New Todo Item'));
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const todoItem = screen
      .getByText('New Todo Item')
      .closest('.MuiListItem-root');
    expect(todoItem).toHaveStyle({ opacity: '1' });
  });

  test('Editing a todo', () => {
    render(<Todo />);

    const input = screen.getByLabelText('Add Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));

    const editInput = screen.getByDisplayValue('New Todo Item');
    expect(editInput).toBeInTheDocument();
  });

  test('Deleting a todo', () => {
    render(<Todo />);

    const input = screen.getByLabelText('Add Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(screen.queryByText('New Todo Item')).toBeNull();
  });

  test('Sorting todos based on disableTodo', () => {
    render(<Todo />);

    const input = screen.getByLabelText('Add Todo');
    const addButton = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'Todo 1' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Todo 2' } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: 'Todo 3' } });
    fireEvent.click(addButton);

    fireEvent.click(screen.getAllByRole('button', { name: 'completed' })[1]);

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems[0]).toHaveTextContent('Todo 1');
    expect(todoItems[1]).toHaveTextContent('Todo 3');
    expect(todoItems[2]).toHaveTextContent('Todo 2');
  });
});
