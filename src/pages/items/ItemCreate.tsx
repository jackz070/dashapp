import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAddItemMutation } from "../../state/api";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  TextField,
  useTheme,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import { GetItemsResponse } from "../../state/types";

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (parseInt(value) >= 0) setPrice(value);
  };

  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.target.value;
    if (parseInt(value) >= 0) setStock(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const toastId = useRef<string | number>();

  const initialNotification = () =>
    (toastId.current = toast("Adding new item...", {
      position: "bottom-right",
      autoClose: false,
    }));

  const updateNotification = () => {
    if (toastId.current) {
      if (createMutationState.isSuccess) {
        toast.update(toastId.current, {
          render: "New item added.",
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
        });
        return;
      }
      if (createMutationState.isError) {
        console.log(createMutationState);

        if (
          createMutationState.status === "rejected" &&
          createMutationState.error?.status === "FETCH_ERROR"
        ) {
          toast.update(toastId.current, {
            render: () =>
              `There is a problem with our server. Details: ${createMutationState.error.error}`,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
          });
          return;
        }
        toast.update(toastId.current, {
          render: () => `${createMutationState.error.data.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
        });
      }
    }
  };

  useEffect(() => {
    updateNotification();
    if (createMutationState.isSuccess) handleClose();
  }, [createMutationState]);

  const handleItemCreate = (e: FormEvent) => {
    e.preventDefault();

    if (name.length === 0) {
      setNameError("required");
    }
    if (category.length === 0) {
      setCategoryError("required");
    }
    if (parseInt(price) === 0) {
      setPriceError("can't be zero");
    }
    if (parseInt(stock) === 0) {
      setStockError("can't be zero");
    }
    if (nameError || categoryError || priceError || stockError) {
      return;
    }
    initialNotification();
    const newItemData: Partial<GetItemsResponse> = {
      name: name,
      price: parseInt(price) * 100,
      category: category,
      stock: parseInt(stock),
    };
    try {
      createTrigger(newItemData)
        .unwrap()
        .then((fulfilled) => {
          console.log(fulfilled);
        })
        .catch((rejected) => console.error(rejected));
    } catch (err) {
      let message = "Unkown error";
      if (err instanceof Error) {
        message = err.message;
      }
      console.error(message);
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
    if (parseInt(price) > 0) {
      setPriceError("");
    }
    if (parseInt(stock) > 0) {
      setStockError("");
    }
  }, [name, category, price, stock]);

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
          <DialogTitle variant="h4" sx={{ padding: "1.5rem 2rem" }}>
            Add new item
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
                value={price === 0 ? "" : price}
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
                value={stock === 0 ? "" : stock}
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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={(e) => handleItemCreate(e)}
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
