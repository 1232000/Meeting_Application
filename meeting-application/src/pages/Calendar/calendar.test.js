import Calendar from "./Calendar";
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import   store  from '../../store';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

test('should show a loading message when it start up', () => {
    render(
        <Provider store={store}> 
        <BrowserRouter>
    <Calendar/>
    </BrowserRouter>
    </Provider> );

    const loadingMessage = screen.getByRole( 'alert', {name : 'meetings are being fetched'} );
    expect( loadingMessage ).toHaveTextContent( 'We are fetching meetings. Hang on.' );
});

test('should fetch and load the initial set of meetings from the server', async() => {
    render( <Provider store={store}>
        <BrowserRouter> 
        <Calendar/>
        </BrowserRouter>
        </Provider>);


    userEvent.type(screen.getByLabelText('select date to get meetings'),'2020-10-28');

    const testEl = await screen.findByText( 'Increasing brand awareness and spreading information about new products' );
    // const test1El = await screen.findByText( 'test run1' );

    expect(testEl).toBeInTheDocument();
    // expect( test1El ).toBeInTheDocument();


    const loadingMessage = screen.queryByRole( 'alert', {name : 'meetings are being fetched'} );
    expect( loadingMessage ).not.toBeInTheDocument();
});