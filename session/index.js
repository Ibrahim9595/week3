import http from "http";
import { uid } from "uid";
import { object, string } from "yup";

const todoScheme = object({
  task: string("This should be a string value"),
});

const todos = [];
const server = http.createServer((req, res) => {
  //   TODO
  // list todos
  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.write(JSON.stringify(todos));
    res.end();
  }

  // add todo
  if (req.method === "POST") {
    const chunks = [];
    req.on("data", (chunk) => {
      chunks.push(chunk);
    });

    req.on("end", () => {
      try {
        const todo = todoScheme.validateSync(JSON.parse(chunks.toString()), {
          strict: true,
        });
        todos.push({ finished: false, ...todo, id: uid() });
        res.setHeader("Content-Type", "application/json");
        res.writeHead(201);
        res.write(JSON.stringify(todos));
        res.end();
      } catch (error) {    
        res.writeHead(400);
        res.end();
      }
    });

    req.on("error", (error) => {
      res.setHeader("Content-Type", "text");
      res.writeHead(500);
      res.write(error.message);
      res.end();
    });
  }

  // finish todo
  if (req.method === "PATCH") {
    const id = req.url.split("/").at(-1);
    const todoIdx = todos.findIndex((el) => el.id === id);
    if (todoIdx !== -1) {
      todos[todoIdx].finished = true;
    }

    res.setHeader("Content-Type", "application/json");
    res.writeHead(204);
    res.end();
  }

  //   res.writeHead(404)
  //   res.end()
});

server.listen(8080, () => {
  console.log("SERVER is running on http://localhost:8080");
});
