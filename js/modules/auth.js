import { openModal, closeModal } from "./modal.js";
import { getData } from "./api.js";

export const authFunc = () => {
    
    const modal = document.querySelector('#auth-modal');
    const btnClose = modal.querySelectorAll('.close-btn');
    const authBtn = document.querySelector('#open-auth-btn'); 
    const logOutBtn = document.querySelector('#logout-btn'); 
    const cartBtn = document.querySelector('#open-cart-btn'); 
    const loginBtn = document.querySelector('.login-btn'); 
    


    authBtn.addEventListener('click', () => {
        openModal(modal);
    });
    
    modal.addEventListener('click', (e) => {
        const target = e.target;
        if (target === modal || target === btnClose[0] || target === btnClose[1]) {
            closeModal(modal);
        }
    })


    const login = () => {
        authBtn.classList.add('d-none');
        logOutBtn.classList.remove('d-none');
        cartBtn.classList.remove('d-none');
        closeModal(modal);
    }
    const logout = () => {
        authBtn.classList.remove('d-none');
        logOutBtn.classList.add('d-none');
        cartBtn.classList.add('d-none');
        closeModal(modal);
    }
    const checkAuth = () => {
        const user = JSON.parse(localStorage.getItem('auth'));

        if (user) {
            getData('/profile').then((users)=>{
                for (let u of users) {
                    console.log(u);
                    if ((u.login && u.login === user.login) && (u.password && u.password === user.password)) {
                        login();
                        break;
                    } 
               }
            })
        }
    };

    loginBtn.addEventListener('click',()=>{
        const loginInput = document.querySelector('#login-control');
        const passwordInput = document.querySelector('#password-control');

        const user = {
            login: loginInput.value,
            password: passwordInput.value
        }


        getData('/profile').then((users)=>{
            console.log(users);
            for (let u of users) {
                if ((u.login && u.login === user.login) && (u.password && u.password === user.password)) {
                
                    console.log('done');
                    localStorage.setItem('auth', JSON.stringify(u));
                    checkAuth();
                    break
                }
            }
            if (!localStorage.getItem('auth')) {
                alert('Вы ввели неверный логин или пароль')
            }
        })
    });
    logOutBtn.addEventListener('click',()=>{
        
        localStorage.removeItem('auth');
        logout();
    });

    checkAuth();


};

