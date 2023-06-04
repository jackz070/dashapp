import React, { FormEvent, useEffect, useState } from "react";
import { useAddItemMutation } from "../../state/api";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { GetItemsResponse } from "../../state/types";
import { useNotification } from "../../hooks/useNotification";

const ItemCreate = () => {
  const { palette } = useTheme();
  const [createTrigger, createMutationState] = useAddItemMutation();
  const [addingNewItem, setAddingNewItem] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [category, setCategory] = useState<"soft" | "medium" | "hard" | "">("");
  const [categoryError, setCategoryError] = useState("");
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [stock, setStock] = useState("");
  const [stockError, setStockError] = useState("");

  const textFieldStyle = {
    color: "white",
    // height: "fit-content",
    margin: ".5rem",
    "& .MuiInputBase-input": {
      // padding: ".5rem .75rem",
      color: "white",
    },
    "& .MuiInputBase-root": { minWidth: "200px" },

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

  // Form & state utilities

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setPrice(value);
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    setStock(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCategory(e.target.value as "" | "soft" | "medium" | "hard");
  };

  const validate = () => {
    if (name.length === 0) {
      setNameError("required");
    }
    if (category.length === 0) {
      setCategoryError("required");
    }
    if (!price) {
      setPriceError("required");
    }
    if (parseFloat(price) <= 0) {
      setPriceError("must be bigger than zero");
    }
    if (!stock) {
      setStockError("required");
    }
    if (parseInt(stock) === 0) {
      setStockError("must be positive integer");
    }
  };

  const clearInput = () => {
    setName("");
    setPrice("");
    setStock("");
    setCategory("");
  };

  const clearErrors = () => {
    setCategoryError("");
    setNameError("");
    setPriceError("");
    setStockError("");
  };

  const handleClose = () => {
    clearInput();
    clearErrors();
    setAddingNewItem(false);
  };

  useEffect(() => {
    if (category.length > 0) {
      setCategoryError("");
    }
    if (name.length > 0) {
      setNameError("");
    }
    if (parseFloat(price) > 0) {
      setPriceError("");
    }
    if (parseInt(stock) > 0) {
      setStockError("");
    }
  }, [name, category, price, stock]);

  // Notifications

  const { initialNotification } = useNotification(
    createMutationState.isSuccess,
    createMutationState.isError,
    createMutationState.status,
    createMutationState.error,
    createMutationState.endpointName
  );

  useEffect(() => {
    if (createMutationState.isSuccess) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createMutationState]);

  // Create item

  const handleItemCreate = (e: FormEvent) => {
    e.preventDefault();
    if (
      nameError ||
      categoryError ||
      priceError ||
      stockError ||
      !name ||
      !price ||
      !category ||
      !stock
    ) {
      return;
    }
    initialNotification();
    const newItemData: Partial<GetItemsResponse> = {
      name: name,
      price: parseFloat(price) * 100,
      category: category,
      stock: parseInt(stock),
    };
    try {
      createTrigger(newItemData)
        .unwrap()
        .catch((rejected) => console.error(rejected));
    } catch (err) {
      let message = "Unkown error";
      if (err instanceof Error) {
        message = err.message;
      }
      console.error(message);
    }
  };

  return (
    <Box>
      <Button
        color="reverse"
        variant="filled_primary"
        onClick={(e) => {
          e.preventDefault();
          setAddingNewItem(!addingNewItem);
        }}
      >
        Add new item
      </Button>
      {addingNewItem && (
        <Dialog
          open={addingNewItem}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: palette.background.light,
            },
          }}
        >
          <DialogTitle variant="h3" sx={{ padding: "1.75rem 2rem" }}>
            Add new item
          </DialogTitle>
          <DialogContent sx={{ maxWidth: "31rem" }}>
            <Box
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <TextField
                sx={textFieldStyle}
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
              <TextField
                sx={textFieldStyle}
                id="input-price"
                onChange={handlePriceChange}
                name="price"
                type="number"
                label="Price"
                inputProps={{ min: 0 }}
                error={priceError.length > 0}
                helperText={priceError.length > 0 ? priceError : ""}
                FormHelperTextProps={{
                  sx: { position: "absolute", bottom: "-1rem" },
                }}
              />
              <TextField
                sx={textFieldStyle}
                id="input-stock"
                onChange={handleStockChange}
                name="stock"
                type="number"
                label="In Stock"
                inputProps={{ min: 0 }}
                error={stockError.length > 0}
                helperText={stockError.length > 0 ? stockError : ""}
                FormHelperTextProps={{
                  sx: { position: "absolute", bottom: "-1rem" },
                }}
              />
              <TextField
                sx={{ minWidth: "200px", ...textFieldStyle }}
                id="input-category"
                value={category ?? ""}
                onChange={handleCategoryChange}
                name="category"
                select
                label="Category"
                SelectProps={{ defaultValue: "" }}
                error={categoryError.length > 0}
                helperText={categoryError.length > 0 ? categoryError : ""}
                FormHelperTextProps={{
                  sx: { position: "absolute", bottom: "-1rem" },
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="soft">Soft</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions
            sx={{ paddingRight: "2rem", paddingBottom: "1.75rem" }}
          >
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={(e) => {
                validate();
                handleItemCreate(e);
              }}
              color="reverse"
              variant="filled_primary"
              sx={{ "& .MuiButtonBase .Mui-disabled": { color: "red" } }}
            >
              Add item
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ItemCreate;
