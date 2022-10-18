import * as AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "wet-uploads",
      Key: objectName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};

export const deleteFromS3 = async (fileUrls, folderName) => {
  if (Array.isArray(fileUrls)) {
    fileUrls.forEach(async (fileUrl) => {
      const decodedUrl = decodeURI(fileUrl);
      const filePath = decodedUrl.split(`/${folderName}/`)[1];
      const fileName = `${folderName}/${filePath}`;

      await new AWS.S3()
        .deleteObject({
          Bucket: "wet-uploads",
          Key: fileName,
        })
        .promise();
    });
  } else {
    const decodedUrl = decodeURI(fileUrls);
    const filePath = decodedUrl.split(`/${folderName}/`)[1];
    const fileName = `${folderName}/${filePath}`;

    await new AWS.S3()
      .deleteObject({
        Bucket: "wet-uploads",
        Key: fileName,
      })
      .promise();
  }
};
