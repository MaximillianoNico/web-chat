import http from 'http';
import { Server } from 'socket.io';
import { Application } from 'express'

interface ISocket {
  app: Application
}

// const useInitHooks = (defaultState = null) => {
//   let state = defaultState;

//   const onUpdateState = (update) => {
//     state = update
//   }

//   return [state, onUpdateState]
// }

const createClient = ({ app }: ISocket) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*"
    }
  });
  // const [productList, updateProductState] = useInitHooks([])

  io.on('connection', (socket) => {
    // console.log(`⚡: ${socket.id} user just connected!`);
    socket.on( 'connect', function() {
      console.log(`⚡: ${socket.id} user just connected!`);
    });

    socket.on('initialize', () => {
      // const
    });

    // socket.on('updateProduct', (data) => {
    //   console.log('UPDATED')
    //   const productId = data?.product?._id || ""
    //   const newProductList = productList?.map(d => {
    //     if (d?.id === productId) return { ...d, data }

    //     return d
    //   });

    //   updateProductState(newProductList)

    //   // Update Product Bid Status
    //   socket.emit(`product-bid::${productId}`, data);
    //   socket.emit(`products`, newProductList);
    // })

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
  });

  return { io, server }
}

export default { createClient }
