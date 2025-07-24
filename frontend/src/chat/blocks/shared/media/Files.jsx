import styles from "./Files.module.css";
import download from "../../../assets/images/message-form/download.png";

export default function Files({ files }) {

    const serverUrl = process.env.REACT_APP_API_URL;

    const handleDownload = async (file) => {
        if (!file.src) return console.warn("Нет src у файла:", file);

        try {
            const response = await fetch(serverUrl + file.src, {
                method: 'GET',
            });

            if (!response.ok) throw new Error("Ошибка загрузки файла");

            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = file.name || 'download'; 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Ошибка загрузки файла:", err);
        }
    };



    return (<div className={`${styles.filesBlock}`}>
        {files.map(f => (
            <div key={f.id} className={styles.fileBlock}>
                <div>
                    {f.name}<br />
                    <span>{Math.round(f.size / 1000)} KB</span>
                </div>
                <button type="button" className={styles.btn} onClick={() => handleDownload(f)}>
                    <img src={download} alt="download" />
                </button>
            </div>
        ))}
    </div>);
}