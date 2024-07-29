import React, { createContext, useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const DashboardContext = createContext();

export const useDashboardContext = () => {
  return useContext(DashboardContext);
};

export const DashboardProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [sortData, setSortData] = useState({ createdAt: -1 });
  const [modalType, setModalType] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    source: null,
    destination: null,
    createdFrom: null,
    createdTo: null,
    createdBy: null,
  });

  const [flag, setFlag] = useState(true);
  const [snackbar, setSnackbar] = useState('');

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down('md'));

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      source: null,
      destination: null,
      createdFrom: null,
      createdTo: null,
      createdBy: null,
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        data,
        page,
        rowsPerPage,
        totalRows,
        sortData,
        modalType,
        filterOpen,
        selectedShipment,
        filters,
        flag,
        snackbar,
        isXs,
        setData,
        setPage,
        handlePageChange,
        handleChangeRowsPerPage,
        setTotalRows,
        setSortData,
        setModalType,
        setFilterOpen,
        setSelectedShipment,
        setFilters,
        setFlag,
        setSnackbar,
        resetFilters,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
