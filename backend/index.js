import {app, server} from './app.js';
import 'dotenv/config';




const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);