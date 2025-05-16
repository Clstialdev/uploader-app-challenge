export interface IAttachment {
  id: string;
  file: File;
  previewUrl?: string;
}

export interface ISentItem {
  id: number;
  text: string | null;
  attachments: IAttachment[];
  selected: boolean;
}
