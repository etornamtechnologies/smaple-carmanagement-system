import React, {useState, useEffect, Fragment} from 'react'
import { Button, Divider, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import * as carService from '../services/car-service'
import { Delete, Edit } from '@material-ui/icons'
import { useHistory, useRouteMatch } from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

const useStyles = makeStyles(theme=> ({
    root: {
        width: '100%',
    },
    headerBar: {
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    tableContainer: {
      maxHeight: 440,
      padding: 10
    }
}))

const tableColumns = [
    {id: 'name', label: 'Name', align: 'left', format: (value)=> {return value.toUpperCase()}},
    {id: 'model', label: 'Model', align: 'left'},
    {id: 'manufactureYear', label: 'Year', align: 'left'},
    {id: 'manufacturer', label: 'Manufacturer', align: 'left'},
    {id: 'price', label: 'Price', align: 'left', format: (value)=> `GHS ${value}`},
    {id: 'description', label: 'Description', align: 'left'},
]

const HomePage = ()=> {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(false)

    const history = useHistory()
    const { path } = useRouteMatch()
    const classes = useStyles()
    const MySwal = withReactContent(Swal)

    const fetchCars = () => {
        setLoading(true)
        carService.getAllCars()
            .then(response => {
                const {status, data} = response
                if(status === 200) {
                    setCars(data)
                }
            })
            .catch(error=> {
                alert(error)
            })
            .finally(()=> {
                setLoading(false)
            })
    }

    const handleEdit = (id) => {
        history.push(`${path}cars/${id}/edit`)
    }

    const handleDelete = (id) => {
        MySwal.fire({
            title: `Are you sure you want to delete car?`,
            showDenyButton: true,
            confirmButtonText: 'Yes',
            preConfirm: ()=> {
              console.log('left confirm')
              deleteCar(id)
            }
          })
    }

    const deleteCar = (id)=> {
        setLoading(true)
        carService.deleteCar(id)
            .then(response=> {
                const { status, message } = response
                if(status === 200) {
                    setCars(cars.filter(car=> car.id != id)) //lets remove from list
                    
                    MySwal.fire({
                        icon: 'success',
                        title: 'Delete Car',
                        text: message ? message : 'Deleted!'
                    });
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Delete Car',
                        text: message ? message : 'Failed to delete!'
                    });
                }
                
            })
            .catch(error => {
                MySwal.fire({
                    icon: 'error',
                    title: 'Delete Car',
                    text: error
                });
            })
            .finally(()=> {
                setLoading(false)
            })
    }   

    const handleCreate = ()=> {
        history.push(`${path}cars/create`)
    }

    //called on first render of component
    useEffect(() => {
        fetchCars()
    }, [])

    return (
        <div className={classes.root}>
            <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}} aria-label="department bar">
                <div className={classes.headerBar}>
                <Button variant="contained" color="primary" 
                disableElevation aria-label="Create Department Button" onClick={handleCreate}>
                    <Typography variant="button">
                        New Car
                    </Typography>
                </Button>
                </div>
            </Paper>
            <Paper style={{padding: '5px', minHeight: '300px', marginTop:'10px'}}>
                <Typography variant="h5">
                    Cars
                </Typography>
                <Divider />
                <TableContainer>
                    {loading ? <LinearProgress color="secondary" style={{width: '100%'}}/> : null}
                    <Table stickyHeader aria-label="cars table">
                        <TableHead>
                            <TableRow>
                                {tableColumns.map(column => {
                                    return (
                                        <TableCell key={column.id}>
                                            {column.label}
                                        </TableCell>
                                    )
                                })}
                                <TableCell align="right">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cars && cars.map(row => {
                                return (
                                    <TableRow hover key={row.id}>
                                        {tableColumns.map(column => {
                                            const value = row[column.id]
                                            return (
                                                <TableCell key={column.id}>
                                                    {column.format ? column.format(value) : value}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell align="right">
                                            <Edit fontSize="small" onClick={()=> handleEdit(row.id)}/>
                                            <Delete fontSize="small" onClick={()=> handleDelete(row.id)}/>
                                        </TableCell>
                                    </TableRow>
                                )

                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    )
}

export default HomePage