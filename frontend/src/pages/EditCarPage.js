import { Button, CircularProgress, Divider, Grid, IconButton, LinearProgress, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { Fragment, useState, useEffect } from 'react'
import BackIcon from '@material-ui/icons/ChevronLeft'
import { useHistory, useParams } from 'react-router-dom';
import * as carService from '../services/car-service'
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

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

const EditCarPage = ()=> {

  const [payload, setPayload] = useState({model: '', description: '', manufacturer: '', manufactureYear: '', price: 0})
  const [loading, setLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const history = useHistory()
  const classes = useStyles()
  const { id } = useParams()

  const MySwal = withReactContent(Swal)

  const handleNavigateBack = ()=> {
    history.goBack()
  }

  useEffect(() => {
    fetchCar(id)
  }, [])

  const handleInputChange = (event)=> {
    const target = event.target
    const eventName = target.name;
    const value = target.value;
    setPayload({...payload, [eventName]: value})
  }

  const payloadIsValid = ()=> {
    return payload.description && payload.manufactureYear && payload.model 
        && payload.price && payload.manufacturer && payload.price > 0;
  }

  const fetchCar = (carId) => {
      setLoading(true)
      carService.getCar(carId)
        .then(response=> {
            const { status, message, data } = response
            if(status === 200) {
                const {model, description, manufactureYear, manufacturer, price} = data
                setPayload({model, description, manufactureYear, manufacturer, price})
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: message ? message : 'Error'
                })
            }
        })
        .catch(error=> {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: error
            })
        })
        .finally(()=> {
            setLoading(false)
        })
  }

  const handleSubmitEvent = (event)=> {
    event.preventDefault()
    setSubmitLoading(true)
    console.log('payload', payload)
    carService.updateCar(id, payload)
      .then(response=> {
        const {status, message} = response
        if(status == 200) {
          MySwal.fire({
            icon: 'success',
            title: 'Success',
            text: message ? message : 'Car Updated Successfully',
            allowOutsideClick: false,
            willClose: ()=> {
              //setPayload()
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
        MySwal.fire({
            icon: 'error',
            title: 'Failed!',
            text: error
          })
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
          Update Car Form
        </Typography>
        {loading ? <LinearProgress color="secondary" style={{width: '100%'}}/> : null}
        <Divider />
        <div style={{width:'100%', display:'flex', justifyContent: 'center'}}>
          <form className={classes.form} autoComplete="off" onSubmit={handleSubmitEvent}>
            <TextField id="model" label="Car Model" name="model" value={payload.model}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="year" label="Manufacture Year" name="manufactureYear" value={payload.manufactureYear}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="price" label="Price" name="price" value={payload.price} type="number"
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <TextField id="description" label="description" name="description" value={payload.description}
              variant="outlined" className={classes.textField} onChange={handleInputChange}/>
            <Button variant="contained" color="secondary" style={{float: 'right'}} type="submit" disabled={submitLoading || !payloadIsValid()}>
              {submitLoading ? <CircularProgress size={20} /> : null}
              <Typography variant="button">
                Update
              </Typography>
            </Button>
          </form>
        </div>
      </Paper>
    </Fragment>
    
  )
}

export default EditCarPage;