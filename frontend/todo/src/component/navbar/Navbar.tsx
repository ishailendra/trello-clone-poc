import React, { Fragment } from "react";

import styles from "./Navbar.module.css";

const Navbar: React.FC<{}> = () => {
  let sprites = ['male', 'female', 'human', 'identicon', 'initials', 'botts', 'avataaars', 'jdenticon', 'greedy', 'micah']
  let sprite = sprites[Math.floor(Math.random()*10)]
  
  return (
    <Fragment>
      <div id="navbar" className={styles.topbar}>
        <img src={`https://avatars.dicebear.com/api/${sprite}/something.svg`} alt="" height={60} width={60}/>
        <h2 className={styles.appname}>To Do</h2>
      </div>
    </Fragment>
  );
};

export default Navbar;
