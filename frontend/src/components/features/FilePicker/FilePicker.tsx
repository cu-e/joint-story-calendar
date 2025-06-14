import styles from "./FilePicker.module.css";
import camera from "./../../../assets/camera.svg";

interface FilePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FilePicker: React.FC<FilePickerProps> = ({ handleChange, ...rest }) => (
  <div>
    <label
      htmlFor="create-event-file-picker"
      className={styles["create-event-widget__picker-label"]}
    >
      <div
        style={{
          background: `url(${camera})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "48px",
          height: "48px",
        }}
      />
      <p>Прикрепить видео или фото</p>
    </label>
    <input
      id="create-event-file-picker"
      type="file"
      onChange={handleChange}
      className={styles["create-event-widget__picker"]}
      {...rest}
    />
  </div>
);

export default FilePicker;
