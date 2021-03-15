import { Button, CircularProgress, Divider, FormControl, Grid, IconButton, InputLabel, makeStyles, Paper, Select, TextField, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory } from 'react-router-dom';
import * as carService from '../services/car-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { MANUFACTURER_LIST } from '../utils/manufacture'

const useStyles = makeStyles(theme=> ({
  root: {

  },
  form: {
    width: '70%',
    padding: '20px',
    marginTop: '40px',
  },
  textField: {
    width: '100%',
    marginBottom: '20px'
  }

}));

const CreateCarPage = ()=> {

  const [payload, setPayload] = useState({model: '', description: '', manufacturer: 'TOYOTA', manufactureYear: '', price: 0})
  const [submitLoading, setSubmitLoading] = useState(false)

  const history = useHistory()
  const classes = useStyles()

  const MySwal = withReactContent(Swal)

  const handleNavigateBack = ()=> {
    history.goBack()
  }

  const payloadIsValid = ()=> {
    return payload.description && payload.manufactureYear && payload.model 
        && payload.price && payload.manufacturer && payload.price > 0;
  }

  const handleInputChange = (event)=> {
    const target = event.target
    const eventName = target.name;
    const value = target.value;
    setPayload({...payload, [eventName]: value})
  }

  const handleSelectChange = (event) => {
    const target = event.target
    const eventName = target.name
    console.log('event', event.target.value)
    setPayload({...payload, [eventName]: target.value})
  }

  const handleSubmitEvent = (event)=> {
    event.preventDefault()
    setSubmitLoading(true)
    console.log('payload', payload)
    carService.saveCar(payload)
      .then(response=> {
        const {status, message} = response
        if(status == 200) {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Department Created Successfully',
            allowOutsideClick: false,
            willClose: ()=> {
              setPayload({model: '', description: '', manufacturer: 'TOYOTA', manufactureYear: '', price: 0})
            }
          })
        } else {
          MySwal.fire({
            icon: 'error',
            title: 'Failed!',
            text: message ? message : 'failed'
          })
        }
      })
      .catch(error=> {
        
      })
      .finally(()=> {
        setSubmitLoading(false)
      })
  }

  return (
    <Fragment>
      <Paper elevation={0} style={{padding: '5px', minHeight: '50px'}}>
        <IconButton color="primary" onClick={handleNavigateBack}>
          <BackIcon />
        </IconButton>
      </Paper>
      <Paper elevation={0} style={{padding: '5px', minHeight: '300px', marginTop: '10px', display:'flex', flexDirection: 'column'}}>
        <Typography variant="h5" color="textPrimary">
          Create Car Form
        </Typography>
        <Divider />
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          <form className={classes.form} autoComplete="off" onSubmit={handleSubmitEvent}>
          <FormControl variant="outlined" className={classes.textField}>
              <InputLabel htmlFor="outlined-age-native-simple">Department</InputLabel>
              <Select
                native
                value={payload.manufacturer}
                onChange={handleSelectChange}
                label="Department"
                name="manufacturer"
              >
                {MANUFACTURER_LIST.map((manufacturer)=> {
                  return (
                    <option value={manufacturer.id} key={manufacturer.id}>{manufacturer.label}</option>
                  )
                })}
              </Select>
            </FormControl>
            <TextField id="model" label="Car Model" name="model" value={payload.model}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="year" label="Manufacture Year" name="manufactureYear" value={payload.manufactureYear}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="price" label="price" name="price" value={payload.price} type="number"
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="description" label="description" name="description" value={payload.description}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit" disabled={submitLoading || !payloadIsValid()}>
              {submitLoading ? <CircularProgress size={20} /> : null}
              <Typography variant="button">
                Create
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default CreateCarPage;