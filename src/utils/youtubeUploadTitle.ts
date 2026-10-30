/** Suggest an editable YouTube title from the selected file, without its extension. */
export const youtubeUploadTitle = (fileName: string): string =>
  fileName.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' ').trim().slice(0, 100);
