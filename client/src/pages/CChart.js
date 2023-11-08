import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";

import DialogContent from "@mui/material/DialogContent";

import DialogContentText from "@mui/material/DialogContentText";

import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

const CChart = () => {
  const [openDialog, setOpenDialog] = useState(true);

  const navigate = useNavigate();

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleAgree = () => {
    setOpenDialog(false);

    navigate("../output"); // Redirect to the Output page or whatever you'd like to do next
  };

  return (
    <div>
      <h1>This is the Charts Page</h1>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you want to create Charts?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Confirming will redirect you to the page displaying the Charts
            based on the uploaded data.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>

          <Button onClick={handleAgree} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CChart;
