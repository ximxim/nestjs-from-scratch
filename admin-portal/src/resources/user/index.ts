import { ResourceProps } from 'react-admin';

import { UserList } from './UserList';
import { UserEdit } from './UserEdit';

export const UsersResource: ResourceProps = {
	name: 'user',
  list: UserList,
	edit: UserEdit,
};