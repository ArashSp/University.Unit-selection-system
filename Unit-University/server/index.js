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

  var uploadProgress = 0;

  app.use(express.json({ limit: "50mb" }));

  app.post("/minIO/uploadPhoto", (req, res) => {
    // and access keys as shown below.
    var minioClient = new Minio.Client({
      endPoint: "minio-dev.darkube.app",
      accessKey: "Driver-info@DPE.ir",
      secretKey: "DI2023@DPE.ir",
      useSSL: true,
    });
    console.log(req, "this is the req");
    // do the stuff here

    const base64String = req.body.file.replace(/^data:image\/\w+;base64,/, "");
    const buff = new Buffer(base64String, "base64");

    minioClient.putObject(
      "driver-registration-information",
      `${req.body.foldername}/${req.body.name}.jpg`,
      buff,
      function (err) {
        if (err) {
          return console.log(err);
        } else {
          uploadProgress += req.body.progressAmount;
          console.log(uploadProgress);
          res.json({ uploadProg: uploadProgress });
        }
      }
    );
  });

  app.listen(port);
  console.log(`Server running at http://localhost:${port}`);
}