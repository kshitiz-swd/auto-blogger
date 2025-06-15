'use client'

import React, { useState } from 'react';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [blog, setBlog] = useState('');
  const [loading, setLoading] = useState(false);

const generateBlog = async () => {
  if (!prompt) return;

  setLoading(true);
  setBlog('');

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setBlog(data.blog || "No blog content returned.");
  } catch (error) {
    console.error("Error calling API:", error);
    setBlog("Something went wrong while generating the blog.");
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen bg-gray-100">

      <header className="bg-violet-600 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">BlogGenius</h1>
      </header>


      <main className="flex justify-center items-center py-16 px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Generate Your Blog Post</h2>
          <p className="text-gray-600 mb-4">
            Enter a topic or prompt below to generate the blog.
          </p>

          <textarea
            className="w-full p-3 border rounded-md mb-4 text-gray-700"
            placeholder="E.g., Write a blog post about sustainable living practices for urban apartments"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
          />

          <button
            className="bg-violet-600 text-white py-2 px-6 rounded hover:bg-violet-700"
            onClick={()=> generateBlog()}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Blog Post'}
          </button>

          {blog && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Generated Blog:</h3>
              <div className="prose max-w-none whitespace-pre-wrap text-gray-800">{blog}</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
