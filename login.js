"use strict;"
const GoogleBtn=document.querySelector('#btn-google');
GoogleBtn.addEventListener('click', e =>{
    const provider= new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result=>{
            console.log('Logeo Google exitoso');
            // Redirige a la página de inicio
            window.location.href = 'index.html';
        })
        .catch(err=>{
            console.log('Logeo Google erroneo')
            console.log('Código de error:', err.code);
            console.log('Mensaje de error:', err.message);
        })
})
const FacebookBtn=document.querySelector('#btn-Facebook');
FacebookBtn.addEventListener('click', e =>{
    e.preventDefault();
    const provider= new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result=>{
            console.log('Logeo Facebook exitoso');
            // Redirige a la página de inicio
            window.location.href = 'inicio.html';
        })
        .catch(err=>{
            console.log('Logeo Facebook erroneo')
            console.log('Código de error:', err.code);
            console.log('Mensaje de error:', err.message);
        })
})