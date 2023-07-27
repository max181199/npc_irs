import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

// AGgrid
import { AgGridReact } from 'ag-grid-react'
import { useMemo, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import reduxFunction from '../../../redux/function/'

function TableBookMark() {
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
      sortable: true,
      sort: 'asc',
      suppressMenu: true,
      editable: false
    },
    { 
      headerName:'Book',
      field: 'book_id',
      cellDataType: 'number',
      sortable: true,
      editable: true, 
    },
    { 
      headerName:'Name',
      field: 'name',
      cellDataType: 'text',
      sortable: true,
      editable: false, 
    },
    {
      headerName:'Author',
      field: 'author',
      sortable: true,
      editable: false,
      cellDataType: 'text',  
    },
    {
      headerName:'Publication',
      field: 'publication',
      sortable: true,
      editable: false,
      cellDataType: 'text',  
    },
    {
      headerName:'Date',
      field: 'date',
      sortable: true,
      editable: true,
      cellDataType: 'date',  
      cellRenderer: (props) => {
        // eslint-disable-next-line react/prop-types
        if (props.value) {
          // eslint-disable-next-line react/prop-types
          var date = new Date(props.value)
          return `0${date.getDate()}.`.slice(-3) + `0${date.getMonth() + 1}.`.slice(-3) + `0000${date.getFullYear()}`.slice(-4)
        } else {
          return ('');
        }
      },
    },
    { 
      headerName:'Login',
      field: 'login',
      sortable: true,
      editable: true,
      cellDataType: 'text'   
    },
    { 
      headerName:'Rating',
      field: 'rating',
      suppressMenu: true,
      sortable: true,
      editable: true,
      cellDataType: 'number',
      cellRenderer: (props) => {
        // eslint-disable-next-line react/prop-types
        return props.value
      }   
    },
    { 
      headerName:'Page',
      field: 'page', 
      suppressMenu: true,
      sortable: true, 
      editable: true,
      cellDataType: 'number'  
    }
  ]);

  const agGrid = useRef()
  const dispatch = useDispatch()
  
  const onGridReady = useCallback((params) => {
    dispatch(reduxFunction.bookmark.init(agGrid.current.api, agGrid.current.columnApi))
    dispatch(reduxFunction.bookmark.setDatasource())
  },[])
  
  return (
    <AgGridReact
      ref={agGrid}
      className="ag-theme-material"
      animateRows={true}
      columnDefs={columnDefs}
      rowSelection={'multiple'}
      rowModelType={'infinite'}
      defaultColDef={defaultColDef}
      infiniteInitialRowCount={1}
      onGridReady={onGridReady}
      cacheBlockSize={25}
      cacheOverflowSize={2}
      onCellEditingStarted = {event => dispatch(reduxFunction.bookmark.addIdToUpdateList(event.data))}
      getRowId = {({data}) => {
        return data.id
      }}
    />
  );
}

export default TableBookMark;
