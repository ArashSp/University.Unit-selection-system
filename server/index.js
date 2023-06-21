const express = require("express");
const compression = require("compression");
const fs = require("fs");
const { renderPage } = require("vite-plugin-ssr/server");

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;
const subjectList = require("./subjectList.json");
const userlist = require("./users.json");

startServer();

async function startServer() {
  const app = express();

  app.use(compression());

  if (isProduction) {
    const sirv = require("sirv");
    app.use(sirv(`${root}/dist/client`));
  } else {
    const vite = require("vite");
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares;
    app.use(viteDevMiddleware);
  }

  app.get("*", async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints)
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    res.status(statusCode).type(contentType).send(body);
  });

  const port = process.env.PORT || 8081;

  app.use(express.json({ limit: "50mb" }));

  app.post("/Account/Validate", (req, res) => {
    console.log(req.body);
    console.log(userlist);

    userlist.forEach((element) => {
      if (
        element.phoneNumber === req.body.username &&
        element.password === req.body.password
      ) {
        res.json({
          success: true,
          firstName: element.firstName,
          lastName: element.lastName,
          Average: element.Average,
          currentSemester: element.currentSemester,
          StudentID: element.StudentID,
          passedSubjects: element.passedSubjects,
        });
      } else {
        res.json({
          success: false,
          errorMessage: "نام کاربری یا رمز عبور اشتباه است",
        });
      }
    });
  });

  app.post("/Selection/SubjectData", (req, res) => {
    res.json({ subjectList: subjectList });
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
