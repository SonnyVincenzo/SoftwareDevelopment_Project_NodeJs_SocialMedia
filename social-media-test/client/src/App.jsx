import { useEffect, useState } from "react";

function App() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  //fetch posts from the backend
  const fetchPosts = async () => {
    const res = await fetch("http://localhost:5000/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //Submit post function
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content })
    });

    setContent("");
    fetchPosts();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", fontFamily: '"Comic Sans MS", Cursive' }}>
      {/*The website header*/}
      <h1 style={{ fontFamily: '"Comic Sans MS", cursive', color: "yellow"}}>
        My Cool Website :D
        </h1>

      {/*The text box where you write your post*/}
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          style={{ 
            width: "100%", 
            marginBottom: "50px", 
            backgroundColor: "lightyellow", 
            color: "black", 
            border: "4px solid gold" }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What are you thinking about?"
        />
        {/*Submit button*/}
        <button 
          type="submit"
            style={{
              backgroundColor: "yellow",
              color: "black",
              border: "none",
              padding: "10px 16px"
            }}
          >
            Post your thoughts here!
        </button>
      </form>

      <hr style= {{ borderColor: "white" }}/>

      <h2 style={{ color: "yellow" }}>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} style={{ padding: "5px 0", borderBottom: "1px solid #ccc" }}>
          {post.content}
        </div>
      ))}
    </div>
  );
}

export default App;