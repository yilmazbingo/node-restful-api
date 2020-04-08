# RESTFUL-API

- We cannot use app in separate files.

      const app=require("express")()
      
  So we use router and export it.
  
      const router = require("express").Router();
      
      
      module.exports = router;

each router that defined in /routes directory is middleware. We need to tell express, we have some middlewares and we like to use them in specific routes. in /index.js

    app.use("/api/courses", require("./routes/courses"));
    app.use("/", require("./routes/home"));
    app.use("/api/genres", require("./routes/genres"));

- [Helmet](https://www.npmjs.com/package/helmet) is a collection of 12 smaller middleware functions that set HTTP response headers. Running app.use(helmet()) will not include all of these middleware functions by default.

### DNS FETCHING
DNS prefetching is a way to enhance the performance of the front-end of a website. We can use it to tell the browser which assets (actually only the domain names where these assets are located) the user might need in the future — before they even need them. With it, the page loads faster, and users can achieve their goals as quickly as possible.

         <link rel="dns-prefetch" href="//www.example.com">

### Clickjacking 
It is an attack that tricks a user into clicking a webpage element which is invisible or disguised as another element. This can cause users to unwittingly download malware, visit malicious web pages, provide credentials or sensitive information, transfer money, or purchase products online.
Typically, clickjacking is performed by displaying an invisible page or HTML element, inside an iframe, on top of the page the user sees. The user believes they are clicking the visible page but in fact they are clicking an invisible element in the additional page transposed on top of it.
Helmet’s crossdomain middleware prevents Adobe Flash and Adobe Acrobat from loading content on your site.
Most headers prefixed with an 'X-' are non-standard)

[MORGAN](https://www.npmjs.com/package/morgan)
simplifies the process of logging requests to your application. 
