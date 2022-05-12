import "@testing-library/jest-dom";
import server from "./mocks/server";

// import { configure } from 'enzyme';
// import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

// configure({
//     adapter: new Adapter()
// });

// before the first test runs...
beforeAll(() => server.listen());

// after the last test completes...
afterAll(() => server.close());
