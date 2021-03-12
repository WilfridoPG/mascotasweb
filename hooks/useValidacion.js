import React, { useState,useEffect } from 'react';

const UseValidacion = (stateInicial,validar,fn) => {

    const [valores,guardarValores]=useState(stateInicial);
    const [errores,guardarErrores]=useState({});
    const [submitForm, guardarSubmitForm]=useState(false);

    useEffect(() => {
       if(submitForm){
        const noErrores=Object.keys(errores).length==0;
        if(noErrores){
            fn();
        }
       }
       guardarSubmitForm(false);
    }, [errores])
    //funcion que se ejecuta cuando el usuari escribe algo 
    const handleChange=e=>{
        guardarValores({
            ...valores,
            [e.target.name]:e.target.value
        })
    }
    //usuario hace submit
    const handleSubmit=e=>{
        e.preventDefault();
        const erroresValidacion=validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }
//cudno escribe y se esale
    const handleBluer=()=>{
        const erroresValidacion=validar(valores);
        guardarErrores(erroresValidacion);

    }

    return {
        valores,
        errores,
        handleSubmit,
        submitForm,
        handleChange,
        handleBluer
    }
}
 
export default UseValidacion;