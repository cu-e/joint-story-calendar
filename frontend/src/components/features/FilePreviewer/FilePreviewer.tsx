import { TrashIcon } from "@heroicons/react/24/solid";
import { Button } from "@skbkontur/react-ui";
import styles from "./FilePreviewer.module.css";

interface FilePreviewerProps {
  file: File;
  onRemove: () => void;
}

export default function FilePreviewer({ file, onRemove }: FilePreviewerProps) {
  return (
    <div style={{ position: "relative" }}>
      <div
        className={styles["create-event-widget__file"]}
        style={{
          background: `url(${URL.createObjectURL(
            file
          )}) center center / cover no-repeat`,
        }}
      />
      <Button
        className={styles["create-event-widget__file-delete"]}
        icon={<TrashIcon width={24} height={24} />}
        size="medium"
        onClick={onRemove}
      />
    </div>
  );
}
