import { Box, useMediaQuery } from "@mui/material";
import Row1 from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { AnimatePresence, motion } from "framer-motion";
import { dashboardVariants } from "../../MotionVariants";
import { useEffect, useState } from "react";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "../../state/api";
import { useGridEditing } from "@mui/x-data-grid/internals";
import FullPageLoading from "../../components/FullPageLoading";
import DashboardTransitionWrapper from "./DashboardTransitionWrapper";

const gridTemplateLargeScreen = `
"a b c"
"a b c"
"a b c"
"a b f"
"d e f"
"d e f"
"d h i"
"g h i"
"g h j"
"g h j"
`;

const gridTemplateSmallScreens = `
  "a"
  "a"
  "a"
  "a"
  "b"
  "b"
  "b"
  "b"
  "c"
  "c"
  "c"
  "d"
  "d"
  "d"
  "e"
  "e"
  "f"
  "f"
  "f"
  "g"
  "g"
  "g"
  "h"
  "h"
  "h"
  "h"
  "i"
  "i"
  "j"
  "j"
`;

const Dashboard = () => {
  const isAboveMediumScreenWidth = useMediaQuery("(min-width: 1200px)");
  const MotionBox = motion(Box, { forwardMotionProps: true });
  // Fetching state, pass setter to children, default true, when fetched set as false - if no falses, render page
  const [dashboardDataFetched, setDashboardDataFetched] = useState(true);
  const initialDataLoadKpi = useGetKpisQuery();
  const initialDataLoadTransactions = useGetTransactionsQuery();
  const initialDataLoadProducts = useGetProductsQuery();
  console.log(initialDataLoadKpi.isFetching);
  useEffect(() => {
    if (
      dashboardDataFetched &&
      initialDataLoadKpi.isFetching &&
      initialDataLoadTransactions.isFetching &&
      initialDataLoadProducts.isFetching
    ) {
      setDashboardDataFetched(false);
      setTimeout(() => {
        setDashboardDataFetched(true);
      }, 1700);
    }
  }, [
    dashboardDataFetched,
    initialDataLoadKpi,
    initialDataLoadTransactions,
    initialDataLoadProducts,
  ]);

  if (!dashboardDataFetched) {
    return <FullPageLoading text="preparing your data" />;
  }
  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreenWidth
          ? {
              gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
              gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
              gridTemplateAreas: gridTemplateLargeScreen,
            }
          : {
              gridTemplateAreas: gridTemplateSmallScreens,
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
            }
      }
    >
      <Row1 />
      <Row2 />
      <Row3 />
    </Box>
  );
};

export default Dashboard;
