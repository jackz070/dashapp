import React, { useState } from "react";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

type Props = { label: string; value: string; editable?: boolean };

const SettingsPageAccountField = ({ label, value, editable = true }: Props) => {
  const { palette } = useTheme();
  const [editableValue, setEditableValue] = useState(value);
  const [isEdited, setIsEdited] = useState(false);

  return (
    <Box minWidth="120px" height="50px" sx={{ marginBottom: "0.75rem" }}>
      <Typography variant="h6">{label}</Typography>
      {isEdited ? (
        <FormControl
          sx={{
            width: "100px",
            padding: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          onSubmit={() => setIsEdited(false)}
          component="form"
        >
          <Input
            value={editableValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditableValue(event.target.value);
            }}
            sx={{
              padding: "0",
              border: "none",
              "& 	.MuiInput-underline": { color: "red" },
            }}
          />
          <SaveIcon
            sx={{ display: "inline", fill: palette.grey[500] }}
            fontSize="small"
          />
        </FormControl>
      ) : (
        <Typography
          fontSize="1rem"
          sx={{
            fontWeight: "700",
            cursor: editable ? "pointer" : null,
            "&:hover>*": { visibility: "visible" },
          }}
          onClick={() => setIsEdited(true)}
        >
          {editableValue}
          {editable && (
            <Tooltip title="Click to edit">
              <IconButton
                sx={{
                  display: "inline",
                  color: palette.grey[300],
                  padding: "0",
                  background: "none",
                  height: "16px",
                  width: "16px",
                  marginBottom: "8px",
                  marginLeft: "1rem",
                  "&:hover": { background: "none" },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Typography>
      )}
    </Box>
  );
};

export default SettingsPageAccountField;
