
import './style.css';
import './normalize.css'
import './skeleton.css'

// import svg from 'svg-inline-loader?src/assets/noun_encryption_3627917.svg';

import FancyBloks from './fancy-bloks'
import img from './assets/crypt.png'

const
    $ = document,
    byId = (id) => $.getElementById(id),
    fbContainseerTop = byId('fboxContainerTop'),
    fancyBoxButton = byId('getKeyTop'),
    display = byId('display-top-key'),
    codeBox = byId('display'),
    validMessage = byId('validation');

codeBox.style.display = 'none';
const topFancyBox = new FancyBloks().numberViewInputs(6).setParent(fbContainseerTop).build();
topFancyBox[0].focus();

function onClickGetNumber(ev) {

    
    const res = topFancyBox.map(blok => blok.value).join('');

    let valid  = topFancyBox.length === res.length
    console.log('valid: ', valid);

    if(!valid){
        topFancyBox.forEach(element => {
            element.value = '';
        });
        validMessage.innerText = 'Please enter a ' + topFancyBox.length + ' digit number';
    } else {
        codeBox.style.display = 'block';
        validMessage.innerText = '';
        display.innerText = res;
    }
    
}


fancyBoxButton.addEventListener('click', onClickGetNumber)

