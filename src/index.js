const app = require('./app');
require("./database");

/* Conectar a servidor */
app.listen(app.get("port"), () => {
    console.log(`Example app listening at http://localhost:${app.get("port")}`);
});