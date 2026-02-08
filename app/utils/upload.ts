export async function uploadFileToBunnyCDN(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string = "application/octet-stream"
): Promise<string> {
  const STORAGE_ZONE_NAME = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE || "";
  const ACCESS_KEY = process.env.NEXT_PUBLIC_BUNNY_API_KEY || "";
  const BASE_HOSTNAME =
    process.env.NEXT_PUBLIC_BUNNY_BASE_HOSTNAME || "storage.bunnycdn.com";

  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}-${fileName}`;
  const endpoint = `https://${BASE_HOSTNAME}/${STORAGE_ZONE_NAME}/${uniqueFileName}`;

  console.log(
    "Uploading:::",
    `https://${BASE_HOSTNAME}/${STORAGE_ZONE_NAME}/${uniqueFileName}`
  );

  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: {
        AccessKey: ACCESS_KEY,
        "Content-Type": contentType,
        "Content-Length": fileBuffer.length.toString(),
      },
      body: fileBuffer,
    });

    //  console.log("Res::", response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Upload failed with status ${response.status}: ${errorText}`
      );
    }

    const cdnHostname =
      process.env.NEXT_PUBLIC_BUNNY_CDN_HOST ||
      `https://${STORAGE_ZONE_NAME}.b-cdn.net`;
    return `${cdnHostname}/${uniqueFileName}`;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

export async function deleteFileFromBunnyCDN(
  filePath: string
): Promise<boolean> {
  const STORAGE_ZONE_NAME = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE || "";
  const ACCESS_KEY = process.env.NEXT_PUBLIC_BUNNY_API_KEY || "";
  const BASE_HOSTNAME =
    process.env.NEXT_PUBLIC_BUNNY_BASE_HOSTNAME || "storage.bunnycdn.com";

  const endpoint = `https://${BASE_HOSTNAME}/${STORAGE_ZONE_NAME}/${filePath}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      AccessKey: ACCESS_KEY,
    },
  });

  return response.ok;
}
