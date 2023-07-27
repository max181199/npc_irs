import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// AGgrid
import { AgGridReact } from 'ag-grid-react'
import { useMemo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import reduxFunction from '../../../redux/function/'

function TableBook() {
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 125,
      sortable: false,
      editable: false,
      resizable: true,
      floatingFilter: false,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName:'ID',
      maxWidth: 100,
      field:'id',
      //valueGetter: 'node.id',
      cellRenderer: (props) => {
        // eslint-disable-next-line react/prop-types
        if (props.value !== undefined) {
          // eslint-disable-next-line react/prop-types
          return props.value;
        } else {
          return (
            <img src="https://www.ag-grid.com/example-assets/loading.gif" />
          );
        }
      },
      sortable: false,
      suppressMenu: true,
    },
    { 
      headerName:'Name',
      field: 'name',
      sortable: true, 
    },
    {
      headerName:'Author',
      field: 'author',
      sortable: true, 
    },
    {
      headerName:'Publication',
      field: 'publication',
      sortable: true, 
    },
    {
      headerName:'Release Date',
      field: 'release_date',
      sortable: true, 
      cellRenderer: (props) => {
        // eslint-disable-next-line react/prop-types
        if (props.value) {
          // eslint-disable-next-line react/prop-types
          var date = new Date(props.value)
          return `0${date.getDate()}.`.slice(-3) + `0${date.getMonth() + 1}.`.slice(-3) + `${date.getFullYear()}`
        } else {
          return ('');
        }
      },
    },
    { 
      headerName:'Edition',
      field: 'edition',
      sortable: true,  
    },
    { 
      headerName:'Rating',
      field: 'rating',
      suppressMenu: true,
      sortable: true,  
    },
    { 
      headerName:'Pages',
      field: 'pages', 
      suppressMenu: true,
      sortable: true,  
    }
  ]);

  const dispatch = useDispatch()
  const onGridReady = useCallback((params) => {
    dispatch(reduxFunction.book.init(params.api))
    dispatch(reduxFunction.book.setDatasource())
  },[])
  
  return (
    <AgGridReact
      className="ag-theme-material"
      animateRows={true}
      columnDefs={columnDefs}
      rowSelection={'multiple'}
      rowModelType={'infinite'}
      defaultColDef={defaultColDef}
      infiniteInitialRowCount={1}
      onGridReady={onGridReady}
      cacheBlockSize={25}
    />
  );
}

export default TableBook;
