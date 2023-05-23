import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const tiers = [
  {
    title: "Basic",
    price: "0",
    description: [
      "1 store",
      "Up to 200 products",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Current",
    buttonVariant: "outlined",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    price: "15",
    description: [
      "3 stores",
      "Up to 1500 products",
      "10 GB of storage",
      "Unlimited admin accounts",
      "Advertising consulting",
      "Dedicated support",
    ],
    buttonText: "Upgrade to pro",
    buttonVariant: "filled_primary",
  },
  {
    title: "Enterprise",
    price: "???",
    description: [
      "As many stores as you need",
      "Unlimited products",
      "Unlimited storage",
      "24/7 dedicated support",
      "Impact on new features",
    ],
    buttonText: "Contact us",
    buttonVariant: "outlined_primary",
  },
];

export default function Plans() {
  const { palette } = useTheme();
  return (
    <>
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 2, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Upgrade now!
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Make your store even better. Use the whole power of Dashapp. Watch
          your sales skyrocket, especially with our custom advertising
          consulting.
        </Typography>
      </Container>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={
                    tier.title === "Pro" ? (
                      <StarIcon sx={{ fill: "white" }} />
                    ) : null
                  }
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? palette.grey[900]
                        : theme.palette.grey[700],
                    "& .MuiCardHeader-title": {
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "700",
                    },
                    "& .MuiCardHeader-subheader": {
                      color: "white",
                      fontSize: ".7rem",
                    },
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="h2"
                      variant="h3"
                      color="text.primary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      sx={{ marginLeft: ".1rem" }}
                    >
                      /mo
                    </Typography>
                  </Box>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "0",
                    }}
                  >
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                        sx={{ marginBottom: ".1rem" }}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    disabled={tier.title === "Basic" ? true : false}
                    fullWidth
                    variant={
                      tier.buttonVariant as "outlined" | "filled_primary"
                    }
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
