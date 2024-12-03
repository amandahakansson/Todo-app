const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskRoutes'); 


dotenv.config();


const app = express();
app.use(express.json()); 


mongoose.connect(process.env.DB_URI, { dbName: 'todo' })
  .then(() => {
    console.log('Ansluten till databasen');
  })
  .catch((err) => {
    console.log('Fel vid anslutning till databasen:', err);
  });


app.get('/', (req, res) => {
    res.send('Server är igång!');
});

app.use('/api/todos', taskRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('Server lyssnar på port ' + PORT);
});
