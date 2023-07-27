// @mui material components

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

//tables
import TableBook from './book'
import TableBookMark from "./bookmark";
import MDButton from "components/MDButton";

//Redux
import { useDispatch } from 'react-redux';
import reduxFunction from '../../../redux/function/'

function Tables() {
  
  var dispatch = useDispatch()

  function addRow(){
    dispatch(reduxFunction.bookmark.add())
  }

  function dropRows(){
    dispatch(reduxFunction.bookmark.drop())
  } 

  function updateRow(){
    dispatch(reduxFunction.bookmark.update())
  }


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={4} pb={2}>
        <Grid container spacing={7}>
          <Grid item xs={12}>
            <Card
              style={{backgroundColor: 'white'}}
            >
              <MDBox
                mx={2}
                mt={-4}
                py={2.5}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Книги
                </MDTypography>
              </MDBox>
              <MDBox style={{height: '500px'}}>
                <TableBook />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <MDBox
              mx={25}
              mt={-4}
              py={1}
              px={4}
              style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}
            >
              <MDButton
                size='large'
                color='dark'
                onClick={addRow}
              >
                Добавить
              </MDButton>
              <MDButton
                size='large'
                color='dark'
                onClick={dropRows}
              >
                Удалить
              </MDButton>
              <MDButton
                size='large'
                color='dark'
                onClick={updateRow}
              >
                Изменить
              </MDButton>
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Card
              style={{backgroundColor: 'white'}}
            >
              <MDBox
                mx={2}
                mt={-4}
                py={2.5}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Закладки
                </MDTypography>
              </MDBox>
              <MDBox 
                style={{height: '500px'}}
              >
                <TableBookMark />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Tables;
