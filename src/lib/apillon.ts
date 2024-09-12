import { FileMetadata, IBucketFilesRequest, Storage } from "@apillon/sdk";

const storage = new Storage();

export async function getBucketContent(
  uuid: string,
  params?: IBucketFilesRequest,
) {
  const bucket = storage.bucket(uuid);
  return bucket.listFiles(params);
}

export async function uploadToBucket(uuid: string, files: FileMetadata[]) {
  const bucket = storage.bucket(uuid);
  return bucket.uploadFiles(files);
}
