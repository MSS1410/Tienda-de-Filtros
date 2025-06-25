/*Usa un bucle para sumar el total de las ventas (sellCount) de todos los productos
 pintar en la página la media de ventas y el producto que mejor esté funcionando como producto estrella del mes



(pintar el mejor producto en el html)
    un lugar donde meter el mejor producto ✅
// #bestProduct
*/

const products = [
  {
    name: 'Funko Dr. Strange',
    sellCount: 1000,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2srpz6OqAxmEvfnOG1Kjt60NZoNOwVe9rwQ&s'
  },
  {
    name: 'Mochila de protones: Ghostbusters',
    sellCount: 302,
    img: 'https://static.wixstatic.com/media/6a5d28_e5dc65a56a154dbea32b044b7302f160~mv2.png/v1/fill/w_648,h_640,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/6a5d28_e5dc65a56a154dbea32b044b7302f160~mv2.png'
  },
  {
    name: 'Sable laser FX',
    sellCount: 2300,
    img: 'https://ae01.alicdn.com/kf/S198e27692cea4002a28b75cf59df41dex.png'
  },
  {
    name: 'Varita de Voldemort',
    sellCount: 6,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAh5IUaEdnSlXGvaalE2fIq3LwlgqDFhWgLQ&s'
  }
]

// (pintar productos en el html) ✅
//  necesito unos productos que pintar ✅
//  conocer como están estructurados dichos productos - tipo de dato: array ✅
//   conocer como está estructurado cada elemento dentro del array productos - tipo de dato: objeto ✅
//   DOM - métodos - createElement - appendChild - querySelector ✅
//   un lugar donde meter cada producto ✅

// #products
// para pintar no puedo pintar un array de cosas ✅

const bestProductHTML = document.querySelector('#bestProduct')

// quiero pasar mi objeto a un  string palpable en el navegador
const pintarProductos = (productos) => {
  productos.forEach((product) => {
    const productsHTML = document.querySelector('#products')
    // uso destructuring de objeto para afectar a las 3 propiedades en cada vuelta del bucle
    const { name, sellCount, img } = product
    // genero los elementos en mio html para poder pegar los elementos destructurados del objeto
    const divHTML = document.createElement('div')
    const nameHTML = document.createElement('h3')
    const imgHTML = document.createElement('img')
    const sellCountHTML = document.createElement('p')

    // dar valor a los elementos

    divHTML.classList.add('product')
    nameHTML.textContent = name
    imgHTML.src = img
    sellCountHTML.textContent = sellCount
    // insertamos los elementos en navegador

    divHTML.appendChild(nameHTML)
    divHTML.appendChild(imgHTML)
    divHTML.appendChild(sellCountHTML)
    productsHTML.appendChild(divHTML)
  })
}

//(pintar la media en el html) ✅
// un lugar donde pintar la media ✅
// .media

const calcularMedia = (prodcutos) => {
  // let sum = 0
  // for (const producto of productos) {
  //   sum += producto.sellCount
  // }
  // podemos reducir el codigo usando el metodo es6+ .reduce
  return (
    productos.reduce((acc, producto) => (acc += product.sellCount), 0) /
    productos.lenght
  )
}
const pintarMedia = () => {
  const pMediaHTML = document.querySelector('.media ')
  const media = calcularMedia(products)

  pMediaHTML.textContent = `La media de ventas de los productos es : ${media}`
}
//  calcular la media para pintar ✅

// ejecucion de las 3 funciones

pintarProductos(products)
pintarMedia()
