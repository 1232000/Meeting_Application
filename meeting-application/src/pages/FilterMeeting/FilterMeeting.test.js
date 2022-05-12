import FilterMeeting from './FilterMeeting'
import {render, screen, findByRole, waitForElementToBeRemoved} from '@testing-library/react';
import { Provider } from 'react-redux';
import   store  from '../../store';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';

test('should fetch and load the initial set of meetings from the server', async() => {
    render( <Provider store={store}>
        <BrowserRouter> 
        <FilterMeeting/>
        </BrowserRouter>
        </Provider>);
        const submitButton = screen.getByRole("button", { name: /Search/i });
        userEvent.click(submitButton);

        const testEl = await screen.findByText( 'Increasing brand awareness and spreading information about new products');
        expect (testEl).toBeInTheDocument();

});

test('should execuse a meeting', async () => {
    render( <Provider store={store}>
        <BrowserRouter> 
        <FilterMeeting/>
        </BrowserRouter>
        </Provider>);
        
    const searchMeetButton = await screen.findByRole( 'button', { name: 'Search' } );
    userEvent.click(searchMeetButton)
    
    const meetingToBeExcused = await screen.findByTestId( "623b49d992127900155135e2" );


    // eslint-disable-next-line testing-library/prefer-screen-queries
    const deleteButton = await findByRole( meetingToBeExcused , 'button', { name: /Excuse Yourself/i } );

    userEvent.click( deleteButton );

    await waitForElementToBeRemoved( meetingToBeExcused );
});

    
// describe("Excuse Meetings",()=>{

//     const meeting ={
//         "_id": "623b52eb92127900155135e3",
//     "name": "Google Meet",
//     "description": "Captivators",
//     "date": "2023-03-28T00:00:00.000Z",
//     "startTime": {
//         "hours": 9,
//         "minutes": 0
//     },
//     "endTime": {
//         "hours": 10,
//         "minutes": 30
//     },
//     "attendees": [
//         {
//             "userId": "61fe624432994c0015b74cf6",
//             "email": "yash@sapient.com"
//         },
//         {
//             "userId": "620dc59385286a0015fa41bc",
//             "email": "anup@sapient.com"
//         },
//         {
//             "userId": "62125c34bb70ff0015563554",
//             "email": "udbhav@sapient.com"
//         }
//     ],

//     }

//     test('should execuse a meeting', async () => {
//         render( <Provider store={store}>
//             <BrowserRouter> 
//             <FilterMeeting/>
//             </BrowserRouter>
//             </Provider>);
    

//         const searchButton = screen.getByRole("button", { name: /Search/i });
//          userEvent.click(searchButton);

//         const contactToBeDeleted = await screen.findByTitle( /Meeting - Google Meet/i );
    
//         userEvent.hover( contactToBeDeleted );
    
//         const deleteButton = await screen.findByRole( contactToBeDeleted, 'button', { name: /Excuse Yourself/i } );
    
//         userEvent.click( deleteButton );
    
//         await waitForElementToBeRemoved( contactToBeDeleted );
//     });
// });
    



















// test('should add members in the meeting', async () => {
//     render( <Provider store={store}>
//         <BrowserRouter> 
//         <FilterMeeting/>
//         </BrowserRouter>
//         </Provider>);


//     const emailEl = await screen.findAllByText(/anup@sapient.com/i);
//     userEvent.hover( emailEl[0] );
    
//     const addButton = await screen.findAllByRole( 'button' , {name: 'Add' } );

//     userEvent.click( addButton[0] );

//     const addAttendeeInput = await screen.findByLabelText( /Members:/i );

    


// });