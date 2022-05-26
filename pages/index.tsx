import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Button, LinearProgress} from '@mui/material';
import {Formik, Form, Field, FormikHelpers} from 'formik';
import {TextField as MuiTextField} from '@mui/material';
import {TextField} from 'formik-mui';
import * as Yup from 'yup';
import { IMaskMixin} from "react-imask";
import {ReactElement} from "react";

const MaskedInput = IMaskMixin(TextField);

interface Values {
  name: string;
  lastName: string;
  email: string;
}

const Home: NextPage = () => {

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const initialValues: Values = {
    name: '',
    lastName: '',
    email: '',
  };

  function onSubmit(values:Values, {setSubmitting, setErrors}: FormikHelpers<Values>) {
    setTimeout(() => {
      console.log('Form data', values);
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      setErrors({
        email: 'EMAIL JÁ CADASTRADO',
      });
    }, 1000);
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Formik
          initialValues={initialValues}
          validationSchema={SignupSchema}
          onSubmit={onSubmit}>
          {({submitForm, isSubmitting, touched, errors}) => (
            <Form>


              <Field
                name="name"
                label="Name"
                component={MaskedInput}
                mask={'000.000.000-00'}
                margin="normal"
                variant="filled"
                sx={{
                  marginBottom: '1em',
                }}
              />
              <br />
              <Field
                name="lastName"
                component={TextField}
                label="Last Name"
                margin="normal"
                variant="filled"
                sx={{
                  marginBottom: '1em',
                }}
              />
              <br />
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
                variant="filled"
                sx={{
                  marginBottom: '1em',
                }}
              />
              <br />
              {isSubmitting && <LinearProgress/>}
              <br/>
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  )
}

export default Home
