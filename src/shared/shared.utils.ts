import * as AWS from "aws-sdk";
import { File } from "../types";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (
  file: Promise<File>,
  userId: number,
  folderName: string
) => {
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

export const deleteFromS3 = async (
  fileUrls: string[] | string,
  folderName: string
) => {
  if (Array.isArray(fileUrls)) {
    fileUrls.forEach(async (fileUrl: string) => {
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
