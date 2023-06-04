import { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import FlareIcon from "@mui/icons-material/Flare";

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState("dashboard");

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color={palette.grey[800]}>
      <FlexBetween gap="0.75rem" sx={{}}>
        <FlareIcon sx={{ fontSize: "32px" }} />
        <Typography variant="h4" color={palette.grey[800]}>
          Dashapp
        </Typography>
      </FlexBetween>

      <FlexBetween gap="1.25rem">
        <Box sx={{ "&:hover": { color: palette.primary[600] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              color: selected === "dashboard" ? palette.grey[900] : "inherit",
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[600] } }}>
          <Link
            to="/items"
            onClick={() => setSelected("items")}
            style={{
              color: selected === "items" ? palette.grey[900] : "inherit",
              textDecoration: "inherit",
            }}
          >
            items
          </Link>
        </Box>
        <Box sx={{ "&:hover": { color: palette.primary[600] } }}>
          <Link
            to="/settings"
            onClick={() => setSelected("predictions")}
            style={{
              color: selected === "predictions" ? palette.grey[900] : "inherit",
              textDecoration: "inherit",
            }}
          >
            settings
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;
