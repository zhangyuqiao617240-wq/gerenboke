import mysql from 'mysql2/promise';

async function viewPosts() {
  try {
    // Create a new database connection
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'gerenboke'
    });

    // Query all posts
    const [rows] = await connection.execute('SELECT post_id, title, content FROM posts');
    
    console.log('=== CURRENT POSTS IN DATABASE ===');
    console.log('Total posts:', rows.length);
    console.log('=================================');
    
    rows.forEach((post, index) => {
      console.log(`\nPost ${index + 1}:`);
      console.log(`ID: ${post.post_id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Content preview: ${post.content.substring(0, 150)}...`);
    });
    
    await connection.end();
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

viewPosts();