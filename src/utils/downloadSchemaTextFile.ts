// Sanitize the project name to remove invalid characters and extensions
const sanitizeProjectName = (name: string) => {
  // Remove invalid characters from the file name
  const sanitized = name.replace(/[\/\\?%*:|"<>]/g, "");

  // Remove any existing file extension (e.g., .jpg, .pdf, etc.)
  const nameWithoutExtension = sanitized.replace(/\.[^/.]+$/, "");

  return nameWithoutExtension;
};

// Ensure the file name ends with .txt only once
const getValidFileName = (name: string) => {
  const sanitizedProjectName = sanitizeProjectName(name);
  return sanitizedProjectName; // Return the name of the file
};

export const handleExport = (projectName: string, schema: string) => {
  const blob = new Blob([schema], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;

  const validFileName = getValidFileName(projectName);
  link.download = validFileName !== "" ? `${validFileName}.txt` : "schema.txt";

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
