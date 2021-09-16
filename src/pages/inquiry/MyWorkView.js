import React, { useEffect } from 'react';
import ETable from './ETable';
import ComponentSwitch from '../../components/ComponentSwitch';
import SplitPane, { Pane } from 'react-split-pane';
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Switch, Typography, Grid, TextField, Box } from '@material-ui/core';
import EBox from 'src/components/EvergyMui/EBox';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    paddingTop: theme.spacing(2),
    padding: theme.spacing(3)
  },
  tableBody: {
    position: 'relative',
    flexGrow: '2',
    minHeight: '80vh',
    [theme.breakpoints.down('lg')]: {
      minHeight: '74vh'
    }
  },
  tableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexGrow: '1',
    marginBottom: '10px',
    maxHeight: '13vh',
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      maxHeight: '8vh'
    }
  },
  resizer: {//todo move into custom component
      padding: '5px',
      cursor: 'pointer',
      '&:hover':{
        backgroundColor: fade('#2a2a2a', 0.2)
      }
  }
}));

const ViewTypes = {
  Table: 0,
  ReadingPane: 1
};

export default function MyWorkView(props) {
  const classes = useStyles();
  const [viewType, setViewType] = React.useState(ViewTypes.ReadingPane);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('laptop'));
  const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString('en-US')
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString('en-US')
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2)
    }
  ];

  function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767)
  ];

  return (
    <div className={classes.root}>
      <div className={classes.tableHeader}>
        <TextField id="standard-basic" label="Standard" />
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch
                checked={!!viewType}
                onChange={() => setViewType(!viewType)}
                name="checkedB"
                color="primary"
              />
            </Grid>
            <Grid item>On</Grid>
          </Grid>
        </Typography>
      </div>
      <ComponentSwitch selected={viewType}>
        <div className={classes.tableBody}>
          <ETable boxShadow={5} rows={rows} cols={columns} pageSize={5} />
        </div>
        <div className={classes.tableBody}>
          <SplitPane
            split="vertical"
            resizerClassName={classes.resizer}
            >
            <EBox
              height="100%"
              width="100%"
            ></EBox>
            <EBox height="100%" width="100%"></EBox>
          </SplitPane>
        </div>
      </ComponentSwitch>
    </div>
  );
}
