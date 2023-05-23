import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SettingsPageSectionHeader from "../components/SettingsPageSectionHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsPageAccountField from "../components/SettingsPageAccountField";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Plans from "./settingsPage/Plans";
import FlexBetween from "../components/FlexBetween";
import { motion } from "framer-motion";
import { settingsVariants } from "../MotionVariants";

const Settings = () => {
  const { palette } = useTheme();
  const MotionContainer = motion(Container, { forwardMotionProps: true });

  return (
    <MotionContainer
      maxWidth="md"
      variants={settingsVariants}
      initial="initial"
      animate="final"
      exit="exit"
    >
      <Stack>
        <Box>
          <SettingsPageSectionHeader title="Store settings" />
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <SettingsPageAccountField
              label="Store Name"
              value="Cheesy Cheese Store"
            />
            <SettingsPageAccountField
              label="Domain"
              value="cheesycheese.cheese"
              editable={false}
            />
            <SettingsPageAccountField
              label="Visibility"
              value="Visibile"
              editable={false}
            />
          </Box>
          <Box minWidth="120px" height="50px" sx={{ marginBottom: "0.75rem" }}>
            <Typography variant="h6">Current Plan</Typography>
            <Typography
              fontSize="1rem"
              sx={{
                fontWeight: "700",
              }}
            >
              Basic
            </Typography>
          </Box>
        </Box>
        <Plans />
        <Box>
          <SettingsPageSectionHeader title="Account settings" />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <SettingsPageAccountField label="First Name" value="Joe" />
            <SettingsPageAccountField label="Last name" value="Cheese" />
            <SettingsPageAccountField
              label="Email Adress"
              value="cheesy.joe72@mail.co"
            />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment method
            </Typography>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box
                  width="100%"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "black",
                    }}
                  >
                    <CreditCardIcon sx={{ marginRight: ".25rem" }} />
                    Visa **** **** **** 4324
                  </Typography>
                  <Typography variant="h5">Click to add new method</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardName"
                      label="Name on card"
                      fullWidth
                      autoComplete="cc-name"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cardNumber"
                      label="Card number"
                      fullWidth
                      autoComplete="cc-number"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="expDate"
                      label="Expiry date"
                      fullWidth
                      autoComplete="cc-exp"
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      id="cvv"
                      label="CVV"
                      helperText="Last three digits on signature strip"
                      fullWidth
                      autoComplete="cc-csc"
                      variant="standard"
                    />
                  </Grid>
                </Grid>
                <Button
                  variant="filled_primary"
                  sx={{
                    width: "14rem",
                    margin: "0 auto",
                    marginTop: "1rem",
                  }}
                  name="saveCard"
                  value="yes"
                >
                  Save payment method
                </Button>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Stack marginTop="1.5rem" gap="1rem" width="100%">
            <Button
              variant="filled_primary"
              color="primary"
              sx={{ width: "14rem", margin: "0 auto" }}
            >
              Send password reset link
            </Button>
            <Button
              variant="outlined_primary"
              color="error"
              sx={{ width: "14rem", margin: "0 auto" }}
            >
              Delete your account
            </Button>
          </Stack>
        </Box>
        <Box sx={{ marginBottom: "2rem" }}>
          <SettingsPageSectionHeader title="Support" />
          <Typography>
            If you need help visit
            <Link
              variant="link"
              color="inherit"
              sx={{
                cursor: "pointer",
                marginLeft: ".25rem",
                "&:hover": { color: palette.grey[700] },
              }}
            >
              our help center
            </Link>
            .
          </Typography>
        </Box>
      </Stack>
      <FlexBetween padding="3rem 0">
        <Typography flex="1">©2023 Dashapp</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: ".5rem",
            justifyContent: "flex-end",
            flex: ".75",
          }}
        >
          <Box>
            <Link
              variant="link"
              color="inherit"
              sx={{
                cursor: "pointer",
                "&:hover": { color: palette.grey[700] },
              }}
            >
              Privacy Policy
            </Link>
          </Box>
          <Box>
            <Link
              variant="link"
              color="inherit"
              sx={{
                cursor: "pointer",
                "&:hover": { color: palette.grey[700] },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </FlexBetween>
    </MotionContainer>
  );
};

export default Settings;
