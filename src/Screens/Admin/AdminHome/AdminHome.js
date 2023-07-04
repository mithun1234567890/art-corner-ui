import classes from "./AdminHome.module.css";
import newArtist from "../../../assets/images/newartist.png";
import newPaint from "../../../assets/images/newPaint.jpg";
import orderAndstatus from "../../../assets/images/orderAndstatus.jpg";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className={classes.cardContainer}>
      <Link className={classes.card} to="/admin/newArtist">
        <img src={newArtist} alt="New Artist" />
        <div className={classes.label}>New Artist</div>
      </Link>
      <Link className={classes.card} to="/admin/newPainting">
        <img src={newPaint} alt="New Paintings" />
        <div className={classes.label}>New Paintings</div>
      </Link>
      <Link className={classes.card} to="/admin/newPaintings">
        <img src={orderAndstatus} alt="Order and Status" />
        <div className={classes.label}>Order and Status</div>
      </Link>
      <div className={classes.card}>
        <span>3</span>
        <div className={classes.label}>Number of Artist</div>
      </div>
      <div className={classes.card}>
        <span>6</span>
        <div className={classes.label}>Number of User</div>
      </div>
    </div>
  );
};

export default AdminHome;
