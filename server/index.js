const express = require("express");
const compression = require("compression");
const { renderPage } = require("vite-plugin-ssr/server");

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

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

  const SubjectList = [
    {
      name: "ریاضی",
      unit: "2",
      teacherName: " احمد اصغری",
      ClassDates: "چهارشنبه ",
      ClassStartTime: "14:30",
      ClassEndTime: "16",
      ExamDate: "30",
      ExamDay: "شنبه",
      ExamMonth: "خرداد",
      ExamTime: "8",
      quota: 30,
      classPlace: "ساختمان علوم پایه کلاس 611",
    },
  ];

  app.use(express.json({ limit: "50mb" }));

  app.post("/Account/Validate", (req, res) => {
    console.log(req.body);

    if (req.body.username === "09199061428" && req.body.password === "123456") {
      res.json({
        success: true,
        accesslevel: "User",
      });
    } else if (
      req.body.username === "09129360130" &&
      req.body.password === "0150231016"
    ) {
      res.json({
        success: true,
        accesslevel: "Admin",
      });
    } else {
      res.json({
        success: false,
        errorMessage: "نام کاربری یا رمز عبور اشتباه است",
      });
    }
  });

  app.post("/Selection/SubjectData", (req, res) => {
    res.json({ subjectList: SubjectList });
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
