# Personal Blog Website

A personal blog website built with Astro + Node.js + MySQL, supporting article publishing, editing, deletion, and browsing functionalities.

## Tech Stack

### Frontend
- Astro Framework
- HTML + CSS + JavaScript
- Responsive Design

### Backend
- Node.js + Express
- MySQL Database
- JWT Authentication

## Features

- ✅ Article list display (shows only articles existing in the database)
- ✅ Article detail viewing
- ✅ Article publishing functionality
- ✅ Article editing functionality
- ✅ Article deletion functionality
- ✅ User registration and login
- ✅ Comment functionality (to be improved)

## Data Flow

All article data is dynamically fetched from the database, not using local storage:

1. When the page loads, the frontend calls backend APIs via fetch API
2. The backend queries article data from the MySQL database
3. The backend returns article data in JSON format
4. The frontend renders the article content
5. Non-existent article IDs display a 404 page

## Development Instructions

### Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Backend Development

```bash
# Enter backend directory
cd server

# Install dependencies
npm install

# Start development server
npm run dev
```

## Database Design

### Table Structure

#### users Table
- user_id (Primary Key)
- username
- email
- password
- created_at

#### posts Table
- post_id (Primary Key)
- title
- content
- author_id (Foreign Key, references users table)
- created_at
- updated_at

#### comments Table
- comment_id (Primary Key)
- post_id (Foreign Key, references posts table)
- author_id (Foreign Key, references users table)
- content
- created_at

## Notes

1. The website only displays articles that actually exist in the database
2. Accessing non-existent article IDs will display a 404 page
3. Non-logged-in users cannot publish, edit, or delete articles
4. Only article authors can edit or delete their own articles
5. User authentication information is stored in localStorage using JWT

## License

MIT License.
