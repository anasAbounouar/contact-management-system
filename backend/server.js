const app = require('./App');  
const sequelize = require('./config/db');  
// Sync the database and start the server
const PORT = process.env.PORT || 5000;  // Provide a fallback port if not set

sequelize.authenticate()
    .then(() => {
        console.log('Connected to PostgreSQL');
        return sequelize.sync(); // Sync models with the database
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
    });
