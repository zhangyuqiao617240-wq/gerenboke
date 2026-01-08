import db from './db/db.js';

async function checkPosts() {
  try {
    const [rows] = await db.execute('SELECT post_id, title, content FROM posts');
    console.log('Current posts in database:');
    rows.forEach(post => {
      console.log(`\nPost ID: ${post.post_id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Content: ${post.content.substring(0, 100)}...`);
    });
    await db.end();
  } catch (error) {
    console.error('Error checking posts:', error);
    await db.end();
  }
}

checkPosts();