import pool from './db/db.js';

async function updatePostsToEnglish() {
  try {
    console.log('=== UPDATING POSTS TO ENGLISH ===');
    
    // First, let's delete all existing posts
    await pool.execute('DELETE FROM posts');
    console.log('✓ Deleted all existing posts');
    
    // Define the 5 posts in English
    const englishPosts = [
      {
        title: 'My Programming Learning Journey',
        content: 'This is my programming learning journey, from beginner to proficient. I started learning programming from scratch, experienced countless setbacks and failures, but eventually persisted and became an excellent developer. During this process, I learned various programming languages and technology stacks, including HTML, CSS, JavaScript, Python, and more. I also participated in various programming competitions and project practices, accumulating rich experience. Through continuous learning and practice, I deeply realized that programming is not just a technology, but also a way of thinking. It taught me how to analyze problems, solve problems, how to work in a team, and how to continue learning and progressing. Although the programming learning journey is difficult, the harvest is full, and I will continue on this path.',
        author_id: 1
      },
      {
        title: 'Best Music Recommendations for Programming',
        content: 'Listening to music while programming can improve efficiency and reduce interference. Here are my recommended types of music: 1. Classical music: Works by Bach, Mozart, etc., with stable rhythm, helping to concentrate. 2. Electronic music: Such as Ambient, Chillout, etc., with slow rhythm, not distracting attention. 3. Movie soundtracks: Like "Interstellar", "Inception", etc., full of layers, can inspire creativity. 4. White noise: Like rain sounds, ocean waves, etc., can mask environmental noise and create a quiet atmosphere. 5. Music without lyrics: Avoid lyric interference in thinking. Everyone has different preferences, it is recommended to choose music that suits you according to your habits.',
        author_id: 1
      },
      {
        title: 'How to Efficiently Learn New Technologies',
        content: 'Learning new technologies requires planning and methods. Here are my suggestions: 1. Clear learning goals: Determine why you want to learn this technology and what level you want to achieve. 2. Make a learning plan: Break down big goals into small goals and make a reasonable learning progress. 3. Choose high-quality resources: Such as official documentation, high-quality tutorials, books, etc. 4. Combine practice with theory: After learning for a period of time, immediately start practicing, consolidating knowledge through projects. 5. Participate in the community: Join relevant technical communities, learn from others, and share your own experience. 6. Review regularly: Review learned knowledge, deepen understanding. 7. Apply to actual projects: Apply the learned technology to actual projects to improve practical application ability. Through these methods, you can learn new technologies more efficiently and master them quickly for work.',
        author_id: 1
      },
      {
        title: 'How Tech People Balance Learning and Life',
        content: 'As a tech person, learning is essential, but also pay attention to balancing life. Here are my suggestions: 1. Make a reasonable learning plan: Don\'t overstudy, leave yourself time to rest. 2. Set learning boundaries: Focus on work during work time, focus on learning during learning time, and rest well during rest time. 3. Cultivate hobbies: In addition to programming, cultivate other hobbies, such as sports, reading, traveling, etc. 4. Maintain health: Exercise regularly, maintain good eating habits, adequate sleep. 5. Communicate with family and friends: Spend time with family and friends, maintain good interpersonal relationships. 6. Learn to relax: After work and study, learn to relax, such as listening to music, meditating, etc. Balancing learning and life can maintain lasting learning motivation and creativity, and achieve long-term career development.',
        author_id: 1
      },
      {
        title: '5 Ways Learning Programming Changed My Thinking',
        content: 'Learning programming not only allowed me to master a technology, but also changed my way of thinking: 1. Structured thinking: Programming needs to break down problems into multiple steps, cultivating my structured thinking ability. 2. Logical thinking: Programming requires rigorous logical reasoning, improving my logical thinking ability. 3. Problem-solving ability: Various problems are encountered during programming, cultivating my ability to analyze and solve problems. 4. Abstract thinking: Programming needs to abstract real problems into code models, improving my abstract thinking ability. 5. Continuous learning ability: Technology updates and iterates quickly, cultivating my habit and ability of continuous learning. These ways of thinking are not only useful in programming, but also have a positive impact on my life and work.',
        author_id: 1
      }
    ];
    
    // Insert the English posts
    let insertedCount = 0;
    for (const post of englishPosts) {
      const [result] = await pool.execute(
        'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
        [post.title, post.content, post.author_id]
      );
      insertedCount++;
      console.log(`✓ Added English post: "${post.title}" (ID: ${result.insertId})`);
    }
    
    console.log('=================================');
    console.log(`🎉 Successfully updated all posts to English!`);
    console.log(`📊 Total posts added: ${insertedCount}`);
    console.log('=================================');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error updating posts:', error.message);
    process.exit(1);
  }
}

updatePostsToEnglish();