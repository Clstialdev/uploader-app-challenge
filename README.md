# React + TypeScript:  Text + Image Uploader

## Overview

Build an interface where users can:
- Type a text.
- Attach one or more images via drag-drop **or** by clicking the paperclip icon (images only).
- Preview and remove attachments before sending.
- Send the message to a scrollable “Sent Items” list.
- Select sent items (via checkboxes) for bulk deletion or export.

The top bar (text input + image input + Send button) must always be visible to the user.

Use Material-UI, React, and TypeScript.
You can add any validation, improvement, error handling, UI change, etc that improves the final product.

## Functional Requirements

1. **Text + Drag-Drop**  
   - TextField accepts text.
   - Dragging images over the text area shows a warning to the user somehow: "Drop to upload the image"
   - Files dropped elsewhere in the app do nothing.

2. **Attachment Button**  
   - A button opens the file picker (accepts only images).
   - Selected images appear as thumbnails somewhere in the bar.
   - Each thumbnail has a small “remove” icon before sending it.

3. **Send**  
   - Clicking Send (disabled if no text & no attachments) adds a new message to the list.
   - After send, text and attachments clear.

4. **Sent Items**  
   - Each item shows text and image thumbnails. This thumbnails are not deletable.
   - Items are selectable.
   - Per-item actions: Delete (removes item), Export (downloads a JSON blob with `{ text: string|null, files: string[] }`).
   - Bulk actions appear above list when ≥1 item selected: Delete Selected, Export Selected.

5. **Layout & Styling**  
   - Use MUI components.
   - There's a theme implemented. Try to maximize the use of it.
   - Choose responsive behavior when possible to do.

## Technical Specs

- **Framework:** React 18+, TypeScript  
- **Styling & UI:** @mui/material, @mui/icons-material  
- **State Management:** React hooks only  
- **File Handling:** `URL.createObjectURL` / `.revokeObjectURL`  