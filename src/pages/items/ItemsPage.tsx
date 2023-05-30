import { useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { Container } from "@mui/material";
import { itemsVariants } from "../../MotionVariants";
import ItemCreate from "./ItemCreate";
import "react-toastify/dist/ReactToastify.css";
import ItemsTable from "./ItemsTable";

const ItemsPage = () => {
  const { palette } = useTheme();

  const MotionContainer = motion(Container, { forwardMotionProps: true });

  return (
    <MotionContainer
      maxWidth="md"
      variants={itemsVariants}
      initial="initial"
      animate="final"
      exit="exit"
      sx={{
        backgroundColor: palette.background.light,
        borderRadius: "1rem",
        boxShadow: "0.15rem 0.2rem 0.3rem 0.1rem rgba(0, 0, 0, .15)",
        maxWidth: "1200px",
        padding: "1rem",
      }}
    >
      <ItemCreate />
      <ItemsTable />
    </MotionContainer>
  );
};

export default ItemsPage;
