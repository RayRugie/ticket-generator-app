import styles from "./NavHeader.module.scss";

const NavHeader = () => {
  return (
    <nav className={styles["nav-header"]}>
      <div className={styles["nav-logo"]}>
        <img src="/logo.svg" alt="ticz logo" aria-labelledby="application logo" />
      </div>

      <ul className={styles["nav-menu"]}>
        <li>Events</li>
        <li>My Tickets</li>
        <li>About Project</li>
      </ul>

      <div className={styles["nav-button"]}>
        <button>MY TICKETS</button>
        <img src="/arrow-right.svg" alt="right arrow" />
      </div>
    </nav>
  );
};

export default NavHeader;
