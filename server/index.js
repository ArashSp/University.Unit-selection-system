const express = require("express");
const compression = require("compression");
const fs = require("fs");
const { renderPage } = require("vite-plugin-ssr/server");

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

// imports our data from jsons
var subjectList = require("./subjectList.json");
var userlist = require("./users.json");

startServer();

// stats the server
async function startServer() {
  const app = express();

  app.use(compression());

  // uses vue middleware
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

  // custom middleware
  app.get("*", async (req, res, next) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    const { httpResponse } = pageContext;
    if (!httpResponse) return next();
    const { body, statusCode, contentType, earlyHints } = httpResponse;
    if (res.writeEarlyHints) {
      res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    }
    return res.status(statusCode).type(contentType).send(body);
  });

  // add port for server
  const port = process.env.PORT || 8081;

  // increase payload size to 50mb
  app.use(express.json({ limit: "50mb" }));

  // returns login validation info
  app.post("/Account/Validate", (req, res) => {
    let list = userlist.filter(
      (x) =>
        x.phoneNumber === req.body.username && x.password === req.body.password
    );
    if (list.length > 0) {
      list.forEach((element) => {
        data = {
          success: true,
          firstName: element.firstName,
          lastName: element.lastName,
          Average: element.Average,
          currentSemester: element.currentSemester,
          StudentID: element.StudentID,
          passedSubjects: element.passedSubjects,
          SelectedCourses: element.SelectedCourses,
        };
      });
    } else {
      data = {
        success: false,
        errorMessage: "نام کاربری یا رمز عبور اشتباه است",
      };
    }
    res.json({ success: data.success, data: data });
  });

  // returns the subject list according to studyfield
  app.post("/Selection/SubjectData", (req, res) => {
    var list = subjectList.filter(
      (x) => x.relatedCourse === req.body.request || x.relatedCourse === "all"
    );
    res.json({ subjectList: list });
  });

  // returns the response of submitting unit list and handles the process
  app.post("/Selection/submit", (req, res) => {
    var failedlist = [];
    var successList = [];
    req.body.previewlist.forEach((element) => {
      let objectIndex = subjectList.findIndex((obj) => obj.id === element.id);
      if (subjectList[objectIndex].quota > 0) {
        successList.push(element);
      } else {
        failedlist.push(element);
      }
    });

    if (failedlist.length > 0) {
      data = {
        success: false,
        list: failedlist,
      };
    } else {
      let user = userlist.filter((x) => x.StudentID === req.body.userID);
      let objectIndex2 = subjectList.findIndex(
        (obj) => obj.StudentID === user.StudentID
      );
      req.body.previewlist.forEach((element) => {
        userlist[objectIndex2].SelectedCourses.push(element);
      });

      successList.forEach((element) => {
        let objectIndex = subjectList.findIndex((obj) => obj.id === element.id);
        if (subjectList[objectIndex].quota > 0) {
          subjectList[objectIndex].quota -= 1;
        }
      });
      data = { success: true };
    }
    res.json({ success: data.success, data: data });
    res.redirect("/");
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
