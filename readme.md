# 🎓 Application d'Orientation pour Collégiens

Application complète d'orientation professionnelle pour collégiens. 

## 🚀 Installation rapide

### 1. Base de données PostgreSQL

```bash
docker run --name postgres-orientation \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=orientation_db \
  -p 5432:5432 \
  -d postgres:15
```

### 2.  Backend

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

Dans un autre terminal:
```bash
cd backend
npm run seed
```

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## 🌐 Accès

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 🔐 Comptes de test

Après le seed :
- **Élève**: eleve@test.fr / password123
- **Parent**: parent@test.fr / password123
- **Professionnel**: pro@test. fr / password123

## 📚 Stack technique

### Backend
- NestJS 10
- TypeORM
- PostgreSQL
- JWT (Passport)
- Multer (upload vidéos)

### Frontend
- Nuxt 3
- Vue 3 Composition API
- Pinia (state management)
- Tailwind CSS

## ✨ Fonctionnalités

✅ Authentification JWT (3 rôles)  
✅ Quiz d'orientation interactif  
✅ Base de données de 15+ métiers  
✅ Upload de vidéos (max 50MB)  
✅ Carte d'orientation personnalisée  
✅ Algorithme de recommandation  
✅ Dashboards différenciés par rôle  
✅ Parcours d'orientation détaillé  
✅ Statistiques pour parents  

## 📖 Structure

```
orientation-app/
├── backend/          # API NestJS
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── professions/
│   │   ├── videos/
│   │   ├── quiz/
│   │   └── orientation/
│   └── uploads/
│
└── frontend/         # App Nuxt 3
    ├── pages/
    ├── components/
    ├── stores/
    └── composables/
```

## 🔒 Sécurité

- Mots de passe hashés (bcrypt)
- JWT avec expiration
- Guards NestJS
- Validation inputs
- Upload sécurisé

## 👨‍💻 Développé avec ❤️

Pour aider les collégiens dans leur orientation professionnelle. 
