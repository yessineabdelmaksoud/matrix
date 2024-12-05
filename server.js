const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Chemin vers le fichier JSON
const usersFilePath = path.join(__dirname, 'src', 'connection', 'data', 'users.json');

// Helper pour lire les utilisateurs
const getUsers = () => {
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  }
  return [];
};

// Helper pour sauvegarder les utilisateurs
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Endpoint pour l'inscription
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json('Tous les champs sont obligatoires.');
  }

  const users = getUsers();

  // Vérifier si l'utilisateur existe déjà
  if (users.some((user) => user.email === email)) {
    return res.status(400).json('Un utilisateur avec cet email existe déjà.');
  }

  // Ajouter le nouvel utilisateur
  const newUser = { id: Date.now(), username, email, password };
  users.push(newUser);
  saveUsers(users);

  return res.status(201).json('Inscription réussie !');
});

// Endpoint pour la connexion
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Tous les champs sont obligatoires.');
  }

  const users = getUsers();

  // Vérifier les identifiants
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json('Email ou mot de passe incorrect.');
  }

  // Stocker l'utilisateur dans la session
  req.session.user = user;

  return res.status(200).json(user);
});

// Endpoint pour la déconnexion
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json('Erreur lors de la déconnexion.');
    }
    res.status(200).json('Déconnexion réussie !');
  });
});

// Endpoint pour obtenir l'utilisateur connecté
app.get('/user', (req, res) => {
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json('Non autorisé.');
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
