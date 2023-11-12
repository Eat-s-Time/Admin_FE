import { useLocation, useHistory } from 'react-router-dom';
import styles from "./AdminMenubar.module.scss";

function AdminMenubar() {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className={styles.menubar}>
      <div className={styles.baritemlayout}>
        <h1 
          className={location.pathname === "/admin/menu" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push("/admin/menu")}
        >
          메뉴 수정
        </h1>
        <h1 
          className={location.pathname === "/admin/waitinglist" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push("/admin/waitinglist")}
        >
       웨이팅 리스트
        </h1>
        <h1 
          className={location.pathname === "/admin/store" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push("/admin/store")}
        >
          가게 정보 수정
        </h1>
        <h1 
          className={location.pathname === "/admin/history" ? `${styles.baritem} ${styles.active}` : styles.baritem} 
          onClick={() => history.push("/admin/history")}
        >
          웨이팅 내역
          </h1>
      </div>
    </div>
  );
}

export default AdminMenubar;
