const express = require("express");
const compression = require("compression");
const fs = require("fs");
const { renderPage } = require("vite-plugin-ssr/server");

const isProduction = process.env.NODE_ENV === "production";
const root = `${__dirname}/..`;

// imports our data from jsons
var subjectList = require("./subjectList.json");
var userlist = require("./users.json");
var userID = "";

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
      userID = req.body.username;
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
          alreadySelected: element.alreadySelected,
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
    // filter based on study field
    var list = subjectList.filter(
      (x) =>
        x.relatedCourse === req.body.request.StudyField ||
        x.relatedCourse === "all"
    );
    // filter based on passed subjects
    list.filter((x) => req.body.request.passedSubjects.includes(!x.id));
    // filter based on  passed Required units
    if (req.body.request.currentSemester < 4) {
      list.filter((x) =>
        req.body.request.passedSubjects.includes(x.passedUnitRequired)
      );
    }

    res.json({ subjectList: list });
  });

  // returns the response of submitting unit list and handles the process
  app.post("/Selection/submit", (req, res) => {
    var failedlist = [];
    var successList = [];
    req.body.previewlist.forEach((element) => {
      let objectIndex = subjectList.findIndex((obj) => obj.id === element.id);
      // checks if the subject quota > 0
      if (subjectList[objectIndex].quota > 0) {
        successList.push(element);
      } else {
        failedlist.push(element);
      }
    });
    // if 1 or more subject quota was 0
    if (failedlist.length > 0) {
      data = {
        success: false,
        list: failedlist,
      };
    }
    // if not
    else {
      let objectIndex2 = userlist.findIndex(
        (obj) => obj.phoneNumber === userID
      );
      // Handles Quota if selectedCourses > 0
      if (userlist[objectIndex2].SelectedCourses.length > 0) {
        // Adds 1 quota to all subjects that are in selectedCourses
        userlist[objectIndex2].SelectedCourses.forEach((element) => {
          let objectIndex3 = subjectList.findIndex(
            (obj) => obj.id === element.id
          );
          subjectList[objectIndex3].quota += 1;
        });

        // Deletes All selectedCourses
        userlist[objectIndex2].SelectedCourses = [];

        // Adds Courses to user Data
        req.body.previewlist.forEach((element) => {
          userlist[objectIndex2].SelectedCourses.push(element);
        });
      } else {
        // Adds Courses to user Data
        req.body.previewlist.forEach((element) => {
          userlist[objectIndex2].SelectedCourses.push(element);
        });
      }

      console.log(userlist[objectIndex2]);
      // Handles Quota if selectedCourses =  0
      successList.forEach((element) => {
        let objectIndex = subjectList.findIndex((obj) => obj.id === element.id);
        if (subjectList[objectIndex].quota > 0) {
          subjectList[objectIndex].quota -= 1;
        }
      });

      userlist[objectIndex2].alreadySelected = true;

      // Response
      data = { success: true };
    }

    res.json({ success: data.success, data: data });
    res.redirect("/");
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}
