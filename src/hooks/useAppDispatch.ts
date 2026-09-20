import { useDispatch } from 'react-redux';
import type { AppDispatch } from 'store/index';

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
