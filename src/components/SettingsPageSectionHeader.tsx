import { Divider, Typography } from "@mui/material";

type Props = { title: string };

const SettingsPageSectionHeader = ({ title }: Props) => {
  return (
    <Divider
      textAlign="left"
      sx={{
        "&::before, &::after": {
          borderColor: "black",
        },
        margin: "3rem 0 1rem 0",
      }}
    >
      <Typography variant="h4" color="black">
        {title}
      </Typography>
    </Divider>
  );
};

export default SettingsPageSectionHeader;
