const http = require("http");

const todos = [
  {
    id: 1,
    text: "todo one",
  },
  {
    id: 2,
    text: "todo two",
  },
  {
    id: 3,
    text: "todo three",
  },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log(body);

      let status = 404;
      const response = {
        success: false,
        results: [],
        error: "",
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.results = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = "Please add id and text :3";
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.results = todos;
        }
      }

      res.writeHead(status, {
        "Content-Type": "application/json",
        "X-Powered-By": "Node.js",
      });

      res.end(JSON.stringify(response));
    });
});

const port = 8080;

server.listen(port, () => {
  console.log(`Server dah nyala :] \nport: ${port}`);
});
