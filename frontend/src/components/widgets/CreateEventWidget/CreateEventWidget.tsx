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
import FilePreviewer from "../../features/FilePreviewer/FilePreviewer";
import { Controller, useForm } from "react-hook-form";

interface CreateEventWidgetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function CreateEventWidget({ open, setOpen }: CreateEventWidgetProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [_music, setMusic] = useState<File>(null);
  const [onAutoMusic, setOnAutoMusic] = useState(false);
  const { control, handleSubmit } = useForm({
    defaultValues: { date: new Date().toLocaleTimeString("ru-RU"), files: [] },
  });

  const onSubmit = (data) => console.log(data);

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles["create-event-widget"]}
          >
            <h2>Создать историю</h2>
            <div className={styles["create-event-widget__form"]}>
              {/* Дата события */}
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    width={"100%"}
                    value={field.value}
                    onValueChange={field.onChange}
                    enableTodayLink
                  />
                )}
              />
              <div className={styles["create-event-widget__grid"]}>
                {files.length > 0 && (
                  <>
                    {files.map((file, index) => (
                      <FilePreviewer
                        key={index}
                        file={file}
                        onRemove={() => {
                          setFiles((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Выбор фото и видео */}
                <Controller
                  name="files"
                  control={control}
                  render={({ field }) => (
                    <FilePicker
                      handleChange={(e) => {
                        const picked = e.target.files
                          ? Array.from(e.target.files)
                          : [];
                        setFiles((prev) => [...prev, ...picked]);
                        field.onChange(files);
                      }}
                      accept="image/*,video/*"
                      multiple
                    />
                  )}
                />
              </div>
              <p>Выбор музыки</p>

              {/* Выбор музыки? */}

              <FileUploader
                width={"100%"}
                placeholder="Прикрепить музыку"
                multiple
                onChange={selectMusic}
                className={styles["create-event-widget__picker"]}
              />
              <Toggle checked={onAutoMusic} onValueChange={setOnAutoMusic}>
                Автоматически выбрать музыку
              </Toggle>

              {/* Описание события */}

              <Textarea
                width={"100%"}
                autoResize
                placeholder="Опиши что интересного произошло"
              />
            </div>
            <Button
              type="submit"
              width={"100%"}
              size="large"
              use="primary"
              onClick={() => setOpen(false)}
            >
              <p>Добавить историю</p>
            </Button>
          </form>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}

export default CreateEventWidget;
