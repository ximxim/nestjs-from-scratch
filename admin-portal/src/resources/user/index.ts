import { ResourceProps, ListGuesser } from 'react-admin';

export const UsersResource: ResourceProps = {
	name: 'user',
  list: ListGuesser,
};