import type { StackScreenProps } from '@react-navigation/stack';
import { Routes, StackParamList } from '../../navigation/types';

export type ListProps = StackScreenProps<StackParamList, Routes.List>;

export type Stargazer = {
  id: number;
  avatar_url: string;
  login: string;
};

export type Repository = {
  id: number;
  name: string;
  owner: Stargazer;
  stargazers_count: number;
  description: string;
};
