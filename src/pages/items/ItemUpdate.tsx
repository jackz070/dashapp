import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useUpdateItemMutation } from "../../state/api";

type Props = { itemId: string; currentName: string };

const ItemUpdate = ({ itemId, currentName }: Props) => {
  const { palette } = useTheme();
  const [updateTrigger] = useUpdateItemMutation();
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState(currentName);
  const [nameError, setNameError] = useState("");

  const textFieldStyle = {
    color: "white",
    // height: "fit-content",
    margin: ".5rem",
    "& .MuiInputBase-input": {
      // padding: ".5rem .75rem",
      color: "white",
    },

    ":before": { borderBottomColor: palette.basic.white },
    ":after": { borderBottomColor: palette.grey[500] },
    "& .MuiInputLabel-formControl": {
      color: palette.basic.white,
    },
    "& .MuiInputLabel-formControl[data-shrink='true']": {
      color: palette.primary[400],
      top: "0",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: palette.basic.white,
    },
    "& .MuiOutlinedInput-input": {
      padding: ".75rem 1rem",
    },
    "& .MuiInputLabel-outlined": {
      top: "-.15rem",
    },
    "& .MuiInputBase-formControl:not(.Mui-focused):hover .MuiOutlinedInput-notchedOutline":
      {
        borderColor: palette.grey[500],
      },
    "& .MuiSelect-iconOutlined": { fill: palette.basic.white },
  };

  const handleItemUpdate = () => {
    if (name === currentName) {
      setNameError("New name same as old one");
      return;
    }
    if (name.length === 0) {
      setNameError("Name can't be empty");
      return;
    }

    updateTrigger({ _id: itemId, name: name });
    setShowDialog(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.currentTarget.value !== currentName &&
      e.currentTarget.value.length > 0
    ) {
      setNameError("");
    }
    if (e.currentTarget.value === currentName) {
      setNameError("New name same as old one");
    }
    if (e.currentTarget.value.length === 0) {
      setNameError("Name can't be empty");
    }
    setName(e.currentTarget.value);
  };

  const handleClose = () => {
    setName(currentName);
    setNameError("");
    setShowDialog(false);
  };

  return (
    <>
      <IconButton
        sx={{
          color: palette.basic.white,
          "&:hover": { color: palette.grey[300] },
        }}
        onClick={() => setShowDialog(true)}
      >
        <EditIcon />
      </IconButton>

      <Dialog
        open={showDialog}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: palette.background.light,
          },
        }}
      >
        <DialogTitle variant="h4" sx={{ padding: "1.5rem 2rem" }}>
          Rename item
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              // ".MuiInputBase-input": {
              //   padding: ".25rem .5rem",
              //   color: "white",
              //   borderColor: "white",
              // },
            }}
          >
            <TextField
              sx={textFieldStyle}
              autoFocus={true}
              id="input-name"
              value={name}
              onChange={handleNameChange}
              name="name"
              type="text"
              label="Name"
              error={nameError.length > 0}
              helperText={nameError.length > 0 ? nameError : ""}
              FormHelperTextProps={{
                sx: { position: "absolute", bottom: "-1rem" },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleItemUpdate}
            variant="outlined"
            sx={{ "& .MuiButtonBase .Mui-disabled": { color: "red" } }}
          >
            Rename
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ItemUpdate;
