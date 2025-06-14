import {
  Button,
  DatePicker,
  FileUploader,
  Textarea,
  Toggle,
} from "@skbkontur/react-ui";
import { useState, type ChangeEvent } from "react";
import { Sheet } from "react-modal-sheet";
import styles from "./CreateEventWidget.module.css";
import FilePicker from "../../features/FilePicker/FilePicker";
import { TrashIcon } from "@heroicons/react/24/solid";
interface CreateEventWidgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateEventWidget({ open, setOpen }: CreateEventWidgetProps) {
  const [value, setValue] = useState<string>(
    new Date().toLocaleDateString("ru-RU")
  );
  const [files, setFiles] = useState<File[]>([]);
  const [_music, setMusic] = useState<File>(null);
  const [onAutoMusic, setOnAutoMusic] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files ? Array.from(e.target.files) : [];
    setFiles((prev) => [...prev, ...picked]);
  }
  function selectMusic(e: ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files ? e.target.files[0] : null;
    setMusic(picked);
  }
  return (
    <Sheet
      isOpen={open}
      onClose={() => setOpen(false)}
      modalEffectRootId="modal-root"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className={styles["create-event-widget"]}>
            <h2>Создать историю</h2>
            <div className={styles["create-event-widget__form"]}>
              <DatePicker
                width={"100%"}
                value={value}
                onValueChange={setValue}
                enableTodayLink
              />
              <div className={styles["create-event-widget__grid"]}>
                {files.length > 0 && (
                  <>
                    {files.map((file, index) => (
                      <div key={index} style={{ position: "relative" }}>
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
                          onClick={() =>
                            setFiles((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        ></Button>
                      </div>
                    ))}
                  </>
                )}
                <FilePicker
                  handleChange={handleChange}
                  accept="image/*,video/*"
                  multiple
                />
              </div>
              <p>Выбор музыки</p>
              <FileUploader
                width={"100%"}
                placeholder="Прикрепить музыку"
                multiple
                onChange={selectMusic}
                className={styles["create-event-widget__picker"]}
              />
              <Toggle checked={onAutoMusic} onValueChange={setOnAutoMusic}>
                Автоматически выбрать музыку
              </Toggle>{" "}
              <Textarea
                width={"100%"}
                autoResize
                placeholder="Опиши что интересного произошло"
              />
            </div>
            <Button
              width={"100%"}
              size="large"
              use="primary"
              onClick={() => setOpen(false)}
            >
              <p>Добавить историю</p>
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

export default CreateEventWidget;
