export interface IAttachment {
  id: string;
  file: File;
  previewUrl?: string;
}

export interface ISentItem {
  id: string;
  text: string | null;
  attachments: IAttachment[];
  selected: boolean;
}
