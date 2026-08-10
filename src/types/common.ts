export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: string;
}

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface BreadcrumbItem {
  readonly label: string;
  readonly path?: string;
}
