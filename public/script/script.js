// script used for reset password
const myForm = document.getElementById('myForm')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')
const passwordStatus = document.getElementById('passwordStatus')

passwordStatus.style.display = 'none'

// if old password and new password are seme then showing message
myForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if(password.value !== confirmPassword.value) {
        passwordStatus.style.display = 'block'
        return
    } else {
        passwordStatus.style.display = 'none'
    }

    myForm.submit()
})