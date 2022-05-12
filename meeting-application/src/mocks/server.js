import handlers from "./handlers";
import { setupServer } from "msw/node";

// we use spread operator to pass each item of handlers as an argument to setupServer
// fn( ...[ 1, 2, 3 ] ) -> fn( 1, 2, 3 )
const server = setupServer(...handlers);

export default server;
