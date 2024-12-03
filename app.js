// Importera nödvändiga moduler
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes'); // Lägg till denna rad för att importera dina routes

// Ladda miljövariabler från .env-filen
dotenv.config();

// Skapa Express-applikation
const app = express();
app.use(express.json()); // Middleware för att hantera JSON-data

// Konfigurera databasen
mongoose.connect(process.env.DB_URI, { dbName: 'todo' })
  .then(() => {
    console.log('Ansluten till databasen');
  })
  .catch((err) => {
    console.log('Fel vid anslutning till databasen:', err);
  });

// Skapa en enkel GET-route för att testa servern
app.get('/', (req, res) => {
    res.send('Server är igång!');
});

// Koppla dina ToDo-routes
app.use('/api/todos', taskRoutes);

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('Server lyssnar på port ' + PORT);
});
