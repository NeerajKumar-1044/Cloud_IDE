import 'dotenv/config'
import {connectDb} from './Config/db.js'
import {app} from "./app.js"


const port = process.env.PORT ?? 5001;

try {
    connectDb().then(async () => {
        app.listen(port, () =>
        console.log(`Server is listening on port ${port}!`),
        );
    });
} catch (error) {
    console.log(error);
}
