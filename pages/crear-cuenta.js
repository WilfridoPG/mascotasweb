import React,{useState} from "react";
import Layout from "../components/layout/Layout";
import {css} from '@emotion/core';
import {Formulario,Campo,InputSubmit,Error} from "../components/ui/formulario"
import validarCrearCuenta from '../validacion/validarCrearCuenta'
import firebase from '../firebase';
import Router  from 'next/router'
//validaciones
import useValidacion from '../hooks/useValidacion'
const STATE_INICIAL={
    nombre:"",
    email:"",
    password:""
}
const CrearCuenta = () => {
    const [error,guardarError]=useState(false);
    const {
        valores,
        errores,
        handleSubmit,
        handleChange,
        handleBluer
    }=useValidacion(STATE_INICIAL,validarCrearCuenta,crearCuenta);

    const {nombre,email,password}=valores;

   async function crearCuenta(){
    try{
        await  firebase.registrar(nombre,email,password);
        Router.push("/");

    }catch(error){
      console.error("hubo un erro al crear el usuario ", error);
      guardarError(error.message);
      
        
    }
      
    }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
                text-align:center;
                margin-top:5rem;
            `
            }
          >crear cuenta</h1>
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre"> Nombre</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBluer}
              />
            </Campo>
        {errores.nombre && <Error>{errores.nombre}</Error>}
            <Campo>
              <label htmlFor="email"> Email</label>
              <input
                type="email"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBluer}
              />
            </Campo>
            {errores.email && <Error>{errores.email}</Error>}
            <Campo>
              <label htmlFor="password"> password</label>
              <input
                type="password"
                id="password"
                placeholder="Tu password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBluer}
              />
            </Campo>
            {errores.password && <Error>{errores.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit type="Submit"
                value="Crear Cuenta"
            />


          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default CrearCuenta;
