const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));

const baseTemplate = (title, content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - My Website</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    nav {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 1rem 0;
      position: sticky;
      top: 0;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    nav .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    nav .logo {
      color: white;
      font-size: 1.5em;
      font-weight: bold;
    }
    nav ul {
      list-style: none;
      display: flex;
      gap: 2rem;
    }
    nav a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
    }
    nav a:hover {
      opacity: 0.8;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 6rem 0;
      text-align: center;
    }
    .hero h1 {
      font-size: 3em;
      margin-bottom: 1rem;
    }
    .hero p {
      font-size: 1.2em;
      margin-bottom: 2rem;
    }
    .btn {
      display: inline-block;
      background: white;
      color: #667eea;
      padding: 0.8rem 2rem;
      border-radius: 5px;
      text-decoration: none;
      font-weight: bold;
      transition: transform 0.3s;
    }
    .btn:hover {
      transform: scale(1.05);
    }
    section {
      padding: 4rem 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .card {
      background: #f4f4f4;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
    .card h3 {
      color: #667eea;
      margin-bottom: 1rem;
    }
    h2 {
      color: #667eea;
      font-size: 2em;
      margin-bottom: 1rem;
      text-align: center;
    }
    footer {
      background: #333;
      color: white;
      text-align: center;
      padding: 2rem;
      margin-top: 4rem;
    }
    form {
      max-width: 600px;
      margin: 2rem auto;
    }
    input, textarea {
      width: 100%;
      padding: 0.8rem;
      margin: 0.5rem 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-family: inherit;
    }
    input[type="submit"] {
      background: #667eea;
      color: white;
      cursor: pointer;
      font-weight: bold;
      border: none;
    }
    input[type="submit"]:hover {
      background: #764ba2;
    }
  </style>
</head>
<body>
  <nav>
    <div class="container">
      <div class="logo">🌟 My Site</div>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <main>
    ${content}
  </main>

  <footer>
    <div class="container">
      <p>&copy; 2025 My Website. Built with Node.js and deployed on Azure.</p>
    </div>
  </footer>
</body>
</html>
`;

app.get('/', (req, res) => {
  const content = `
    <section class="hero">
      <div class="container">
        <h1>Welcome to My Website! 🚀</h1>
        <p>A professional website deployed on Azure</p>
        <a href="/about" class="btn">Learn More</a>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Featured Services</h2>
        <div class="grid">
          <div class="card">
            <h3>⚡ Fast & Reliable</h3>
            <p>Hosted on Azure's cloud infrastructure for maximum uptime and performance.</p>
          </div>
          <div class="card">
            <h3>🔒 Secure</h3>
            <p>Enterprise-grade security with SSL/TLS encryption for all connections.</p>
          </div>
          <div class="card">
            <h3>📱 Responsive</h3>
            <p>Beautiful design that works perfectly on desktop, tablet, and mobile devices.</p>
          </div>
        </div>
      </div>
    </section>
  `;
  res.send(baseTemplate('Home', content));
});

app.get('/about', (req, res) => {
  const content = `
    <section class="hero">
      <div class="container">
        <h1>About Us</h1>
        <p>Learn more about our website and mission</p>
      </div>
    </section>
    <section>
      <div class="container">
        <h2>Our Story</h2>
        <p style="margin-bottom: 1rem; text-align: center; font-size: 1.1em;">
          This website is built with modern web technologies and deployed on Microsoft Azure's free tier.
        </p>
        <p style="text-align: center; margin-bottom: 2rem;">
          We're committed to providing fast, secure, and reliable web experiences for everyone.
        </p>
        <h2 style="margin-top: 3rem;">Why Choose Us?</h2>
        <div class="grid">
          <div class="card">
            <h3>🎯 Focused</h3>
            <p>We focus on delivering quality and reliability every single day.</p>
          </div>
          <div class="card">
            <h3>💡 Innovative</h3>
            <p>Using the latest technologies to stay ahead of the curve.</p>
          </div>
          <div class="card">
            <h3>👥 Customer First</h3>
            <p>Your satisfaction and success is our top priority.</p>
          </div>
        </div>
      </div>
    </section>
  `;
  res.send(baseTemplate('About', content));
});

app.get('/services', (req, res) => {
  const content = `
    <section class="hero">
      <div class="container">
        <h1>Our Services</h1>
        <p>Everything you need for a great online presence</p>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="grid">
          <div class="card">
            <h3>🌐 Web Hosting</h3>
            <p>Reliable cloud hosting with 99.95% uptime guarantee on Azure infrastructure.</p>
          </div>
          <div class="card">
            <h3>🛠️ Web Development</h3>
            <p>Custom websites built with Node.js, React, and modern frameworks.</p>
          </div>
          <div class="card">
            <h3>📊 Analytics</h3>
            <p>Track your website performance with detailed insights and reports.</p>
          </div>
          <div class="card">
            <h3>🔐 Security</h3>
            <p>SSL certificates, DDoS protection, and security monitoring included.</p>
          </div>
          <div class="card">
            <h3>⚙️ Support</h3>
            <p>24/7 technical support to keep your website running smoothly.</p>
          </div>
          <div class="card">
            <h3>🚀 Deployment</h3>
            <p>One-click deployment to Azure with automatic scaling.</p>
          </div>
        </div>
      </div>
    </section>
  `;
  res.send(baseTemplate('Services', content));
});

app.get('/contact', (req, res) => {
  const content = `
    <section class="hero">
      <div class="container">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you</p>
      </div>
    </section>
    <section>
      <div class="container">
        <form>
          <input type="text" placeholder="Your Name" required>
          <input type="email" placeholder="Your Email" required>
          <textarea placeholder="Your Message" rows="6" required></textarea>
          <input type="submit" value="Send Message">
        </form>
        <div style="text-align: center; margin-top: 3rem;">
          <h3>Contact Information</h3>
          <p>📧 Email: info@mywebsite.com</p>
          <p>📞 Phone: +1 (555) 123-4567</p>
          <p>📍 Location: Hosted on Azure Cloud</p>
        </div>
      </div>
    </section>
  `;
  res.send(baseTemplate('Contact', content));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
