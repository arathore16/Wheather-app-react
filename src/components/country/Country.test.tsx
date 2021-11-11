import React from 'react';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import Country from './Country';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

test('renders learn react link', () => {
  render( 
   <MemoryRouter>
    <Country />
   </MemoryRouter>
  );
  const linkElement = screen.getByText(/Enter country/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders submit button text', () => {
  render(
    <MemoryRouter>
      <Country />
    </MemoryRouter>
  )
  expect(screen.getByText(/Submit/i)).toBeInTheDocument()
});

test('renders input placeholder', () => {
  render(
    <MemoryRouter>
      <Country />
    </MemoryRouter>
  )
  expect(screen.queryByPlaceholderText(/Enter Country/i)).toBeInTheDocument()
});

test('renders button should be disabled', () => {
  render(
    <MemoryRouter>
      <Country />
    </MemoryRouter>
  )
  const submitItem = screen.getByText('Submit');
  expect(submitItem).toBeInTheDocument();
  expect ((submitItem).closest('button')).toBeDisabled();
  expect(screen.getByText(/Submit/i).closest('button')).toBeDisabled();
  });

  // describe('chnage input value enable submit button', () => {
  //   test('change value on input change', () => {
  //     const history = createMemoryHistory();
  //     const utils = render(
  //       <MemoryRouter>
  //       <Country />
  //      </MemoryRouter>
  //     );
  //     const ButtonSubmit = utils.getByText(/Submit/i);
  //      expect(ButtonSubmit).toBeInTheDocument();
  //     expect ((ButtonSubmit).closest('button')).toBeDisabled();

  //     expect(screen.getByText(/Submit/i).closest('button')).toBeDisabled();
  //     const searchInput = utils.getByPlaceholderText(/Enter Country/i);
  //     fireEvent.change(searchInput, {target: {value: 'india'}})
  //     expect(searchInput?.value).toBe('india')

  //     expect(ButtonSubmit.closest('button')).not.toBeDisabled();
  //     userEvent.click(ButtonSubmit);
  //     expect(history.location.pathname).toBe('/countryDetail');
  //   });
  // });
