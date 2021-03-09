
import axios from 'axios' 
import noty from 'noty'
//import {initAdmin} from './admin'


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')



function updateCart(order){

            axios.post('/update-cart',order).then(res => { 

                //console.log(res)
                cartCounter.innerText = res.data.totalQty
                new noty({
                    type: 'success',
                    timeout:1000,
                    text: 'Item added to cart'
                }).show();
            }).catch(err => {

                new noty({
                    type: 'error',
                    timeout:1000,
                    text: 'Something went wrong'
                }).show();


            })
}

addToCart.forEach((btn) => {


    btn.addEventListener('click',(e) => {
         
        let order = JSON.parse(btn.dataset.order)

            updateCart(order)
            //console.log(order)
    })
})
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){

    setTimeout(()=>{

            alertMsg.remove()


    },2000)
}

//initAdmin()

//change order status

let statuses = document.querySelectorAll('.status_line')
console.log(statuses)
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
console.log(order)





function updateStatus(createorder){

    let stepCompleted = true;
    statuses.forEach((status) =>{

        let dataProp = status.dataset.status
        if(stepCompleted){

            status.classList.add('step-completed')


        }
        if(dataProp === createorder.status){

            stepCompleted = false

            if(status.nextElementSibling){

            status.nextElementSibling.classList.add('current')


            }

        }


    })

}
updateStatus(createorder);