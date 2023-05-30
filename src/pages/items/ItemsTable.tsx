import React, { useState } from "react";
import { useDeleteItemMutation, useGetItemsQuery } from "../../state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ItemUpdate from "./ItemUpdate";

const ItemsTable = () => {
  const hasNoHoverSupport = useMediaQuery("(hover: none)");
  const isAboveMediumScreenWidth = useMediaQuery("(max-width:960px)");

  const { palette } = useTheme();
  const [hoveredRow, setHoveredRow] = useState(null);
  // const [paginationModel, setPaginationModel] = useState({
  //   pageSize: 15,
  //   page: 0,
  // });
  const [deleteTrigger, deleteMutationState] = useDeleteItemMutation();

  const gridColumns: GridColDef[] = [
    { field: "_id", headerName: "id" },
    { field: "name", headerName: "Name" },
    {
      field: "price",
      headerName: "Price",
      valueFormatter: (params) =>
        params?.value?.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
    },
    { field: "category", headerName: "Category" },
    { field: "stock", headerName: "Stock", width: 80 },
    {
      field: "update",
      headerName: "",
      renderCell: (params) =>
        (hoveredRow === params.id ||
          isAboveMediumScreenWidth ||
          hasNoHoverSupport) && (
          <Box>
            <ItemUpdate
              itemId={params.id.toString()}
              currentName={params.row.name}
            />
            <IconButton
              sx={{
                color: palette.basic.white,
                "&:hover": { color: palette.grey[300] },
              }}
              onClick={() => {
                deleteTrigger({ _id: params.id.toString() });
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ),
      width: 80,
    },
  ];

  const { data } = useGetItemsQuery();

  return (
    <Box
      mt="1rem"
      p="0 0.5rem"
      sx={{
        height: "75vh",
        overflow: "scroll",
        "& .MuiDataGrid-root": {
          border: "none",
          color: "white",
          fontSize: ".85rem",
          minHeight: "30vw",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: `1px solid ${palette.grey[800]} `,
        },
        "& .MuiDataGrid-columnHeaders": {
          borderBottom: `1px solid ${palette.grey[800]} `,
        },
        "& .MuiDataGrid-columnSeparator": {
          visibility: "hidden",
        },
        "& .MuiDataGrid-iconButtonContainer *": {
          fill: palette.grey[500],
        },
        "& .MuiDataGrid-footerContainer > *": { color: palette.basic.white },
      }}
    >
      <DataGrid
        columnHeaderHeight={25}
        rowHeight={35}
        rows={data || []}
        columns={gridColumns}
        // paginationModel={paginationModel}
        // onPaginationModelChange={setPaginationModel}
        autoPageSize
        slotProps={{
          row: {
            onMouseEnter: (e) => {
              setHoveredRow(e.target?.parentNode?.dataset?.id);
            },
            onMouseLeave: (e) => setHoveredRow(null),
          },
        }}
      />
    </Box>
  );
};

export default ItemsTable;
