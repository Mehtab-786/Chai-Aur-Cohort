import express from 'express';
import {createUserSchema} from '@mono-repo-setup-learning/utils';
import cors from 'cors';
import {createExpressMiddleware} from '@trpc/server/adapters/express';
import {appRouter} from '@mono-repo-setup-learning/trpc';


const app = express();

app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use('/trpc', createExpressMiddleware({
  router:appRouter
}));


// app.get('/', (req, res) => {
//   return res.json({
//     message: 'Hello Peers',
//   });
// });

// app.post('/users', (req, res) => {
//     const result = createUserSchema.safeParse(req.body);
    
//     if(!result.success) {
//         const message = result.error.issues .map(issue => issue.message).join(', ');
//         return res.status(400).json({
//             sucess: false,
//             message: 'Invalid user data'
//         });
//     } 

//     console.log(result.data);
    
//     return res.status(200)
//             .json({success:true,message: 'User created successfully'});
// });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
