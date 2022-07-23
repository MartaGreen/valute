import React from "react";
import styles from "./loading.style";

import { REQUEST_STATUS } from "../../constants/request.constants";
import loadingIcon from "../../assets/loadig-icon.svg";

function Loading({ status }: { status: string }) {
  const classes = styles();

  return (
    <tr>
      <td colSpan={3} className={classes.loading}>
        {status === REQUEST_STATUS.pending && (
          <object data={loadingIcon} type="images/svg+xml">
            <img src={loadingIcon} alt="Loading ..." />
          </object>
        )}
      </td>
    </tr>
  );
}

export default Loading;
