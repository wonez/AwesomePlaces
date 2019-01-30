const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require("cors")({ origin: true });
const fs = require("fs");
const UUID = require("uuid-v4");
const storage = require('@google-cloud/storage');

const gcs = storage({
  projectId: 'awesome-places-3359b',
  keyFilename: './awesome-places-key.json'
});

admin.initializeApp({
  credential: admin.credential.cert(require('./awesome-places-key.json'))
});

exports.saveImage = functions.https.onRequest((request, response) => {
  return cors(request, response, () => {
    if (!request.headers.authorization ||
      !request.headers.authorization.startsWith('Bearer ')) {
      res.status(403).json({ error: 'Unathorized' })
      return
    }
    let token = request.header.authorization.split('Bearer ')[1];
    admin.auth().verifyIdToken(token)
      .then(decodeToken => {

        const body = JSON.parse(request.body);
        fs.writeFileSync('/tmp/uploaded-image.jpg', body.image, "base64", err => {
          console.log(err);
          return response.status(500).json({ error: err })
        })
        const bucket = gcs.bucket('awesome-places-3359b.appspot.com');
        const uuid = UUID();

        return bucket.upload(
          "/tmp/uploaded-image.jpg",
          {
            uploadType: "media",
            destination: "/places/" + uuid + ".jpg",
            metadata: {
              metadata: {
                contentType: "image/jpeg",
                firebaseStorageDownloadTokens: uuid
              }
            }
          },
          (err, file) => {
            if (!err) {
              return response.status(201).json({
                imageUrl:
                  "https://firebasestorage.googleapis.com/v0/b/" +
                  bucket.name +
                  "/o/" +
                  encodeURIComponent(file.name) +
                  "?alt=media&token=" +
                  uuid
              });
            } else {
              console.log(err);
              return response.status(500).json({ error: err });
            }
          }
        )
      })
  })
});
