import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchUserOrdersApi,
  selectUserOrders
} from '../../services/slices/usersOrderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(selectUserOrders);
	const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrdersApi());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
