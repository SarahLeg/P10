import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './Redux/store';

test('renders main element', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  
  // Vérifie si l'élément principal existe dans le DOM
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();
});