export enum Routes {
  Home = 'Home',
  List = 'List',
}

export type StackParamList = {
  [Routes.Home]: undefined;
  [Routes.List]: { owner: string; repository: string };
};
