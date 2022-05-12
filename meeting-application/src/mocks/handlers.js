import { rest } from "msw";

const handlers = [
    rest.get(
        `https://mymeetingsapp.herokuapp.com/api/teams`,
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        name: "group team",
                        shortName: "agile",
                        description:
                            "Team spreading awareness about Agile practices at Zwiggy",
                        members: [
                            {
                                userId: 123,
                                email: "john.doe@example.com",
                            },
                            {
                                userId: 456,
                                email: "jane.doe@example.com",
                            },
                        ],
                    },
                    {
                        name: "Captivators",
                        shortName: "group3",
                        description: "Final Demo",
                        members: [
                            {
                                userId: 123,
                                email: "johndoe@sapient.com",
                            },
                            {
                                userId: 456,
                                email: "janedoe@sapient.com",
                            },
                        ],
                    },
                ])
            );
        }
    ),
    rest.post(
        `https://mymeetingsapp.herokuapp.com/api/teams`,
        (req, res, ctx) => {
            return res(
                ctx.json({
                    name: "Captivators",
                    shortName: "group3",
                    description: "Final Demo",
                    members: [
                        {
                            userId: 123,
                            email: "johndoe@sapient.com",
                        },
                        {
                            userId: 456,
                            email: "janedoe@sapient.com",
                        },
                    ],
                })
            );
        }
    ),
    rest.get(
        "https://mymeetingsapp.herokuapp.com/api/calendar",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        _id: "623b49d992127900155135e2",
                        name: "Google marketing campaign",
                        description:
                            "Increasing brand awareness and spreading information about new products",
                        date: "2020-10-28T00:00:00.000Z",
                        startTime: {
                            hours: 9,
                            minutes: 0,
                        },
                        endTime: {
                            hours: 10,
                            minutes: 30,
                        },
                        attendees: [
                            {
                                userId: "61fe624432994c0015b74cf6",
                                email: "yash@sapient.com",
                            },
                            {
                                userId: "620dc59385286a0015fa41bc",
                                email: "anup@sapient.com",
                            },
                            {
                                userId: "62125c34bb70ff0015563554",
                                email: "udbhav@sapient.com",
                            },
                        ],
                    },
                ])
            );
        }
    ),

    rest.get(
        "https://mymeetingsapp.herokuapp.com/api/meetings",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        _id: "623b49d992127900155135e2",
                        name: "Google marketing campaign",
                        description:
                            "Increasing brand awareness and spreading information about new products",
                        date: "2020-10-28T00:00:00.000Z",
                        startTime: {
                            hours: 9,
                            minutes: 0,
                        },
                        endTime: {
                            hours: 10,
                            minutes: 30,
                        },
                        attendees: [
                            {
                                userId: "61fe624432994c0015b74cf6",
                                email: "yash@sapient.com",
                            },
                            {
                                userId: "620dc59385286a0015fa41bc",
                                email: "anup@sapient.com",
                            },
                            {
                                userId: "62125c34bb70ff0015563554",
                                email: "udbhav@sapient.com",
                            },
                        ],
                    },
                ])
            );
        }
    ),

    rest.get(
        "https://mymeetingsapp.herokuapp.com/api/meetings?period=all",
        (req, res, ctx) => {
            return res(
                ctx.json([
                    {
                        _id: "623b49d992127900155135e2",
                        name: "Google marketing campaign",
                        description:
                            "Increasing brand awareness and spreading information about new products",
                        date: "2020-10-28T00:00:00.000Z",
                        startTime: {
                            hours: 9,
                            minutes: 0,
                        },
                        endTime: {
                            hours: 10,
                            minutes: 30,
                        },
                        attendees: [
                            {
                                userId: "61fe624432994c0015b74cf6",
                                email: "yash@sapient.com",
                            },
                            {
                                userId: "620dc59385286a0015fa41bc",
                                email: "anup@sapient.com",
                            },
                            {
                                userId: "62125c34bb70ff0015563554",
                                email: "udbhav@sapient.com",
                            },
                        ],
                    },
                ])
            );
        }
    ),

    rest.patch( `https://mymeetingsapp.herokuapp.com/api/meetings/623b49d992127900155135e2?action=remove_attendee`, ( req, res, ctx ) => {
        return res(
            ctx.json( {
                _id: "623b49d992127900155135e2",
                        name: "Google marketing campaign",
                        description:
                            "Increasing brand awareness and spreading information about new products",
                        date: "2020-10-28T00:00:00.000Z",
                        startTime: {
                            hours: 9,
                            minutes: 0,
                        },
                        endTime: {
                            hours: 10,
                            minutes: 30,
                        },
                        attendees: [
                            {
                                userId: "61fe624432994c0015b74cf6",
                                email: "yash@sapient.com",
                            },
                            {
                                userId: "620dc59385286a0015fa41bc",
                                email: "anup@sapient.com",
                            },
                            {
                                userId: "62125c34bb70ff0015563554",
                                email: "udbhav@sapient.com",
                            },
                        ],
            } )
        );
    }),
];

export default handlers;
