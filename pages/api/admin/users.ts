import { db } from '@/database';
import { IUser } from '@/interfaces';
import { User } from '@/models';
import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
| { message: string }
| IUser[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch( req.method ){
    case 'GET':
      return getUsers( req, res);
    case 'PUT':
      return updateUser( req, res );
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select('-password').lean();
  await db.disconnect();

  return res.status(200).json( users );
}


const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body;
  if( !isValidObjectId( userId) ){
    return res.status(400).json({ message: 'Id is invalid' });
  }

  const validRoles = ['admin', 'super-user', 'SEO', 'client'];
  if( !validRoles.includes( role ) ){
    return res.status(400).json({ message: 'Role is not valid' });
  }

  await db.connect();
  const user = await User.findById( userId );  
  
  if( !user ){
    return res.status(404).json({ message: 'User not found' });
  }

  user.role = role;
  await user.save();

  await db.disconnect();

  return res.status(200).json({ message: 'User updated' });
}
